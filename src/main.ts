erre1 :Property 'useDelayApi' does not exist on type 'Promise<MockedObjectDeep<ESModuleExports>>'
errer 2

rgument of type 'File' is not assignable to parameter of type 'string | number | string[] | null | undefined'.
  Type 'File' is missing the following properties from type 'string[]': length, pop, push, concat, and 34 more.ts(2345)
const file: 




import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import AjoutModele from './';
import { INITIAL_FORM_STATE } from '../constants';

vi.mock("@/toolkit/Components/Form/Form", () => ({
 default: ({ children, onSubmit, onChange, onRef, onInit }: any) => (
<form onSubmit={onSubmit} onChange={onChange} ref={onRef}>
     {children}
</form>
 ),
}));
vi.mock("@/toolkit/Components/Form/Button", () => ({
 default: ({ children, onClick, disabled, type, id }: any) => (
<button onClick={onClick} disabled={disabled} type={type} data-testid={id}>
     {children}
</button>
 ),
}));
vi.mock("@/hooks/useApi", () => ({
 useDelayApi: vi.fn().mockReturnValue({
   loaded: true,
   call: vi.fn().mockResolvedValue(true),
 }),
}));
describe('AjoutModele', () => {
 beforeEach(() => {
   vi.clearAllMocks();
 });
 test('should render the form correctly', () => {
   render(
<MemoryRouter>
<AjoutModele />
</MemoryRouter>
   );
   expect(screen.getByTestId('form-id')).toBeInTheDocument();
   expect(screen.getByTestId('types-documents')).toBeInTheDocument();
   expect(screen.getByTestId('branches')).toBeInTheDocument();
   expect(screen.getByTestId('workspaces')).toBeInTheDocument();
   expect(screen.getByTestId('types')).toBeInTheDocument();
   expect(screen.getByTestId('modele-import')).toBeInTheDocument();
   expect(screen.getByTestId('submit-button')).toBeInTheDocument();
 });
 test('should update form state on file change', () => {
   render(
<MemoryRouter>
<AjoutModele />
</MemoryRouter>
   );
   const fileInput = screen.getByTestId('modele-import');
   const file = new File([''], 'example.pdf', { type: 'application/pdf' });
   fireEvent.change(fileInput, { target: { files: [file] } });
   expect(screen.getByTestId('modele-import')).toHaveValue(file);
 });
 test('should submit the form successfully', async () => {
   const { useDelayApi } = vi.importMock("@/hooks/useApi");
   const mockUploadPost = useDelayApi.mock.results[0].value.call;
   render(
<MemoryRouter>
<AjoutModele />
</MemoryRouter>
   );
   const form = screen.getByTestId('form-id');
   fireEvent.submit(form);
   await waitFor(() => {
     expect(mockUploadPost).toHaveBeenCalledWith({
       formData: INITIAL_FORM_STATE,
     });
   });
 });
});  et voci un exemple de test unitaire qui marche import { render, screen, fireEvent } from "@testing-library/react";
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
