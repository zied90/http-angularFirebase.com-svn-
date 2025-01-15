import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import Agence from "./Agence";

let deleteAgence = vi.fn();
let setAgence = vi.fn();

let useEffect = vi.fn((cb) => cb());

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useState: vi.fn((agence) => [agence, setAgence]),
    useContext: vi.fn(() => {
      const context = {
        deleteAgence: deleteAgence,
      };
      return context;
    }),
    useEffect: (cb: any) => useEffect(cb),
    createContext: (actual as any).createContext,
  };
});

vi.mock("@/context/AgencesProvider", () => ({
  AgencesContext: vi.fn(),
}));

//let createModal = vi.fn().mockReturnValue(async () => (await import("./AgenceEdit")).default);

let createModal = vi.fn().mockImplementation((cb) => {
  cb();
  return { id: "1", title: "agence resolved" };
});
let deleteConfirmModal = vi.fn().mockReturnValue(true);

vi.mock("@/toolkit/Components/Modal/useModal", () => {
  return {
    default: () => {
      return {
        createModal: createModal,
        deleteConfirmModal: deleteConfirmModal,
      };
    },
  };
});

vi.mock("@/Utils/StringUtils", () => ({
  slugify: (str: string) => str,
}));

vi.mock("./AgenceEdit", () => ({
  default: vi.fn().mockReturnValue(<div data-testid="agence-edit" />),
}));

let agence = {
  id: "1",
  name: "agence name",
  title: "title",
  phone: "+33 06 12 34 56 78",
  fax: "+33 01 23 45 67 89",
  modifyDate: "2021-01-01T00:00:00.000Z",
  address: {
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    addressLine3: "addressLine3",
    addressLine4: "addressLine4",
    postalCode: "postalCode",
    city: "city",
  },
  numOrias: "numOrias",
};

describe("Agence", () => {
  test("Render agence", () => {
    render(<Agence agence={agence} />);
    expect(screen.getByText(agence.name)).toBeInTheDocument();
    expect(screen.getByText(agence.title)).toBeInTheDocument();
  });

  test("Open agence edit and set agence on result", async () => {
    //useEffect.mockImplementation((cb) => {});
    render(<Agence agence={agence} />);
    await screen.getByTestId("id-agence-modify").click();
    expect(createModal).toHaveBeenCalledWith(expect.any(Function), {
      title: "Modification coordonnées agence",
      className: "modal-agence-edit",
    });
    expect(setAgence).toHaveBeenCalledWith({ id: "1", title: "agence resolved" });
  });

  test("Open Agence edit and console and error", async () => {
    // arrange
    createModal.mockImplementation(() => {
      throw new Error("cancel");
    });
    vi.spyOn(console, "info").mockImplementation(() => {});
    // act
    render(<Agence agence={agence} />);
    await screen.getByTestId("id-agence-modify").click();
    // assert
    expect(createModal).toThrowError("cancel");
    expect(console.info).toHaveBeenCalledWith("Agence modification canceled, reason:", new Error("cancel"));
  });

  test("Trigger event onSelect when agence is clicked", async () => {
    const onSelect = vi.fn();
    render(<Agence agence={agence} onSelect={onSelect} />);
    await screen.getByTestId(`id-agence-1-title`).click();
    expect(onSelect).toHaveBeenCalledWith(agence);
  });

  test("Delete agence action", async () => {
    render(<Agence agence={agence} />);
    await screen.getByTestId(`id-agence-delete-id-agence-1-title`).click();
    expect(deleteConfirmModal).toHaveBeenCalledWith(expect.anything(), expect.any(Function), {
      title: "Suppression agence",
      confirmButtonText: "Supprimer",
    });
  });

  test("Delete agence cancel", async () => {
    // arrange
    deleteConfirmModal.mockImplementation(() => {
      throw new Error("cancel");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});

    // act
    render(<Agence agence={agence} />);
    await screen.getByTestId(`id-agence-delete-id-agence-1-title`).click();

    // assert
    expect(deleteConfirmModal).toThrowError("cancel");
    expect(console.error).toHaveBeenCalled();
  });
});
import { AgencesContext } from "@/context/AgencesProvider";
import { FC, useContext, useEffect, useState } from "react";
import Alert from "@/toolkit/Components/Alert";
import { AlertTypeEnum } from "@/toolkit/Components/Alert/Alert.type";
import Button from "@/toolkit/Components/Form/Button";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import FormItemGroup from "@/toolkit/Components/Form/FormItemGroup";
import Loader from "@/toolkit/Components/Loader";
import { formToObject } from "@/toolkit/Utils/FormUtils";
import AgenceType from "@/types/Agence.type";
import "./AgenceEdit.scss";

