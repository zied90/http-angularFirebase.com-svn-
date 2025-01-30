import { FC, useContext, useEffect, useState } from "react";
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
                //disabled={!generateEnabled}
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


import { FC, useEffect, useRef, useState } from "react";
import "./FormItem.scss";
import InputMask from "./InputMask";
import { FormFieldInitEvent } from "../Form/FormChangeEvent";
//import InputMask from "./InputMask";

type Props = {
  children?: React.ReactNode;
  childrenClickable?: boolean;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string | boolean;
  defaultValue?: string | boolean;
  visibleValue?: string; // Value that is shown to the user when type=="viewhidden"
  disabled?: boolean;
  id?: string;
  hideInput?: boolean;
  label?: string | React.ReactNode;
  inputLabel?: string | React.ReactNode;
  name: string;
  onBlur?: (event: React.FocusEvent<HTMLFormElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLFormElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onInvalid?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onInit?: (input: HTMLFormElement) => void;
  format?: (value: string) => string;
  placeholder?: string;
  title?: string;
  type: string;
  validationInformation?: string;
  errorMessage?: string;
  autoFocus?: boolean;
  //validation properties
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  autoComplete?: string;
  rows?: number;
  datas?: {
    label: string;
    value: any;
  }[];
  //validation messages
  requiredMessage?: string;
  minLengthMessage?: string;
  maxLengthMessage?: string;
  patternMessage?: string;
  minMessage?: string;
  maxMessage?: string;
  labelStyle?:string,
  //validation behaviors
  validateOnFirstInput?: boolean;
  prefixId?: string;
  mask?: any; //string | RegExp | Array<string | RegExp>;
  dispatch?: (appended: string, dynamicMasked: any) => any;
};

const FormItem: FC<Props> = ({
  children,
  childrenClickable = false,
  className = "",
  autoComplete = "off",
  checked,
  defaultChecked,
  value,
  defaultValue,
  visibleValue,
  disabled = false,
  id,
  hideInput = false,
  label,
  maxLength = undefined,
  name,
  onChange: onChangeProp = (event) => {},
  onInvalid: onInvalidProp,
  onBlur: onBlurProp = (event) => {},
  onFocus,
  placeholder,
  type,
  title,
  inputLabel,
  validationInformation,
  required,
  minLength,
  pattern,
  min,
  max,
  rows,
  errorMessage: errorMessageProp,
  autoFocus = false,
  requiredMessage,
  minLengthMessage,
  maxLengthMessage,
  patternMessage,
  minMessage,
  maxMessage,
  prefixId = "",
  mask,
  format,
  dispatch = (_appended, dynamicMasked) => dynamicMasked.compiledMasks[0],
  validateOnFirstInput = false,
  labelStyle,
  datas,
}) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>(errorMessageProp || "");

  // const [hasBeenUserInput, setHasBeenUserInput] = useState<boolean>(false);
  const [hasBeenBlurred, setHasBeenBlurred] = useState<boolean>(false);
  const [hasBeenValidated, setHasBeenValidated] = useState<boolean>(false);

  const onInvalid = (event: React.InvalidEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateValidity(event.target);
    event.target.setCustomValidity("");
    setIsValid(false);
    setHasBeenValidated(true);
  };

  const onChange = (event: React.ChangeEvent<HTMLFormElement>, target?: HTMLFormElement) => {
    const localTarget = target || event.target;
    if (validateOnFirstInput || hasBeenBlurred || hasBeenValidated) {
      updateValidity(localTarget);
    }
    onChangeProp(event);
  };

  const onBlur = (event: React.FocusEvent<HTMLFormElement>, target?: HTMLFormElement) => {
    const localTarget = target || event.target;
    updateValidity(localTarget);
    setHasBeenBlurred(true);
    onBlurProp(event);
  };

  const updateValidity = (target: HTMLFormElement) => {
    setIsValid(target.validity.valid);
    setErrorMessage(target.validity.valid ? "" : getErrorMessage(target.validity, errorMessages, inputProps));
  };

  const inputProps = {
    datas,
    autoComplete,
    type,
    name,
    maxLength,
    disabled,
    placeholder,
    title,
    value,
    defaultValue,
    visibleValue,
    checked,
    onChange,
    onInvalid,
    onBlur,
    onFocus,
    autoFocus,
    required,
    minLength,
    pattern,
    min,
    max,
    mask,
    rows,
    dispatch,
    format,
  };

  const errorMessages = { requiredMessage, minLengthMessage, maxLengthMessage, patternMessage, minMessage, maxMessage };
  const [currentInput, setCurrentInput] = useState<HTMLFormElement | null>(null);
  const inputId = prefixId + id;
  const classNames = [
    "af-form-item",
    className,
    getClassName(type),
    disabled ? "af-form-item--disabled" : "",
    required ? "af-form-item--required" : "",
    !isValid ? "af-form-item--invalid" : "",
    checked ? "af-form-item--checked" : "",
  ].join(" ");

  const onInitFormItemElement = (input: HTMLFormElement) => {
    setCurrentInput(input);
  };

  useEffect(() => {
    if (currentInput) {
      currentInput.dispatchEvent(new FormFieldInitEvent(currentInput));
    }
  }, [currentInput]);

  return (
    <div className={classNames}>
      {label ? <label className={labelStyle} htmlFor={inputId}>{label}</label> : null}
      <div className="input">
        {hideInput ? null : <FormItemElement id={inputId} {...inputProps} onInit={onInitFormItemElement} />}
        {inputLabel ? <label htmlFor={inputId}>{inputLabel}</label> : null}
        {childrenClickable ? <label htmlFor={inputId}>{children}</label> : children}
        {validationInformation ? <div className="af-form-item__validation-information">{validationInformation}</div> : null}
        {!isValid && errorMessage ? <div className="af-form-item__error-message">{errorMessage}</div> : null}
      </div>
    </div>
  );
};

