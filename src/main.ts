import { FC, useState } from "react";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Button from "@/toolkit/Components/Form/Button";
import Loader from "@/toolkit/Components/Loader";
import Profiles from "@/Admin/profiles";
import { HabilitationForm } from "@/Admin/types/Habilitation.type";
import "../habilitation.scss";
interface Props {
  className?: string;
  onSave: (data: HabilitationForm) => Promise<void>;
  loaded?: boolean;
  error?: string;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onSave = async () => {}, loaded = false, error = "" }) => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userNumber: "",
    authorities: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleProfileChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      authorities: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data: HabilitationForm = {
        name: `${formState.firstName.toUpperCase()} ${formState.lastName.toUpperCase()}`.trim(),
        email: formState.email,
        userNumber: formState.userNumber,
        authorities: [formState.authorities],
      };
      await onSave(data);
      // Réinitialiser le formulaire seulement si pas d'erreur
      if (!error) {
        setFormState({
          firstName: "",
          lastName: "",
          email: "",
          userNumber: "",
          authorities: "",
        });
      }
    } catch (err) {
      console.error("Erreur lors de la soumission:", err);
    }
  };
  return (
    <Loader loaded={loaded} loaderOver={true}>
      <Form onSubmit={handleSubmit} className={`af-form ${className}`.trim()}>
        <fieldset className="af-form-grid">
          <Profiles onChange={handleProfileChange} value={formState.authorities} />
          <FormItem
            type="text"
            label="Prénom"
            name="firstName"
            id="id-firstName"
            requiredMessage="Le prénom est obligatoire"
            required
            value={formState.firstName}
            onChange={handleChange}
          />
          <FormItem
            type="text"
            label="Nom"
            name="lastName"
            id="id-lastName"
            requiredMessage="Le nom est obligatoire"
            required
            value={formState.lastName}
            onChange={handleChange}
          />
          <FormItem
            name="email"
            type="email"
            label="Adresse mail"
            required
            id="id-mail"
            maxLength={255}
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
            patternMessage="L'adresse mail doit être au format prenom.nom@axa.fr"
            requiredMessage="L'email est obligatoire"
            value={formState.email}
            onChange={handleChange}
          />
          <FormItem
            type="text"
            label="Matricule"
            name="userNumber"
            id="id-userNumber"
            requiredMessage="Le matricule est obligatoire"
            required
            value={formState.userNumber}
            onChange={handleChange}
          />
        </fieldset>
        <div className="af-form-actions">
          <Button type="submit" classModifier="success" id="id-button-agence-save" data-testid="id-button-agence-save">
            Enregistrer
          </Button>
        </div>
      </Form>
    </Loader>
  );
};import { HabilitationWithForm } from "./habilitationWithForm";
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
 lorsque lapi retourne avec erreur je veux pas initiliser le formulaire  et je he veux  initialiser que api est  traiter lenregistrement 