interface Props {
  className?: string;
  agence: AgenceType;
  onCancel?: (reason: any) => void;
  onSave?: (agence: AgenceType) => void;
}
const AgenceEdit: FC<Props> = ({ className = "", agence: agenceProp, onCancel = () => {}, onSave = () => {} }) => {
  const { saveAgence, agenceSaveLoaded, error: errorSave, clearError } = useContext(AgencesContext);
  const [agence, setAgence] = useState<AgenceType>(agenceProp);
  const { title, name, address, phone, fax, numOrias, email, useEmailFlag } = agence;
  const [emailRequired, setEmailRequired] = useState<boolean>(!!useEmailFlag);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = formToObject({
      form: event.currentTarget,
      source: agence,
      preserve: ["id"],
    }) as AgenceType;
    setAgence(data);
    try {
      await saveAgence(data);
      onSave(data);
    } catch (e) {
      console.error(e);
    }
  };

  const cancelClick = () => {
    onCancel("cancel");
  };

  useEffect(() => {
    clearError();
  }, [errorSave, clearError]);

  const phoneMask = [
    {
      mask: /^[\d+]+/,
      lazy: true,
      startsWith: [""],
    },
    {
      mask: "\\00 00 00 00 00",
      lazy: false,
      startsWith: ["0"],
    },
    {
      // +33
      mask: "+33 0 00 00 00 00",
      lazy: false,
      startsWith: ["33", "+33"],
    },
    {
      // +596 +594, etc...
      mask: "+590 000 00 00 00",
      lazy: false,
      startsWith: ["59", "+59"],
    },
  ];

  // this function permit to select the mask to use when the user start to type the phone number
  const phoneDispatchFunction = (appended: string, dynamicMasked: any) => {
    const typed = dynamicMasked.value + appended;
    const masks = dynamicMasked.compiledMasks.filter((mask: any) => {
      for (let i = 0; i < mask.startsWith.length; i++) {
        const start = mask.startsWith[i];
        if (start === "") return false;
        if (typed.indexOf(mask.startsWith[i]) === 0) return true;
      }
      return false;
    });
    return masks.length === 1 ? masks[0] : dynamicMasked.compiledMasks[0];
  };

  /**  regex to match the phone number 06 12 34 56 78 or +596 612 34 56 78 or +33 6 12 34 56 78
    ^                   - Start of string
    (                   - Start of capturing group
      \+33\s\d\s\d\d     +33 6 12 .. .. ..
      0\d\s\d\d          06 12 .. .. ..
      \+59\d\s\d\d\d     +596 612 .. .. ..
    )                   - End of capturing group
    (\s\d\d){3}         - .. .. 01 23 45 or +33 . .. 12 34 56
    $                   - End of string
  */
  const phoneHTML5VaidationPattern = "^(\\+33\\s\\d\\s\\d{2}|0\\d\\s\\d{2}|\\+59\\d\\s\\d{3})(\\s\\d{2}){3}$";
  return (
    <div className={`AgenceEdit ${className}`}>
      <Loader loaded={agenceSaveLoaded}>
        {errorSave ? <Alert type={AlertTypeEnum.error}>{errorSave}</Alert> : null}
        <Form onSubmit={onSubmit} data-testid="agence-edit-form">
          <div className="required">Champ obligatoire</div>
          <fieldset className="af-form-grid">
            <FormItem
              type="text"
              label="Intitulé agence"
              name="title"
              id="id-agencetitle"
              requiredMessage="L'intitulé de l'agence est obligatoire"
              defaultValue={title}
              required
              autoFocus
            />
            <FormItem type="text" label="Nom collaborateur" name="name" id="id-agencename" defaultValue={name} />

            <FormItem
              name="phone"
              label="Téléphone"
              type="text"
              id="id-phone"
              defaultValue={phone}
              mask={phoneMask}
              dispatch={phoneDispatchFunction}
              pattern={phoneHTML5VaidationPattern}
              required={true}
              requiredMessage="Le numéro de téléphone est obligatoire"
              patternMessage={`Le numéro de téléphone doit être au format "06 12 34 56 78" ou "+596 612 34 56 78"`}
              validationInformation="Pour les DOM commencez par 59 ou +59"
            />
            <FormItem
              name="email"
              type="email"
              label="Adresse mail"
              required={emailRequired}
              id="id-mail"
              maxLength={255}
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
              patternMessage="L'adresse mail doit être au format prenom.nom@axa.fr"
              requiredMessage="L'adresse mail obligatoire"
              defaultValue={email}
            />
            <FormItem
              name="useEmailFlag"
              id="id-use-email-flag"
              type="checkbox"
              label=" "
              inputLabel={
                <>
                  Afficher cette adresse mail dans les courriers
                  <br />
                  <i>(au lieu de l'adresse mail liée à mon matricule).</i>
                </>
              }
              defaultValue={true}
              checked={emailRequired}
              onChange={(e) => {
                setEmailRequired(e.target.checked);
                e.target.form.email.triggerValidation();
              }}
            />
            <FormItem
              type="text"
              label="Fax"
              name="fax"
              id="id-fax"
              defaultValue={fax}
              mask={phoneMask}
              dispatch={phoneDispatchFunction}
              pattern={phoneHTML5VaidationPattern}
              patternMessage={`Le numéro de fax doit être au format "01 23 45 67 89" ou "+596 612 34 56 78"`}
            />
            <FormItem
              type="text"
              label="Adresse ligne 1"
              name="address.addressLine1"
              id="id-address-address-line-1"
              defaultValue={address.addressLine1}
              requiredMessage="La ligne 1 de l'adresse est obligatoire"
              required
            />
            <FormItem
              type="text"
              label="Adresse ligne 2"
              name="address.addressLine2"
              id="id-address-address-line-2"
              defaultValue={address.addressLine2}
            />
            <FormItem
              type="text"
              label="Adresse ligne 3"
              name="address.addressLine3"
              id="id-address-address-line-3"
              defaultValue={address.addressLine3}
            />
            <FormItem
              type="text"
              label="Adresse ligne 4"
              name="address.addressLine4"
              id="id-address-address-line-4"
              defaultValue={address.addressLine4}
            />
            <FormItem type="text" label="N° Orias" name="numOrias" id="id-numOrias" defaultValue={numOrias} />
            <FormItemGroup className="label-required" associatedFormItem="id-address-postal-code" label="Code postal">
              <FormItem
                type="text"
                name="address.postalCode"
                id="id-address-postal-code"
                defaultValue={address.postalCode}
                required
                mask="00000"
                pattern="^\d{5}$"
                patternMessage="Le code postal doit être composé de 5 chiffres"
                requiredMessage="Le code postal est obligatoire"
              />
              <FormItem
                type="text"
                label="Ville"
                name="address.city"
                id="id-address-city"
                defaultValue={address.city}
                required
                requiredMessage="La ville est obligatoire"
              />
            </FormItemGroup>
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
      </Loader>
    </div>
  );
};

