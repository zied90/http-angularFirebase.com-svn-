import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "ts-debounce";
import Form from "@/toolkit/Components/Form/Form";
import Filtres from "./tags";
import ModeleImport from "./importModele";
import Button from "@/toolkit/Components/Form/Button";
import "./AjoutModele.scss";
import { useDelayApi } from "@/hooks/useApi";
import { adminTemplateAddRoute } from "@/Api/ApiRoutes";
import TypesDocuments from "@/pages/Generer/TypesDocuments";
import Branches from "@/pages/Generer/Branches";
import Workspaces from "../workspace";
import Types from "../type";
import { FORM_CONSTANTS, INITIAL_FORM_STATE } from "../constants";
import { useFormValidation } from "../hooks/useFormValidation";
import Loader from "@/toolkit/Components/Loader";

export const AjoutModele: React.FC = () => {
  const [formState, setFormState] = useState({
    formRef: null as HTMLFormElement | null,
    fileValue: null as File | null,
    formData: INITIAL_FORM_STATE,
    isSubmitting: false,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { loaded,call: uploadPost } = useDelayApi(adminTemplateAddRoute);
  const tags = searchParams.get("tags");

  const isFormValid = useFormValidation(formState.formData, formState.fileValue);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || formState.isSubmitting) {
      return;
    }
    try {
      setFormState((prev) => ({ ...prev, isSubmitting: true }));
      await uploadPost({
        formData: formState.formData,
      });
      setFormState((prev) => ({
        ...prev,
        formData: INITIAL_FORM_STATE,
        fileValue: null,
        isSubmitting: false,
      }));
      formState.formRef?.reset();
      navigate(location.pathname, { replace: true });
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === FORM_CONSTANTS.ACCEPTED_FILE_TYPE) {
      setFormState((prev) => ({
        ...prev,
        fileValue: file,
        formData: { ...prev.formData, file },
      }));
    }
  }, []);
  const updateFormDatas = useCallback(
    (ref?: any) => {
      const fixedRef = ref?.target?.form || ref;
      if (formState.formRef || fixedRef) {
        const formDatasObject = Object.fromEntries(new FormData(formState.formRef || fixedRef).entries());
        setFormState((prev) => ({
          ...prev,
          formData: { ...prev.formData, ...formDatasObject },
        }));
      }
    },
    [formState.formRef]
  );
  const onRef = useCallback(
    (ref: HTMLFormElement) => {
      setFormState((prev) => ({ ...prev, formRef: ref }));
      // Observer pour mise à jour initiale
      const observer = new MutationObserver(
        debounce((mutations: MutationRecord[], observer: MutationObserver) => {
          updateFormDatas(ref);
        }, FORM_CONSTANTS.DEBOUNCE_DELAY)
      );
      setTimeout(() => {
        observer.disconnect();
      }, FORM_CONSTANTS.OBSERVER_TIMEOUT);
      observer.observe(ref, { childList: true, subtree: true });
    },
    [updateFormDatas]
  );

  useEffect(() => {
    if (tags) {
      setFormState((prev) => ({
        ...prev,
        formData: { ...prev.formData, tags },
      }));
    }
  }, [tags]);
  return (
    <>
      <h2 className="title">Ajouter un modèle</h2>
      <Loader loaded={loaded}>
      <Form
        onSubmit={handleSubmit}
        onChange={updateFormDatas}
        onInit={updateFormDatas}
        onRef={onRef}
        className="template-form"
        data-testid="form-id"
        aria-label="Formulaire d'ajout de modèle"
      >
        <div className="template-form__container">
          <div className="template-form__sidebar">
            <Filtres className="filters-section" />
          </div>
          <div className="template-form__main-content">
            <div className="template-form__group">
              <TypesDocuments className="form-field" data-testid="types-documents" />
            </div>
            <div className="template-form__group">
              <Branches className="form-field" data-testid="branches" />
            </div>
            <div className="template-form__group">
              <Workspaces className="form-field" data-testid="workspaces" />
            </div>
            <div className="template-form__group">
              <Types className="form-field" data-testid="types" />
            </div>
            <div className="template-form__group template-form__group--with-label">
              <label className="template-form__label template-form__label--required" htmlFor="modele-import">
                Modèle
              </label>
              <ModeleImport onChange={handleFileChange} file={formState.fileValue} data-testid="modele-import" />
            </div>
            <div className="template-form__actions">
              <Button classModifier="primary" type="submit" disabled={!isFormValid || formState.isSubmitting} data-testid="submit-button">
                {formState.isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
      </Loader>
    </>
  );
};
export default AjoutModele;  donne moi le test AjoutModele et je vais te donner des exemple de test qui marche   import CourriersBlock from "./CourriersBlock";
import { vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/components/TableCourriers", () => ({
  default: ({ courriers }: any) => (
    <div>
      {courriers.map((x: any) => (
        <div key={x.id}>{x.name || x.title}</div>
      ))}
    </div>
  ),
}));
vi.mock("@/config/fakeContent", () => ({
  getFakeCourriers: () => [],
}));
vi.mock("@/config/Routes", () => ({
  getNavigationItemById: () => ({
    path: "/test",
  }),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children }: any) => <div>{children}</div>,
}));
vi.mock("@/toolkit/Components/Loader", () => ({
  default: ({ children }: any) => <div>{children}</div>,
}));
vi.mock("@/toolkit/Components/Pagination", () => <div>Pagination</div>);

