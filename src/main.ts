import { FC, useEffect, useState } from "react";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Button from "@/toolkit/Components/Form/Button";
import Loader from "@/toolkit/Components/Loader";
import Profiles from "@/Admin/profiles";
import { HabilitationForm } from "@/Admin/types/Habilitation.type";
import "../habilitation.scss";
interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  userNumber: string;
  authorities: string;
}
interface Props {
  className?: string;
  onSave: (data: HabilitationForm) => Promise<void>;
  loaded: boolean;
  initialData?: Partial<HabilitationForm>;
}
export const HabilitationWithForm: FC<Props> = ({ className = "", onSave, loaded, initialData = {} }) => {
  // Fonction pour extraire firstName et lastName du champ name
  const extractNameParts = (fullName: string = "") => {
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    userNumber: "",
    authorities: "",
  });
  useEffect(() => {
    // Si initialData.authorities est un tableau, on prend le premier élément
    const authorities = Array.isArray(initialData.authorities) ? initialData.authorities[0] || "" : initialData.authorities || "";
    // Extraction du nom et prénom depuis initialData.name
    const { firstName, lastName } = extractNameParts(initialData.name);
    setFormState((prev) => ({
      ...prev,
      ...initialData,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      authorities,
    }));
  }, [initialData]);
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
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        userNumber: "",
        authorities: "",
      });
    } catch (err) {
      // En cas d'erreur, on garde toutes les valeurs du formulaire
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
          <Button type="submit" classModifier="success" id="id-button-agence-save" data-testid="id-button-agence-save" disabled={!loaded}>
            Enregistrer
          </Button>
        </div>
      </Form>
    </Loader>
  );
};
  };
  et la deuxioeme erreur Property 'name' does not exist on type 'Partial<HabilitationForm>'.ts(2339)
any
No quick fixes available   et voci le compsent profile :import { FC, useMemo, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";
interface Props {
 className?: string;
 onChange?: (value: string) => void;
 value?: string;
}
const Profiles: FC<Props> = ({ className = "", onChange, value }) => {
 const [profiles] = useState<any>([
   { "id": "ADMIN", name: "ADMIN" },
   { "id": "AGT", name: "AGT" }
 ]);
 const profileDatas = useMemo(
   () => [
     { label: "Sélectionnez un profile", value: "" },
     ...profiles.map(({ name, id }: any) => ({ label: name, value: id }))
   ],
   [profiles]
 );
 const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
   onChange?.(event.target.value);
 };
 return profiles && profiles.length ? (
<FormItem
     id="id-profile"
     labelStyle={className}
     type="select"
     label="Profile"
     name="authorities"
     placeholder="Sélectionner un Profile"
     required={true}
     visibleValue={profiles.length === 1 ? profiles[0].name : undefined}
     value={value || (profiles.length === 1 ? profiles[0].id : "")}
     datas={profileDatas}
     onChange={handleChange}
   />
 ) : null;
};
export default Profiles;
