Avoid using multiple assertions within `waitFor` callbackeslinttesting-library/no-wait-for-multiple-assertions
(method) matchers.TestingLibraryMatchers<any, void>.toBeInTheDocument(): void
@description — Assert whether an element is present in the document or not.

@example

<svg data-testid="svg-element"></svg>

expect(queryByTestId('svg-element')).toBeInTheDocument()
expect(queryByTestId('does-not-exist')).not.toBeInTheDocument()
@see — testing-library/jest-dom#tobeinthedocument


Avoid using multiple assertions within `waitFor` callbackeslinttesting-library/no-wait-for-multiple-assertions
(method) getByLabelText<HTMLElement>(id: Matcher, options?: SelectorMatcherOptions | undefined): HTMLElement (+1 overload)



import { describe, it, expect } from 'vitest';
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
   // Simuler la saisie utilisateur
   await user.type(screen.getByLabelText(/Prénom/i), 'Jean');
   await user.type(screen.getByLabelText(/Nom/i), 'Dupont');
   await user.type(screen.getByLabelText(/Adresse mail/i), 'jean.dupont@axa.fr');
   await user.type(screen.getByLabelText(/Matricule/i), '12345');
   // Simuler la soumission du formulaire
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   // Vérifier que onSave a été appelé avec les bonnes données
   expect(defaultProps.onSave).toHaveBeenCalledWith({
     firstName: 'Jean',
     lastName: 'Dupont',
     name: 'JEAN DUPONT',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: [''], // Valeur par défaut si aucun profil n'est sélectionné
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
 it('displays validation messages for required fields', async () => {
   const user = userEvent.setup();
   render(<HabilitationWithForm {...defaultProps} />);
   await user.click(screen.getByRole('button', { name: /Enregistrer/i }));
   await waitFor(() => {
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.email)).toBeInTheDocument();
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.userNumber)).toBeInTheDocument();
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.firstName)).toBeInTheDocument();
     expect(screen.getByText(FORM_VALIDATION.requiredMessages.lastName)).toBeInTheDocument();
   });
 });
 it('disables submit button when loaded is false', () => {
   render(<HabilitationWithForm {...defaultProps} loaded={false} />);
   expect(screen.getByRole('button', { name: /Enregistrer/i })).toBeDisabled();
 });
 it('initializes form with provided data', async () => {
   const initialData = {
     name: 'DUPONT JEAN',
     email: 'jean.dupont@axa.fr',
     userNumber: '12345',
     authorities: ['ADMIN']
   };
   render(<HabilitationWithForm {...defaultProps} initialData={initialData} />);
   await waitFor(() => {
     expect(screen.getByLabelText(/Prénom/i)).toHaveValue('JEAN');
     expect(screen.getByLabelText(/Nom/i)).toHaveValue('DUPONT');
     expect(screen.getByLabelText(/Adresse mail/i)).toHaveValue('jean.dupont@axa.fr');
     expect(screen.getByLabelText(/Matricule/i)).toHaveValue('12345');
   });
 });
});