describe("CourriersBlock", () => {
  test("should render", () => {
    render(<CourriersBlock courriers={[]} documentsType="courrier" />);
    expect(screen.getByText("Aucun courrier trouvé")).toBeTruthy();
  });

  test("should render with documents", () => {
    render(
      <CourriersBlock
        courriers={[
          {
            id: "1",
            createDate: "2018-12-21T12:00:00.000Z",
            modifyDate: "2018-12-21T12:00:00.000Z",
            name: "",
            title: "Titre du courrier",
            bookmarked: false,
            webUrl: "",
            tags: [
              { id: "1234", name: "Attestation" },
              { id: "1235", name: "Entreprise" },
            ],
          },
        ]}
        documentsType="courrier"
      />
    );
    expect(screen.getByText("Titre du courrier")).toBeTruthy();
  });

  test("Show custom title with navigation button", () => {
    render(
      <CourriersBlock
        courriers={[]}
        documentsType="courrier"
        title="Custom title"
        courrierNavigationItemId="nagiationItemid"
        buttonLabel="Custom button"
      />
    );

    expect(screen.getByText("Custom title")).toBeTruthy();
    expect(screen.getByText("Custom button")).toBeTruthy();
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, describe, test, expect, beforeEach } from "vitest";
import { HabilitationWithForm } from "./";
import { INITIAL_FORM_STATE_HABILITATION } from "@/Admin/constants";
vi.mock("@/toolkit/Components/Form/Form", () => ({
  default: ({ children, onSubmit }: any) => (
    <form data-testid="form" onSubmit={onSubmit}>
      {children}
    </form>
  ),
}));
vi.mock("@/toolkit/Components/Form/FormItem", () => ({
  default: ({ label, value, onChange, type, name, id, required }: any) => (
    <div>
      <label htmlFor={id}>
        {label}
        {required && "*"}
      </label>
      <input type={type} name={name} id={id} value={value || ""} onChange={onChange} required={required} data-testid={id} />
    </div>
  ),
}));
vi.mock("@/toolkit/Components/Form/Button", () => ({
  default: ({ children, onClick, disabled, type, id }: any) => (
    <button onClick={onClick} disabled={disabled} type={type} data-testid={id}>
      {children}
    </button>
  ),
}));
vi.mock("@/Admin/profiles", () => ({
  default: () => <div data-testid="profiles">Profile Mock</div>,
}));
vi.mock("@/toolkit/Components/Loader", () => ({
  default: ({ children, loaded }: any) => <div data-testid="loader">{loaded ? children : "Loading..."}</div>,
}));
describe("HabilitationWithForm", () => {
  const mockOnSave = vi.fn();
  const defaultProps = {
    onSave: mockOnSave,
    loaded: true,
    className: "",
    initialData: {},
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with correct initial state", () => {
    render(<HabilitationWithForm {...defaultProps} />);
    // Vérifie que les champs contiennent les valeurs initiales
    expect(screen.getByTestId("id-firstName")).toHaveValue(INITIAL_FORM_STATE_HABILITATION.firstName);
    expect(screen.getByTestId("id-lastName")).toHaveValue(INITIAL_FORM_STATE_HABILITATION.lastName);
    expect(screen.getByTestId("id-mail")).toHaveValue(INITIAL_FORM_STATE_HABILITATION.email);
    expect(screen.getByTestId("id-userNumber")).toHaveValue(INITIAL_FORM_STATE_HABILITATION.userNumber);
  });
  test("handles form submission", () => {
    render(<HabilitationWithForm {...defaultProps} />);
    // Renseigne des valeurs dans le formulaire
    fireEvent.change(screen.getByTestId("id-firstName"), {
      target: { value: "Jean" },
    });
    fireEvent.change(screen.getByTestId("id-lastName"), {
      target: { value: "Dupont" },
    });
    fireEvent.change(screen.getByTestId("id-mail"), {
      target: { value: "jean.dupont@example.com" },
    });
    fireEvent.change(screen.getByTestId("id-userNumber"), {
      target: { value: "12345" },
    });
    const form = screen.getByTestId("form");
    fireEvent.submit(form);
    expect(mockOnSave).toHaveBeenCalledWith({
      firstName: "Jean",
      lastName: "Dupont",
      name: "JEAN DUPONT",
      email: "jean.dupont@example.com",
      userNumber: "12345",
      authorities: [""],
    });
  });
  test("shows loader when not loaded", () => {
    render(<HabilitationWithForm {...defaultProps} loaded={false} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});

