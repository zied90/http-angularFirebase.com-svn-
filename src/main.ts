voci un test qui marche d'un autre fichier import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Agences from "./index";
import userEvent from "@testing-library/user-event";

vi.mock("config/fakeContent", () => ({
  default: () => {},
  getFakeAgences: () => [],
}));

vi.mock("context/AgencesProvider", () => ({
  AgencesContext: Symbol("AgencesContext"),
  AgencesContextType: Symbol("AgencesContextType"),
}));

vi.mock("toolkit/Components/Loader", () => ({
  default: ({ children, loaded }: { children: React.ReactNode; loaded: boolean }) => (
    <div data-testid="loader">{loaded ? children : "Chargement..."}</div>
  ),
}));

let mockCreateModal = vi.fn();
const onAgenceSelected = vi.fn();
let agences = [
  {
    id: "1",
    modifyDate: "",
    title: "",
    name: "",
    address: {
      addressLine1: "",
      postalCode: "",
      city: "",
    },
    phone: "",
    fax: "",
  },
];
const loadAgencesSpy = vi.fn();

// Mock React
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    useContext: vi.fn(() => ({
      deleteAgence: () => {},
      agences: agences,
      setAgences: () => {},
      saveAgence: () => {},
      loadAgences: loadAgencesSpy,
      clearError: () => {},
      loaded: true,
      deleteLoaded: true,
      agenceSaveLoaded: true,
      error: "",
    })),
    useEffect: vi.fn((cb) => cb()),
  };
});

// Mock AgencesList
vi.mock("./AgencesList", () => ({
  default: ({ onAgenceSelected, agences }: { onAgenceSelected?: (agence: any) => void; agences: any[] }) => (
    <div data-testid="agences-list" onClick={() => onAgenceSelected?.({ id: "1" })}>
      {agences.length > 0 ? "Liste des agences" : "Aucune agence"}
    </div>
  ),
}));

// Mock Modal
vi.mock("@/toolkit/Components/Modal/useModal", () => ({
  __esModule: true,
  default: () => ({
    createModal: (...args: any[]) => mockCreateModal(...args),
  }),
}));

describe("Agences", () => {
  beforeEach(() => {
    mockCreateModal = vi.fn();
    onAgenceSelected.mockReset();
    loadAgencesSpy.mockReset();
  });

  test("Agences component renders properly", () => {
    render(<Agences />);
    expect(screen.getByText("Coordonnées agence")).toBeInTheDocument();
    expect(loadAgencesSpy).toHaveBeenCalled();
  });

  test("Agence clicked it call onAgenceSelected", async () => {
    render(<Agences onAgenceSelected={onAgenceSelected} />);
    const agencesList = screen.getByTestId("agences-list");
    await userEvent.click(agencesList);
    expect(onAgenceSelected).toHaveBeenCalledWith({ id: "1" });
  });

  test("Button 'Ajouter une nouvelle adresse' clicked it call createModal", async () => {
    agences = [
      {
        id: "1",
        address: {
          addressLine1: "123 Main St",
          postalCode: "12345",
          city: "Sample City",
        },
      },
    ] as any;
    await render(<Agences />);
    const button = screen.getByTestId("ajouter-adresse");
    await userEvent.click(button);
    expect(mockCreateModal).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        title: "Ajouter une agence",
        className: "modal-agence-edit",
      })
    );
  });

  test("User cancel the creation the modal", async () => {
    const error = new Error("User cancel the creation");
    mockCreateModal.mockImplementation(() => {
      console.info("Modal closed, reason:", error);
      throw error;
    });

    vi.spyOn(console, "info").mockImplementation(() => {});
    agences = [
      {
        id: "1",
        address: {
          addressLine1: "123 Main St",
          postalCode: "12345",
          city: "Sample City",
        },
      },
    ] as any;
    render(<Agences />);

    const button = screen.getByText("Ajouter une nouvelle adresse");
    await userEvent.click(button);
    expect(mockCreateModal).toThrowError("User cancel the creation");
    expect(console.info).toHaveBeenCalledWith("Modal closed, reason:", error);
  });

  test("Agences component not render when there is no agences", () => {
    agences = [];
    render(<Agences onAgenceSelected={onAgenceSelected} />);
    expect(screen.queryByText("Ajouter une nouvelle adresse")).not.toBeInTheDocument();
  });
});
 et le code  de test que tu ma donner  pour teste est ca import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabilitationWithForm } from './';
