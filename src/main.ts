import Types from "@/Admin/type";
import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Loader from "@/toolkit/Components/Loader";
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
    <div >
      <Form data-testid="agence-edit-form">
        <fieldset >
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
            <Types className="" data-testid="types" />
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
    </div>
  );
};
