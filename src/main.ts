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
};
  pour le cas ou ilya erreur je veux que le donné saisi reste dans le formulaire est ce que cest bien fait ou ilya mieux a faire
