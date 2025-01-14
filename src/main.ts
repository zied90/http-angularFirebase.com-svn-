import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Loader from "@/toolkit/Components/Loader";
import "../habilitation.scss";

import { FC } from "react";
import { HabilitationForm } from "@/Admin/types/Habilitation.type";
import Profiles from "@/Admin/profiles";

interface Props {
  className?: string;
  onSave: (data: HabilitationForm) => void;
  loaded?: boolean;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onSave = () => {}, loaded = false }) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = ((formData.get("firstName") as string) || "").toUpperCase();
    const lastName = ((formData.get("lastName") as string) || "").toUpperCase();
    const name = `${firstName} ${lastName}`.trim();
    const data: HabilitationForm = {
      name,
      email: formData.get("email") as string,
      userNumber: formData.get("userNumber") as string,
      authorities:[formData.get("authorities") as string]
    };
    onSave(data);
  };

  return (
    <Form onSubmit={handleSubmit} className="af-form">
      <Loader loaded={loaded}>
        <fieldset className="af-form-grid">
          <Profiles />
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
          <Button type="submit" classModifier="success" id="id-button-agence-save" data-testid="id-button-agence-save">
            Enregistrer
          </Button>
        </div>
      </Loader>
    </Form>
  );
};import { HabilitationWithForm } from "./habilitationWithForm";
import { useState } from "react";
import { useDelayApi } from "@/hooks/useApi";
import { adminHabilitationDeployRoute } from "@/Api/ApiRoutes";
export const Habilitation = () => {
  const [activeTab, setActiveTab] = useState("form");
  const { loaded, call: habiliterProfil } = useDelayApi(adminHabilitationDeployRoute);
  const handleSave = async (formData: any) => {
    try {
      await habiliterProfil(
          formData,
      );
    } catch (error) {
      console.log(error);
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
          <HabilitationWithForm onSave={handleSave} loaded={loaded}  />
        </>
      ) : (
        <div className="upload-section">{/* Section d'import par fichier */}</div>
      )}
    </div>
  );
};
je veux que si ilya erreur backend ne vide pas le formulaire
