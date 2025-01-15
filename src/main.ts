import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { vi, describe, test, expect, beforeEach } from 'vitest';
import { HabilitationWithForm } from "./";
import { INITIAL_FORM_STATE_HABILITATION } from "@/Admin/constants";
vi.mock("@/toolkit/Components/Form/Form", () => ({
 default: ({ children, onSubmit }: any) => (
<form data-testid="form" onSubmit={onSubmit}>{children}</form>
 ),
}));
vi.mock("@/toolkit/Components/Form/FormItem", () => ({
 default: ({ label, value, onChange, type, name, id, required }: any) => (
<div>
<label htmlFor={id}>{label}{required && "*"}</label>
<input
       type={type}
       name={name}
       id={id}
       value={value || ""}
       onChange={onChange}
       required={required}
       data-testid={id}
     />
</div>
 ),
}));
vi.mock("@/toolkit/Components/Form/Button", () => ({
 default: ({ children, onClick, disabled, type, id }: any) => (
<button
     onClick={onClick}
     disabled={disabled}
     type={type}
     data-testid={id}
>
     {children}
</button>
 ),
}));
vi.mock("@/Admin/profiles", () => ({
 default: () => <div data-testid="profiles">Profile Mock</div>,
}));
vi.mock("@/toolkit/Components/Loader", () => ({
 default: ({ children, loaded }: any) => (
<div data-testid="loader">
     {loaded ? children : "Loading..."}
</div>
 ),
}));
describe("HabilitationWithForm", () => {
 const mockOnSave = vi.fn();
 const defaultProps = {
   onSave: mockOnSave,
   loaded: true,
   className: "",
   initialData: {}
 };
 beforeEach(() => {
   vi.clearAllMocks();
 });
 test("renders basic form elements", () => {
   render(<HabilitationWithForm {...defaultProps} />);
   expect(screen.getByTestId("form")).toBeInTheDocument();
   expect(screen.getByTestId("profiles")).toBeInTheDocument();
   expect(screen.getByTestId("id-button-agence-save")).toBeInTheDocument();
 });
 test("initializes with correct initial state", () => {
   const mockSetState = vi.fn();
   const useStateSpy = vi.spyOn(React, 'useState').mockImplementation(() => [INITIAL_FORM_STATE_HABILITATION, mockSetState]);
   render(<HabilitationWithForm {...defaultProps} />);
   expect(useStateSpy).toHaveBeenCalledWith(INITIAL_FORM_STATE_HABILITATION);
 });
 test("handles form submission", async () => {
   const mockFormData = {
     firstName: "Jean",
     lastName: "Dupont",
     email: "jean.dupont@example.com",
     userNumber: "12345",
     authorities: ""
   };
   render(<HabilitationWithForm {...defaultProps} />);
   const form = screen.getByTestId("form");
   form.dispatchEvent(new Event('submit', { bubbles: true }));
   expect(mockOnSave).toHaveBeenCalled();
 });
 test("shows loader when not loaded", () => {
   render(<HabilitationWithForm {...defaultProps} loaded={false} />);
   expect(screen.getByText("Loading...")).toBeInTheDocument();
 });
}););
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    at HabilitationWithForm (C:\dev\Front\Ellipse\src\Admin\Habilitation\habilitationWithForm\index.tsx:21:33)

 ❯ src/Admin/Habilitation/habilitationWithForm/habilitationForm.spec.tsx (4)
   ❯ HabilitationWithForm (4)
     ✓ renders basic form elements
     × initializes with correct initial state
     ✓ handles form submission
     ✓ shows loader when not loaded

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
 FAIL  src/Admin/Habilitation/habilitationWithForm/habilitationForm.spec.tsx > HabilitationWithForm > initializes with correct initial state
AssertionError: expected "useState" to be called with arguments: [ { firstName: '', …(4) } ]

Received:



Number of calls: 0

 ❯ src/Admin/Habilitation/habilitationWithForm/habilitationForm.spec.tsx:73:24
     71|    const useStateSpy = vi.spyOn(React, 'useState').mockImplementation(() => [INITIAL_FORM_STATE_HABILITATION, mockSetState]);
     72|    render(<HabilitationWithForm {...defaultProps} />);
     73|    expect(useStateSpy).toHaveBeenCalledWith(INITIAL_FORM_STATE_HABILITATION);
       |                        ^
     74|  });
     75|  test("handles form submission", async () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
 Test Files  1 failed (1)
      Tests  1 failed | 3 passed (4)
   Start at  11:56:16
   Duration  14.16s (transform 1.48s, setup 1.88s, collect 3.07s, tests 83ms, environment 6.19s, prepare 1.61s)

 FAIL  Tests failed. Watching for file changes...
       press h to show help, press q to quit
