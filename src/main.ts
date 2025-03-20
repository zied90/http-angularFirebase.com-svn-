import { useEffect } from "react";
import { useMutation } from "react-query";
import Loader from "@axa-fr/react-toolkit-loader";
import configStore from "@/stores/configStore";
import { IsMobileOrTablet } from "@/utils/isMobileOrTablet";
import { clientByClientIdOrContract } from "@/api/apifunctions/byNumeroClientOrNumeroContrat";
import { updateEmailStatus } from "@/api/apifunctions/updateEmailStatus";
import { IDocument } from "@/types/documents";
import { useAlert } from "@/components/GlobalAlert/useAlert";
import {
  allDocsHaveSameClientNumber,
  allDocsHaveSameContractNumber,
  getDocsDEVIS_PROJET_ETUDE,
  getDocsToDemat,
  getDocumentsIdRequest,
  getDocumentsIds,
  isDomainAXA,
} from "@/utils/docUtils";
import userStore from "@/stores/userStore";
import { documentsByActs } from "@/api/apifunctions/documentsByActs";
import { showDematModal } from "./modals/modalDemat";
import { showModalNotSameNumber } from "./modals/modalNotSameNumber";
import { showWebmailModal } from "./modals/modalWebmail";
import { ResolverPropsType } from "@/types/ResolverDataType";
import useDocFilters from "@/hooks/useDocFilters";
import { fusionDocumentsWithDefaultPrePrinted } from "@/api/apifunctions/fusionDocumentsWithDefaultPrePrinted";

const MailResolver: React.FC<ResolverPropsType> = ({ data, resolverSuccess, resolverCancel }) => {
  const { alertError } = useAlert();
  const profile = userStore()?.user?.profile || { demat: false, webmail: false };
  const { config } = configStore();
  const { docFilters } = useDocFilters();

  const { mutateAsync: getdocumentsByActs, isLoading: docsByActsLoader } = useMutation(documentsByActs);
  const { mutateAsync: getMailClientOrId, isLoading: getMailLoader } = useMutation(clientByClientIdOrContract);
  const { mutateAsync: fusionDocuments, isLoading: fusionLoader } = useMutation(fusionDocumentsWithDefaultPrePrinted);

  const startSendMail = async () => {
    await startSendMailAsync();
  };

  const startSendMailAsync = async () => {
    let { acts, docs } = data;
    console.log(data, "datasssss");

    // if Act view
    if (acts) {
      docs = await getdocumentsByActs({
        docFilters,
        actsIds: acts?.map((act: any) => act.id),
      });
    }

    // If no  doc, show message and end
    if (!docs || !docs.length) {
      alertError("Erreur lors de la récupération des documents");
      return;
    }

    if (!allDocsHaveSameContractNumber(docs) || !allDocsHaveSameClientNumber(docs)) {
      return await showModalNotSameNumber({ documents: docs });
    }

    // demat check
    if (profile.demat) {
      const docsToDemat = getDocsToDemat(docs);
      if (docsToDemat.length === 1) {
        const docDPE = getDocsDEVIS_PROJET_ETUDE(docsToDemat);
        if (docDPE.length > 0) {
          const result = await showDematModal(
            { document: docDPE[0] },
            {
              title: "Avant d'envoyer le Devis",
              step1Title: "Remise des documents pré-contractuels",
              step2Title: "Envoi du devis",
              step2Content: (
                <div>
                  <h3 className="af-header__title">
                    <i className="glyphicon glyphicon-file" /> Devis
                  </h3>
                  <p>Création du message Outlook</p>
                  <Loader mode="get" text=" " classModifier="static">
                    <></>
                  </Loader>
                </div>
              ),
            }
          );
          if (!result.success) {
            resolverCancel();
            return;
          }
        }
      }
      // TODO : Code désactivé car sur l'existant SpoolnetNG, il n'y a pas de DematCG pour plusieurs documents
      // else if (docsToDemat.length > 1 && !allDocAreIL101(docs)) {
      //   ;
      //   const result = await showDematModal(
      //     {
      //       document: docs[0],
      //     },
      //     {
      //       title: "Avant d'envoyer le Devis",
      //       step1Title: "Remise des documents pré-contractuels",
      //       step2Title: "Envoi du devis",
      //       step2Content: (
      //         <div>
      //           <h3 className="af-header__title">
      //             <i className="glyphicon glyphicon-file" /> Devis
      //           </h3>
      //           <p>Création du message Outlook</p>
      //           <Loader mode="get" text=" " classModifier="static">
      //             <></>
      //           </Loader>
      //         </div>
      //       ),
      //     }
      //   );
      //   if (!result.success) {
      //     resolverCancel();
      //     return;
      //   }
      // }
    }

    // preprints before sending to esign
    const documentsIds = getDocumentsIds(docs);

    await fusionDocuments({
      idDocumentList: documentsIds,
    });

    await sendMaillDocuments(docs);
  };

  const sendMaillDocuments = async (docs: IDocument[]) => {
    console.log("resultresult");
    const getMailResult: any = await getMailClientOrId(
      docs.map((doc: IDocument) => ({
        clientNbr: doc.clientNumber,
        contractNbr: doc.contractNumber,
      }))
    );

    const mailData = getMailResult?.successData.join(",") || "";
    console.log(mailData, "mailData");
    const docsIdsRequest = getDocumentsIdRequest(docs);
    const docsIds = getDocumentsIds(docs);

    const isMobileOrTablet = IsMobileOrTablet();
    if (isMobileOrTablet || profile.webmail || isDomainAXA()) {
      const result = await showWebmailModal({ documents: docs, mailData });

      if (!result.success) {
        resolverCancel();
        return;
      }
    } else {
      // open outlook with mail infos
      const urlToMail =
        `SPOOLNETFILESDOWNLOADER:` +
        `destinataires:${(mailData || "").toLowerCase()}` +
        `|urlWSGetDocument:${config?.urls["get.document"]}` +
        `|listIdRequest:${docsIdsRequest.toString()}` +
        `|env:${config?.env}`;
      console.log(urlToMail, "urlToMaill");
      window.open(urlToMail, "_self");
    }

    await updateEmailStatus(docsIds);

    resolverSuccess();
  };

  useEffect(() => {
    if (data?.docs || data?.acts) startSendMail();
  }, [data?.docs, data?.acts]);

  return (
    <Loader mode={docsByActsLoader || getMailLoader || fusionLoader ? "get" : "none"} text="Chargement en cours">
      <></>
    </Loader>
  );
};

export default MailResolver;


ilya le outlook qui souvre et qui joint le pdf cest ou qui dfait ca dans ce code
