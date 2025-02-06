import React, { useEffect } from "react";
import { useMutation } from "react-query";
import Loader from "@axa-fr/react-toolkit-loader";
import configStore from "@/stores/configStore";
import { fusionDocumentsWithEsignTreatment } from "@/api/apifunctions/fusionDocumentsWithEsignTreatment";
import { preprintedList } from "@/api/apifunctions/preprintedList";
import { subscribers } from "@/api/apifunctions/subscribers";

import { updateEsignDocSent } from "@/api/apifunctions/updateEsignDocSent";
import { IDocument } from "@/types/documents";
import { addLeadingZeros, getDomainForUrl, getEsignUrl } from "@/utils/index";
import { documentsByActs } from "@/api/apifunctions/documentsByActs";

import {
  allActsAreEsign,
  allDocAreIL101,
  allDocsAreEsign,
  allDocsHaveSameClientNumber,
  allDocsHaveSameContractNumber,
  allDocsHaveSameSubscriberNumber,
  getActsNotEsign,
  getDocsEsign,
  getDocsNotEsign,
  getDocsToDemat,
  getDocumentsIds,
} from "@/utils/docUtils";
import userStore from "@/stores/userStore";
import { showDematNotEsignModal } from "./modals/modalNotEsign";
import { showDematModal } from "./modals/modalDemat";
import { showModalNotSameNumber } from "./modals/modalNotSameNumber";
import { showModalPrePrint } from "./modals/modalPrePrint";
import { ged } from "@/api/apifunctions/ged";
import { ResolverPropsType } from "@/types/ResolverDataType";
import useDocFilters from "@/hooks/useDocFilters";
import { mergeGedWithDocs } from "@/utils/getEsignUrl";
import { useAlert } from "@/components/GlobalAlert/useAlert";

