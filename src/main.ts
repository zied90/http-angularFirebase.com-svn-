import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";

import { FC } from "react";

interface Props {
  className?: string;
  onCancel?: (reason: any) => void;
  onSave?: (data:any) => void;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onCancel = () => {}, onSave = () => {} }) => {
  const cancelClick = () => {
    console.log("object");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

  };

  return (
    <Form onSubmit={onSubmit} className="af-form mt-md label-15">
      <fieldset className="af-form-grid">
        <FormItem type="text" label="Nom" name="title" id="id-nom" requiredMessage="Le nom est obligatoire" required autoFocus />
        <FormItem type="text" label="Prénom" name="title" id="id-nom" requiredMessage="Le nom est obligatoire" required autoFocus />
        <FormItem
          name="email"
          type="email"
          label="Adresse mail"
          required={true}
          id="id-mail"
          maxLength={255}
          pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
          patternMessage="L'adresse mail doit être au format prenom.nom@axa.fr"
          requiredMessage="L'adresse mail obligatoire"
        />
        <FormItem
          type="text"
          label="userNumber"
          name="title"
          id="id-userNumber"
          requiredMessage="Le Matricule est obligatoire"
          required
          autoFocus
        />
      </fieldset>
      <div className="af-form-actions">
        <Button
          type="button"
          classModifier="reverse"
          onClick={cancelClick}
          id="id-button-agence-cancel"
          data-testid="id-button-agence-cancel"
        >
          Annuler
        </Button>
        <Button type="submit" classModifier="success" id="id-button-agence-save" data-testid="id-button-agence-save">
          Enregistrer
        </Button>
      </div>
    </Form>
  );
};
import { HabilitationWithForm } from "./habilitationWithForm";

import React, { useState } from "react";

import "./habilitation.scss";
export const Habilitation = () => {
  const [activeTab, setActiveTab] = useState("form");
     function save(): void {
          //call api
         console.log("ttttt") 
     }

  return (
    <div>
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
          <HabilitationWithForm  onSave={save}/>
        </>
      ) : (
        <div className="upload-section">{/* Section d'import par fichier */}</div>
      )}
    </div>
  );
};
import { FC, useEffect, useRef } from "react";
import { debounce } from "ts-debounce";
import "./Form.scss";
import { FormFieldInitEvent } from "./FormChangeEvent";

interface Props {
  className?: string;
  children?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  onInvalid?: (event: React.FormEvent<HTMLFormElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onInit?: (event: FormFieldInitEvent) => void;
  onRef?: (ref: HTMLFormElement) => void;
  focusOnFirstInvalid?: boolean;
}

const Form: FC<Props> = ({
  className = "",
  children,
  onSubmit,
  onChange = () => {},
  onInit = () => {},
  onRef = () => {},
  onInvalid: onInvalidProp = () => {},
  focusOnFirstInvalid = true,
  ...rest
}) => {
  const ref = useRef<HTMLFormElement>(null);

  const onInvalid = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (focusOnFirstInvalid) {
      focusOnFirstInvalidInput(event.currentTarget);
    }
    onInvalidProp(event);
  };

  const onFormFieldInitEvent = (event: FormFieldInitEvent) => {
    onInit(event);
  };

  /** add a customEventListener on form element */
  useEffect(() => {
    const form = ref.current;
    if (form) {
      form.addEventListener(FormFieldInitEvent.eventName, onFormFieldInitEvent as EventListener);
      onRef(form);
    }
    return () => {
      if (form) {
        form.removeEventListener(FormFieldInitEvent.eventName, onFormFieldInitEvent as EventListener);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={`af-form ${className}`} {...{ onSubmit, onInvalid, onChange, ...rest }} ref={ref}>
      {children}
    </form>
  );
};

const focusOnFirstInvalidInput = debounce((form: HTMLFormElement) => {
  const firstInvalidInput = form.querySelector("input:invalid");
  if (firstInvalidInput) {
    (firstInvalidInput as HTMLInputElement).focus();
  }
}, 100);

export default Form;
comment faire pour avoir data depuis compsent enfant ou ilya autre solution