export default AgenceEdit; import { FC, useContext, useEffect, useState } from "react";
import { AgencesContext, AgencesContextType } from "@/context/AgencesProvider";
import useModal from "@/toolkit/Components/Modal/useModal";
import AgenceType from "@/types/Agence.type";
import { slugify } from "@/Utils/StringUtils";
import "./Agence.scss";
import AgenceEdit from "./AgenceEdit";
import FormItem from "@/toolkit/Components/Form/FormItem";

interface Props {
  className?: string;
  agence: AgenceType;
  onSelect?: (agence: AgenceType) => void;
  selected?: boolean;
}

const Agence: FC<Props> = ({ agence: agenceProp, className = "", onSelect = () => {}, selected = false }) => {
  const context = useContext<AgencesContextType>(AgencesContext);

  const { deleteAgence } = context;

  const { createModal, deleteConfirmModal } = useModal();

  const [agence, setAgence] = useState<AgenceType>(agenceProp);
  const { id, name, title, address, phone, fax, email, useEmailFlag, numOrias } = agence;

  const openAgenceEdit = async () => {
    try {
      const result = await createModal((resolve, reject) => <AgenceEdit agence={agence} onCancel={reject} onSave={resolve} />, {
        title: "Modification coordonnées agence",
        className: "modal-agence-edit",
      });
      setAgence(result as AgenceType);
    } catch (e) {
      console.info("Agence modification canceled, reason:", e);
    }
  };

  const onInputChange = (e: any) => {
    onSelect(agence);
  };

  const onDeleteAgenceClick = async () => {
    try {
      await deleteConfirmModal(
        <>
          Voulez-vous vraiment supprimer l'agence <strong>{agence.title} ?</strong>
        </>,
        async () => {
          await deleteAgence(id);
        },
        {
          title: "Suppression agence",
          confirmButtonText: "Supprimer",
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setAgence(agenceProp);
  }, [agenceProp]);

  useEffect(() => {
    if (selected) {
      onSelect(agence);
    }
  }, [selected, onSelect, agence]);

  const onInit = (_input: HTMLFormElement) => {
    if (selected) {
      onSelect(agence);
    }
  };

  const htmlId = `id-agence-${id}-${slugify(title || "")}`;

  return (
    <div className={`Agence ${className}`}>
      <FormItem
        type="radio"
        id={htmlId}
        data-testid={`agence-${htmlId}`}
        name="agence"
        value={id}
        title="Agence"
        onChange={onInputChange}
        checked={selected}
        onInit={onInit}
      />
      <label htmlFor={htmlId} className="af-panel">
        <div className="agence__top">
          <div className="agence__title">
            <h4>{title}</h4>
            <p className="name field">
              <strong>{name}</strong>
            </p>
          </div>
          <div className="Agence__actions">
            <button
              id="id-agence-delete"
              data-testid={`id-agence-delete-${htmlId}`}
              type="button"
              className="btn btn--link btn--link--danger icon icon-trash color-red"
              onClick={onDeleteAgenceClick}
            >
              <span>Supprimer</span>
            </button>
            <button
              id="id-agence-modify"
              data-testid="id-agence-modify"
              type="button"
              className="btn btn--link icon icon-pencil"
              onClick={openAgenceEdit}
            >
              Modifier
            </button>
          </div>
        </div>

        {!!phone && (
          <p className="phone field">
            <strong>Tél : </strong> {phone}
          </p>
        )}
        {!!email && (
          <p className="email field">
            <strong>Email : </strong> {email}
            {useEmailFlag && (
              <>
                <br />
                <i> (Cette adresse mail sera utilisée dans vos courriers)</i>
              </>
            )}
          </p>
        )}
        {fax && (
          <p className="fax field">
            <strong>Fax : </strong> {fax}
          </p>
        )}
        <address>
          <div>{address.addressLine1}</div>
          {address.addressLine2 ? <div>{address.addressLine2}</div> : null}
          {address.addressLine3 ? <div>{address.addressLine3}</div> : null}
          {address.addressLine4 ? <div>{address.addressLine4}</div> : null}
          <div>
            {address.postalCode} {address.city}
          </div>
        </address>

        {numOrias && (
          <p className="mt-sm numOrias field">
            <strong>N° Orias : </strong> {numOrias}
          </p>
        )}
      </label>
    </div>
  );
};

export default Agence;  je tai montrer coment est deja faite le test sur au compsent et maintenat je veux que tu fait le test sur ce compsent :import { FC, useEffect, useState } from "react";
import Form from "@/toolkit/Components/Form/Form";
import FormItem from "@/toolkit/Components/Form/FormItem";
import Button from "@/toolkit/Components/Form/Button";
import Loader from "@/toolkit/Components/Loader";
import Profiles from "@/Admin/profiles";
import { FormState, HabilitationForm, HabilitationProps } from "@/Admin/types/Habilitation.type";
import "../habilitation.scss";
import { extractAuthorities, extractNameParts, formatName } from "@/Admin/utils/utils";
import { FORM_VALIDATION, INITIAL_FORM_STATE_HABILITATION } from "@/Admin/constants";

export const HabilitationWithForm: FC<HabilitationProps> = ({ className = "", onSave, loaded, initialData = {} }) => {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE_HABILITATION);
  useEffect(() => {
    const authorities = extractAuthorities(initialData.authorities);
    const { firstName, lastName } = extractNameParts(initialData.name);
    setFormState((prev) => ({
      ...prev,
      firstName: firstName || prev.firstName,
      lastName: lastName || prev.lastName,
      email: initialData.email || prev.email,
      userNumber: initialData.userNumber || prev.userNumber,
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
      const submitData: HabilitationForm = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        name: formatName(formState.firstName, formState.lastName),
        email: formState.email,
        userNumber: formState.userNumber,
        authorities: [formState.authorities],
      };
      await onSave(submitData);
      setFormState(INITIAL_FORM_STATE_HABILITATION);
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
            requiredMessage={FORM_VALIDATION.requiredMessages.firstName}
            required
            value={formState.firstName}
            onChange={handleChange}
          />
          <FormItem
            type="text"
            label="Nom"
            name="lastName"
            id="id-lastName"
            requiredMessage={FORM_VALIDATION.requiredMessages.lastName}
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
            pattern={FORM_VALIDATION.emailPattern}
            patternMessage={FORM_VALIDATION.emailPatternMessage}
            requiredMessage={FORM_VALIDATION.requiredMessages.email}
            value={formState.email}
            onChange={handleChange}
          />
          <FormItem
            type="text"
            label="Matricule"
            name="userNumber"
            id="id-userNumber"
            requiredMessage={FORM_VALIDATION.requiredMessages.userNumber}
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


