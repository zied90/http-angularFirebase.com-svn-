import { HabilitationWithForm } from "./habilitationWithForm";

import React, { useState } from "react";

import "./habilitation.scss";
export const Habilitation = () => {
  const [activeTab, setActiveTab] = useState("form");
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
          <HabilitationWithForm />
        </>
      ) : (
        <div className="upload-section">{/* Section d'import par fichier */}</div>
      )}
    </div>
  );
};
import Button from "@/toolkit/Components/Form/Button";
import FormItem from "@/toolkit/Components/Form/FormItem";

import { FC } from "react";

interface Props {
  className?: string;
  onCancel?: (reason: any) => void;
  onSave?: () => void;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onCancel = () => {}, onSave = () => {} }) => {
  const cancelClick = () => {
    console.log("object");
  };
  
  return (
    <form className="af-form mt-md label-15">
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
    </form>
  );
};
comment faire pour le save   donne le code 
