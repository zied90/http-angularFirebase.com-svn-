import { FC, useContext, useEffect, useState ,useRef} from "react";
import { useParams } from "react-router-dom";
import Agences from "@/components/Agences";
import { useApi, useDelayApi } from "@/hooks/useApi";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Loader from "@/toolkit/Components/Loader";
import Document from "@/types/Document.type";
import { useNavigate } from "react-router-dom";
import { courriers, getRouteItemFromId } from "@/config/Routes";
import { useCache } from "@/hooks/useCache";
import { addListenToBroadcast } from "@/Utils/CommunicationWithAddinUtils";
import {
  templateSingleRoute,
  generateCourrierRoute as generateCourrierRouteApi,
  courriersSauvegardesRoute,
  courriersGeneresRoute,
} from "@/Api/ApiRoutes";
import "./Generer.scss";
import Signature from "../Parametres/Signature/Signature";
import { SignatureContext } from "@/context/SignatureProvider";
import Branches from "./Branches";
import TypesDocuments from "./TypesDocuments";
import Template from "@/types/Template.type";
import { contextManager } from "@/services/ContextManager";
import { debounce } from "ts-debounce";
interface Props {
  className?: string;
}

const Generer: FC<Props> = ({ className = "" }) => {
  const { id } = useParams() as { id: string };
  const { data: dataCourrier, loaded: dataCourrierLoaded } = useApi(templateSingleRoute, { id });
  const courrier = dataCourrier ? (dataCourrier as Document) : null;
  const typeCourrier = courrier?.type as string; // CTR or CLT
  const { call: callGenerateCourrier, loaded: generateCourrierLoaded } = useDelayApi(generateCourrierRouteApi);
  const [wordEditInProgress, setWordEditInProgress] = useState<boolean>(false);
  const navigate = useNavigate();
  const cache = useCache();
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const [formDatas, setFormDatas] = useState<any>({});
  const context = contextManager.getContext();
  const [numContratOrClient, setNumContratOrClient] = useState<string | undefined>(undefined);
  const { numContrat: contextNumContrat, numClient: contextNumClient } = context || { numContrat: null, numClient: null };

  useEffect(() => {
    if ((contextNumContrat || contextNumClient) && typeCourrier) {
      setNumContratOrClient(
        contextNumContrat || contextNumClient ? (typeCourrier === "CTR" ? contextNumContrat : contextNumClient) : undefined
      );
    }
  }, [contextNumContrat, contextNumClient, typeCourrier]);
  

  // should use formData object instead of this
  const [signatureCheck, setSignatureCheck] = useState<boolean>(true);
  const { signature } = useContext(SignatureContext);

  function updateFormDatas(ref?: any) {
    let fixedRef = ref?.target?.form || ref;

    if (formRef || fixedRef) {
      const formDatasObject = Object.fromEntries(new FormData(formRef || fixedRef).entries());
      setFormDatas((formDatas: any) => formDatasObject);
    }
  }

  const onRef = (ref: HTMLFormElement) => {
    setFormRef(ref);
    // add a DOM observer to trigger updateFormData on load, its an ugly fix for the form button générer not being refreshed on load
    const observer = new MutationObserver(
      debounce((mutations: MutationRecord[], observer: MutationObserver) => {
        updateFormDatas(ref);
      }, 100)
    );
    setTimeout(() => {
      observer.disconnect();
    }, 6000);
    observer.observe(ref, { childList: true, subtree: true });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // remove empty values from formDatas
      const tmpFormDatas = { ...formDatas };
      Object.keys(tmpFormDatas).forEach((key) => (tmpFormDatas[key] == null || tmpFormDatas[key] === "") && delete tmpFormDatas[key]);
      const { agence, signature, ...restFormDatas } = tmpFormDatas;
      const { contractNumber, clientNumber } = restFormDatas;
      const response = await callGenerateCourrier({
        ...restFormDatas,
        id,
        agenceId: agence,
        signature: !!signature,
      });

      if (response) {
        window.open("ms-word:ofe|u|" + response.webUrl, "_blank");
      }
      cache.clearAllCacheByName(courriersSauvegardesRoute.id);
      cache.clearAllCacheByName(courriersGeneresRoute.id);

      setWordEditInProgress(true);

      addListenToBroadcast({
        id,
        identifier: contractNumber || clientNumber,
        message: ["DOCUMENT_SAVED", "DOCUMENT_ARCHIVED"],
        callback: onDocumentSaved,
      });
      contextManager.clearContext();
    } catch (error) {
      console.error(error);
    }
  };

  const onDocumentSaved = (dataResponse: any) => {
    const message = dataResponse?.message as string;
    // empty cacheManager for courriersGeneresRoute ou courriersSauvegardes and redirect to Mes courriers
    if (message === "DOCUMENT_SAVED") cache.clearAllCacheByName(courriersSauvegardesRoute.id);
    if (message === "DOCUMENT_ARCHIVED") cache.clearAllCacheByName(courriersGeneresRoute.id);

    setWordEditInProgress(false);
    const redirectRoute = getRouteItemFromId(courriers);
    const redirectionLocation = redirectRoute?.path || "/";
    navigate(redirectionLocation);
  };

  const generateEnabled =
    formDatas.agence && (formDatas.contractNumber || formDatas.clientNumber) && formDatas.ecmDocumentType && formDatas.branch;
  return (
    <div className={`Generer ${className}`}>
      <Loader loaded={generateCourrierLoaded} loaderOver={true} message="Récupération du document...">
        <main>
          <h2>Générer le courrier</h2>
          <Form className="mt-md" onChange={updateFormDatas} onSubmit={onSubmit} onInit={updateFormDatas} onRef={onRef}>
            <Loader loaded={dataCourrierLoaded} loaderOver={true} message="Chargement des informations du document">
              <h3>Information courrier</h3>
              <div className="max-width-600">
                <fieldset className="af-form-grid">
                  <FormItem id="id-courrier-name" type="view" label="Nom du modèle" name="courrierName" value={courrier?.title} />
                  {/* <FormItem
                    id="id-courrier-type"
                    type="select"
                    label="Type de courrier"
                    name="courrierType"
                    value={typeCourrier}
                    datas={typesCourrier}
                  /> */}
                  <FormItem
                    id="id-contract-or-client-number"
                    data-testid="id-contract-or-client-number"
                    type="text"
                    label={typeCourrier === "CTR" ? "Numéro de contrat" : "Numéro de client"}
                    placeholder={"Saisir un numéro de " + (typeCourrier === "CTR" ? "contrat" : "client")}
                    name={typeCourrier === "CTR" ? "contractNumber" : "clientNumber"}
                    format={(value) => value.replace(/\s/g, "")}
                    pattern={typeCourrier === "CTR" ? undefined : "^\\d{5,}$"}
                    maxLength={16}
                    patternMessage={`Le numéro de ${
                      typeCourrier === "CTR" ? "contrat" : "client"
                    } doit être composé au minimum de 5 chiffres`}
                    errorMessage={`Le numéro de ${
                      typeCourrier === "CTR" ? "contrat" : "client"
                    } doit être composé  au minimum de 5 chiffres`}
                    autoFocus
                    value={numContratOrClient}
                    onChange={(e) => setNumContratOrClient(e.target.value)}
                 
                    required
                  />
                  {courrier ? (
                    <>
                      <Branches id={id} />
  
                      <TypesDocuments template={courrier as Template} />
                
                    </>
                  ) : null}
                </fieldset>
              </div>
            </Loader>

            <Agences autoSelectFirstIfOne={true} onAgenceAddOrDelete={updateFormDatas} />

            <h3>Signature</h3>
            <FormItem
              className="af-form-checkbox af-form-item_label--left af-form-item--floating-checkbox af-item--align-label"
              type="checkbox"
              name="signature"
              id="signature"
              label="Afficher la signature"
              childrenClickable={true}
              checked={signatureCheck}
              onChange={(event) => setSignatureCheck(event.target.checked)}
              value={true}
              hideInput={!signature}
            >
              <Signature viewMode="image" className="Signature--small af-panel" />
            </FormItem>
            <div className="row align-items-center mt-md">
              <button
                type="submit"
                className="btn btn--primary"
                disabled={!generateEnabled}
                id="id-button-generate-courrier"
                data-testid="id-button-generate-courrier"
              >
                Générer le courrier
              </button>
              <div className="generation-courrier-message">
                <Loader inline={true} loaded={!wordEditInProgress} message="Edition du document word en cours..."></Loader>
              </div>
            </div>
          </Form>
        </main>
      </Loader>
    </div>
  );
};

export default Generer;
on peux  que declencher chmps obligatoir a larriver a la page  sans qluicer sur la form pour apprattre  car cest le cas maintenat 