const getClassName = (type: string) => {
  switch (type) {
    case "text":
    case "textarea":
    case "checkbox":
    case "radio":
    case "select":
    case "file":
    case "view":
      return `af-form-${type}`;
    case "viewhidden":
      return `af-form-view`;
    default:
      return "af-form-text";
  }
};

const FormItemElement: FC<any> = (props) => {
  const { format, ...restProps } = props;
  const { type } = props;
  const { mask, dispatch, defaultValue, onInit, checked, defaultChecked, value, datas, visibleValue, ...otherProps } = restProps;
  const compiledProps = { ...otherProps, value, defaultValue, "data-testid": props.id };
  const inputRef = useRef<HTMLFormElement>(null);
  const onInput = (event: React.FormEvent<HTMLFormElement>) => {
    if (format) {
      const newValue = format(event.currentTarget.value);
      if (newValue !== event.currentTarget.value) event.currentTarget.value = newValue;
    }
    /// props.onChange(event, inputRef.current);
  };

  useEffect(() => {
    if (inputRef.current && (type === "radio" || type === "checkbox")) {
      onInit(inputRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.defaultChecked, props.checked]);

  switch (type) {
    case "view":
      return <span {...compiledProps}>{compiledProps.value || compiledProps.defaultValue}</span>;
    case "viewhidden":
      return (
        <>
          <span {...compiledProps}>{visibleValue || compiledProps.value || compiledProps.defaultValue}</span>
          <input {...compiledProps} type="hidden" />
        </>
      );
    case "textarea":
      return <textarea {...compiledProps} ref={inputRef}></textarea>;
    case "select":
      return (
        <select {...compiledProps} ref={inputRef}>
          {datas.map(({ label, value }: { label: string; value: any }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    case "checkbox":
    case "radio":
      return <input {...compiledProps} ref={inputRef} checked={checked} defaultChecked={defaultChecked} />;
    default:
      return mask !== undefined && mask !== null ? (
        <InputMask {...compiledProps} format={format} mask={mask} dispatch={dispatch} onInit={onInit} />
      ) : (
        <input {...compiledProps} ref={inputRef} onInput={onInput} />
      );
  }
};

const getErrorMessage = (validity: ValidityState, errorMessages: any, props: any): string => {
  const { valueMissing, tooShort, tooLong, patternMismatch, rangeUnderflow, rangeOverflow } = validity;
  const { minLength, maxLength, pattern, min, max } = props;
  const { requiredMessage, minLengthMessage, maxLengthMessage, patternMessage, minMessage, maxMessage } = errorMessages;

  if (valueMissing) return requiredMessage || "Ce champ est obligatoire";
  if (tooShort) return minLengthMessage || `Ce champ doit contenir au moins ${minLength} caractères`;
  if (tooLong) return maxLengthMessage || `Ce champ doit contenir au plus ${maxLength} caractères`;
  if (pattern && patternMismatch) return patternMessage || `Ce champ doit respecter le format ${pattern}`;
  if (rangeUnderflow) return minMessage || `Ce champ doit contenir au moins ${min}`;
  if (rangeOverflow) return maxMessage || `Ce champ doit contenir au plus ${max}`;
  return "Ce champ comporte une erreur";
};

export default FormItem;
je veux que   sur la page lorsque nest pas data dans ce champs  il afiiche ce champs obligatoire   , actuelement le resultat attendu est marche mais je dois cliquer n'mport  sur la ppafe pour que dit champ obligatoire si ilya pas  comment faire  type="text"
                    label={typeCourrier === "CTR" ? "Numéro de contrat" : "Numéro de client"}
