nav[role="tablist"] {
    display: flex;
    justify-content: center; /* Centre les tabs */
    gap: 32px; /* Espacement entre les tabs */
    margin-bottom: 2rem;
    border-bottom: 1px solid #e5e7eb;
    .nav-item {
      cursor: pointer;
      padding: 8px 16px;
      color: #666;
      background: none;
      border: none;
      font-size: inherit;
      position: relative;
      margin-bottom: -1px;
      transition: all 0.2s;
   &.active {
        color: #0052CC;
        border-bottom: 2px solid #0052CC;
      }
   &:focus {
        outline: none;
      }
    }
   }
   .form-field{
    width: 160px;  
   }
   .af-form{
    justify-content: center;
    margin: 4em 20em;
    align-items: stretch;
   }
   .af-form-actions{
    margin-top: 1em;
    margin-left: 12em;
    justify-content: center !important;
   }
   button.btn--reverse{
    margin-right: 1em;
   }


import { HabilitationWithForm } from "./habilitationWithForm";

import { useState } from "react";

import "./habilitation.scss";
import { useDelayApi } from "@/hooks/useApi";
import { adminHabilitationDeployRoute } from "@/Api/ApiRoutes";
export const Habilitation = () => {
  const [activeTab, setActiveTab] = useState("form");
  const { loaded, call: habiliterProfil } = useDelayApi(adminHabilitationDeployRoute);
  const handleSave = async (formData: any) => {
    // Ici vous pouvez appeler votre API avec les données du formulaire
    console.log("Form Data:", formData);
    try {
      await habiliterProfil(
          formData,
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          <HabilitationWithForm onSave={handleSave} loaded={loaded}  />
        </>
      ) : (
        <div className="upload-section">{/* Section d'import par fichier */}</div>
      )}
    </div>
  );
};
import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Loader from "@/toolkit/Components/Loader";

import { FC, useRef } from "react";
interface FormData {
  name: string;
  email: string;
  userNumber: string;
}
interface Props {
  className?: string;
  onCancel?: () => void;
  onSave?: (data: FormData) => void;
  loaded?: boolean;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onCancel = () => {}, onSave = () => {}, loaded = false }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const cancelClick = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    onCancel();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = ((formData.get("firstName") as string) || "").toUpperCase();
    const lastName = ((formData.get("lastName") as string) || "").toUpperCase();
    const name = `${firstName} ${lastName}`.trim();
    const data: FormData = {
      name,
      email: formData.get("email") as string,
      userNumber: formData.get("userNumber") as string,
    };
    onSave(data);
  };

  return (
    <Form onSubmit={handleSubmit} className="af-form">
      <Loader loaded={loaded}>
        <fieldset className="af-form-grid">
          <FormItem type="text" label="Nom" name="firstName" id="id-firstName" requiredMessage="Le nom est obligatoire" required />
          <FormItem type="text" label="Prénom" name="lastName" id="id-lastName" requiredMessage="Le Prénom est obligatoire" required />
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
          />
          <FormItem
            type="text"
            label="Matricule"
            name="userNumber"
            id="id-userNumber"
            requiredMessage="Le Matricule est obligatoire"
            required
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
      </Loader>
    </Form>
  );
};