import { FORM_VALIDATION } from '@/Admin/constants';
describe('HabilitationWithForm', () => {
 const defaultProps = {
   onSave: vi.fn(),
   loaded: true,
   className: '',
 };
 it('handles form submission with correct data', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   await user.type(screen.getByLabelText(/Prénom/i), 'Jean');
   await user.type(screen.getByLabelText(/Nom/i), 'Dupont');
   await user.type(screen.getByLabelText(/Adresse mail/i), 'jean.dupont@axa.fr');
   await user.type(screen.getByLabelText(/Matricule/i), '12345');
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   expect(defaultProps.onSave).toHaveBeenCalledWith({
     firstName: 'Jean',
     lastName: 'Dupont',
     name: 'JEAN DUPONT',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: [''],
   });
 });
 it('validates email format', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   const emailInput = screen.getByLabelText(/Adresse mail/i);
   await user.type(emailInput, 'invalid-email1');
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   await waitFor(() => {
     expect(screen.getByText(FORM_VALIDATION.emailPatternMessage)).toBeInTheDocument();
   });
 });
 it('displays email validation message for required fields', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   await waitFor(() => {
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.email)).toBeInTheDocument();
   });
 });
 it('displays userNumber validation message for required fields', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   await waitFor(() => {
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.userNumber)).toBeInTheDocument();
   });
 });
 it('displays firstName validation message for required fields', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   await waitFor(() => {
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.firstName)).toBeInTheDocument();
   });
 });
 it('displays lastName validation message for required fields', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   await waitFor(() => {
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.lastName)).toBeInTheDocument();
   });
 });
 it('disables submit button when loaded is false', () => {
   render(<HabilitationWithForm {...defaultProps} loaded={false} />);
   expect(screen.getByRole('button', { name: /Enregistrer/i })).toBeDisabled();
 });
 it('initializes firstName with provided data', async () => {
   const initialData = {
     name: 'DUPONT JEAN',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: ['ADMIN']
   };
   render(<HabilitationWithForm {...defaultProps} initialData={initialData} />);
   await waitFor(() => {
     expect(screen.getByLabelText(/Prénom/i)).toHaveValue('JEAN');
   });
 });
 it('initializes lastName with provided data', async () => {
   const initialData = {
     name: 'DUPONT JEAN',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: ['ADMIN']
   };
   render(<HabilitationWithForm {...defaultProps} initialData={initialData} />);
   await waitFor(() => {
     expect(screen.getByLabelText(/Nom/i)).toHaveValue('DUPONT');
   });
 });
 it('initializes email with provided data', async () => {
   const initialData = {
     name: 'DUPONT JEAN',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: ['ADMIN']
   };
   render(<HabilitationWithForm {...defaultProps} initialData={initialData} />);
   await waitFor(() => {
     expect(screen.getByLabelText(/Adresse mail/i)).toHaveValue('jean.dupont@axa.fr');
   });
 });
 it('initializes userNumber with provided data', async () => {
   const initialData = {
     name: 'DUPONT JEAN',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: ['ADMIN']
   };
   render(<HabilitationWithForm {...defaultProps} initialData={initialData} />);
   await waitFor(() => {
     expect(screen.getByLabelText(/Matricule/i)).toHaveValue('12345');
   });
 });
}); et qui rest blocker avec le . avant le test cest comme si est bloquer car quand jai ajouter  un test basique  et jai crrer un nouveau fichier de test il la traitrter 
