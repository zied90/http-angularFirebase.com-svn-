import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";

import { FC, useRef } from "react";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  userNumber: string;
}
interface Props {
  className?: string;
  onCancel?: () => void;
  onSave?: (data: FormData) => void;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onCancel = () => {}, onSave = () => {} }) => {
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
    const data: FormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      userNumber: formData.get("userNumber") as string,
    };
    onSave(data);
  };

  return (
    <Form onSubmit={handleSubmit} className="af-form mt-md label-15">
      <fieldset className="af-form-grid">
        <FormItem type="text" label="Nom" name="firstName" id="id-firstName" requiredMessage="Le nom est obligatoire" required autoFocus />
        <FormItem
          type="text"
          label="Prénom"
          name="lastName"
          id="id-lastName"
          requiredMessage="Le Prénom est obligatoire"
          required
          autoFocus
        />
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

import { useState } from "react";

import "./habilitation.scss";
import { useDelayApi } from "@/hooks/useApi";
import { adminHabilitationDeployRoute } from "@/Api/ApiRoutes";
export const Habilitation = () => {
  const [activeTab, setActiveTab] = useState("form");
  const { loaded, call: habiliterProfil } = useDelayApi(adminHabilitationDeployRoute);
  const handleSave = async (user: any) => {
    // Ici vous pouvez appeler votre API avec les données du formulaire
    console.log("Form Data:", user);
    try {
      await habiliterProfil({
          user,
      });
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
          <HabilitationWithForm onSave={handleSave} />
        </>
      ) : (
        <div className="upload-section">{/* Section d'import par fichier */}</div>
      )}
    </div>
  );
};
    @RequestMapping(
        method = {RequestMethod.POST},
        value = {"/user/deploy"},
        produces = {"application/json"},
        consumes = {"application/json"}
    )
    ResponseEntity<Void> userDeploy(@ApiParam("") @RequestBody(required = false) @Valid User user);