const EsignResolver: React.FC<ResolverPropsType> = ({ data, resolverSuccess, resolverCancel }) => {
  const profile = userStore()?.user?.profile || { esign: false, demat: false };
  const { alertError } = useAlert();

  const { docFilters } = useDocFilters();

  const { config } = configStore(); 

  const { mutateAsync: getdocumentsByActs, isLoading: docsByActsLoader } = useMutation(documentsByActs);
  const { mutateAsync: getPreprintedList, isLoading: statusLoader } = useMutation(preprintedList);
  const { mutateAsync: fusionDocuments, isLoading: fusionLoader } = useMutation(fusionDocumentsWithEsignTreatment);

  const { mutateAsync: getSubscribers, isLoading: subscribersLoader } = useMutation(subscribers, {
    onSuccess: async (data) =>
      data?.successData?.subscribers
        ?.split(";")
        .filter((el: any, index: number) => data?.successData?.subscribers.indexOf(el) !== index)
        .map((el: any) => addLeadingZeros(el.toString(), 10))
        .join(";"),
  });
  const { mutateAsync: getGed, isLoading: channelLoader } = useMutation(ged);

  /** Function to do esign docs
   *  Note : This algorithm exists as a activity diagram in docs folders
   */
  const startEsignAsync = async () => {
    let { acts, docs, axapac } = data;

    // if Act view
    if (acts) {
      if (!allActsAreEsign(acts)) {
        await showDematNotEsignModal({ data: getActsNotEsign(acts), modeAct: true });
        resolverCancel();
        return;
      }

      const docsFromActs = await getdocumentsByActs({
        docFilters,
        actsIds: acts?.map((act: any) => act.id),
      });

      docs = getDocsEsign(docsFromActs);
    }

    // If no esign doc, show message and end
    if (!docs || !docs.length || !allDocsAreEsign(docs)) {
      await showDematNotEsignModal({ data: getDocsNotEsign(docs || []), modeAct: false });
      resolverCancel();
      return;
    }

    // check if all docs are same contract number or same client number and same subscriber number
    if (
      !allDocsHaveSameContractNumber(docs) ||
      !allDocsHaveSameClientNumber(docs) ||
      !allDocsHaveSameSubscriberNumber(docs)
    ) {
      await showModalNotSameNumber({ documents: docs });
      resolverCancel();
      return;
    }

    const documentsIds = getDocumentsIds(docs);

    // if demat profile and alls docs are not IL101 and some docs are demat then show demat modal and demat them
    if (!axapac && !allDocAreIL101(docs) && profile.demat) {
      const docsToDemat = getDocsToDemat(docs);
      if (docsToDemat.length > 0) {
        if (allDocsHaveSameContractNumber(docsToDemat) || allDocsHaveSameClientNumber(docsToDemat)) {
          const dematDocName =
            docsToDemat[0].documentOptions.typeLetter === "DEVIS_PROJET_ETUDE" ? "Devis" : "Conditions Particulières";
          const result = await showDematModal(
            {
              document: docs[0],
            },
            {
              title: `Avant de signer électroniquement`,
              step2Title: `Envoi des ${dematDocName}`,
              step2Content: (
                <div>
                  <h3 className="af-header__title">
                    <i className="glyphicon glyphicon-file" /> {dematDocName}
                  </h3>
                  <p>en cours d'impression</p>
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
        } else {
          await showModalNotSameNumber({ documents: docs });
          resolverCancel();
          return;
        }
      }
    }

    // get preprints before sending to esign
    const preprintedsList = await getPreprintedList(documentsIds);
    let preprintedId: string;
    if(preprintedsList.length === 0){
      preprintedId= ''
    }else{ 
    if (preprintedsList.length !== 1) {
      const preprintModalResult = await showModalPrePrint({ preprinteds: preprintedsList });
      if (!preprintModalResult.success) {
        resolverCancel();
        return;
      }
      preprintedId = preprintModalResult.preprinted;
    } else {
      preprintedId = preprintedsList[0].id;
    }
   }
    // if (preprintedId) {
    await fusionDocuments({
      idDocumentList: documentsIds,
      idPreprinted: preprintedId as string,
    });
    // }

    try {
      await debranchementEsign(docs);
    } catch (e) {
      alertError("Une erreur est survenue lors de la génération de l'url de e-signature");
      resolverCancel();
    }
    await updateEsignDocs(documentsIds);
  };

  const debranchementEsign = async (docs: IDocument[]) => {
    const documentsIds = getDocumentsIds(docs);

    try {
      const [subscribers, ged] = await Promise.all([await getSubscribers(documentsIds), await getGed(documentsIds)]);
      const docsGed = mergeGedWithDocs(docs, ged.successData);

      const esignObject = {
        identifiantAbonne: subscribers?.successData || [],
        urlEsign: config ? getDomainForUrl(config.urls.esign, config) : "",
        ged: docsGed,
        token: docsGed[0]?.token,
      };

      let url: any = getEsignUrl(docs, esignObject, config);
      window.open(url, "_blank");
    } catch (error) {
      throw error;
    }
  };

  const startEsign = async () => {
    await startEsignAsync();
  };

  const { mutateAsync: updateEsignDocs, isLoading: updateLoader } = useMutation(updateEsignDocSent, {
    onSuccess: () => {
      resolverSuccess();
    },
    onError: () => {
      resolverCancel();
    },
  });

  useEffect(() => {
    if (data?.docs || data?.acts) startEsign();
  }, [data?.docs, data?.acts]);

  return (
    <Loader
      mode={
        subscribersLoader || fusionLoader || statusLoader || channelLoader || updateLoader || docsByActsLoader
          ? "get"
          : "none"
      }
      text="Chargement en cours"
    >
      {" "}
    </Loader>
  );
};

export default EsignResolver;

dans ce code jai fai ca    if(preprintedsList.length === 0){
      preprintedId= ''
    } pour ne ma afficher showmidal  est ce que cest bien le if et le else 
