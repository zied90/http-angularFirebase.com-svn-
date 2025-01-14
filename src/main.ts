import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Loader from "@/toolkit/Components/Loader";
import "../habilitation.scss";

import { FC, useEffect, useState } from "react";
import { HabilitationForm } from "@/Admin/types/Habilitation.type";
import Profiles from "@/Admin/profiles";

interface Props {
  className?: string;
  onSave: (data: HabilitationForm) => void;
  loaded?: boolean;
  error?: string
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onSave = () => {}, loaded = false, error= '' }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userNumber: "",
    authorities: ""
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = ((formData.get("firstName") as string) || "").toUpperCase();
    const lastName = ((formData.get("lastName") as string) || "").toUpperCase();
    const email = ((formData.get("email") as string) || "");
    const userNumber = ((formData.get("userNumber") as string) || "");
    const name = `${firstName} ${lastName}`.trim();
    const data: HabilitationForm = {
      name,
      email,
      userNumber: formData.get("userNumber") as string,
      authorities:[formData.get("authorities") as string]
    };
    setFormState({
      firstName: firstName,
      lastName: lastName,
      email: email,
      userNumber: userNumber,
      authorities: ""
    })
    onSave(data);
  };
  useEffect(()=>{
if(!error){
  setFormState({
    firstName: "",
    lastName: "",
    email: "",
    userNumber: "",
    authorities: ""
  })
}
  },[error])

  return (
    <Form onSubmit={handleSubmit} className="af-form">
      <Loader loaded={loaded}>
        <fieldset className="af-form-grid">
          <Profiles />
          <FormItem type="text" label="Prénom" name="firstName" id="id-firstName" requiredMessage="Le nom est obligatoire" required defaultValue={formState.firstName} />
          <FormItem type="text" label="Nom" name="lastName" id="id-lastName" requiredMessage="Le Prénom est obligatoire" required  defaultValue={formState.lastName}  />
          <FormItem
            name="email"
            type="email"
            label="Adresse mail"
            required={true}
            id="id-mail"
            maxLength={255}
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
            patternMessage="L'adresse mail doit être au format prenom.nom@axa.fr"
            requiredMessage="L'email est obligatoire"
            defaultValue={formState.email}
          />
          <FormItem
            type="text"
            label="Matricule"
            name="userNumber"
            id="id-userNumber"
            requiredMessage="Le Matricule est obligatoire"
            required
            defaultValue={formState.userNumber}
          />
        </fieldset>
        <div className="af-form-actions">
          <Button type="submit" classModifier="success" id="id-button-agence-save" data-testid="id-button-agence-save">
            Enregistrer
          </Button>
        </div>
      </Loader>
    </Form>
  );
};
import { HabilitationWithForm } from "./habilitationWithForm";
import { useState } from "react";
import { useDelayApi } from "@/hooks/useApi";
import { adminHabilitationDeployRoute } from "@/Api/ApiRoutes";
export const Habilitation = () => {
  const [activeTab, setActiveTab] = useState("form");
  const { loaded, call: habiliterProfil, error } = useDelayApi(adminHabilitationDeployRoute);
  const handleSave = async (formData: any) => {
    try {
      await habiliterProfil(
          formData,
      );
    } catch (error) {
      console.log(error );
    }
  };

  return (
    <div className="habilitation">
      <nav role="tablist">
        <button role="tab" className={`nav-item ${activeTab === "form" ? "active" : ""}`} onClick={() => setActiveTab("form")}>
          Formulaire d'habilitation
        </button>
        <button role="tab" className={`nav-item ${activeTab === "import" ? "active" : ""}`} onClick={() => setActiveTab("import")}>
          Import par fichier
        </button>
      </nav>
      {activeTab === "form" ? (
        <>
          <HabilitationWithForm onSave={handleSave} loaded={loaded} error={error}  />
        </>
      ) : (
        <div className="upload-section">{/* Section d'import par fichier */}</div>
      )}
    </div>
  );
};    et voic le compsent formitem :import { FC, useEffect, useRef, useState } from "react";
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

  pour le cas ou ilya erreur je veux que le donné saisi reste dans le formulaire est ce que cest bien fait ou ilya mieux a faire
