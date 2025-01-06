import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AjoutModele } from '.';
import { MemoryRouter } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
const mockApiCall = vi.fn().mockResolvedValue({});
vi.mock('./tags', () => ({
 default: () => <div data-testid="filters">Filters Mock</div>
}));
vi.mock('@/pages/Generer/Branches', () => ({
 default: () => (
<select data-testid="id-courrier-branche">
<option value="test-branch">Test Branch</option>
</select>
 )
}));
vi.mock('@/pages/Generer/TypesDocuments', () => ({
 default: () => (
<select data-testid="type-select">
<option value="test-type">Test Type</option>
</select>
 )
}));
vi.mock('./importModele', () => ({
 default: () => <input type="file" data-testid="file-input" />
}));
vi.mock('@/hooks/useApi', () => ({
 useDelayApi: () => ({
   call: mockApiCall
 })
}));
vi.mock('react-router-dom', async () => {
 const actual = await vi.importActual('react-router-dom');
 return {
   ...actual,
   useSearchParams: () => [new URLSearchParams({ tags: 'test-tag' })],
   useNavigate: () => vi.fn(),
   useLocation: () => ({ pathname: '/test' }),
 };
});
const mockFile = new File(['test'], 'test.docx', {
 type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
});
describe('AjoutModele', () => {
 beforeEach(() => {
   vi.clearAllMocks();
 });
 afterEach(cleanup);
 it('renders component title', () => {
    render(
        <MemoryRouter>
        <AjoutModele />
        </MemoryRouter>
           );
    expect(screen.getByText('Ajouter un modèle')).toBeInTheDocument();
  });
  it('submit button is initially disabled', () => {
    render(
        <MemoryRouter>
        <AjoutModele />
        </MemoryRouter>
           );
    const submitButton = screen.getByRole('button', { name: /enregistrer/i });
    expect(submitButton).toBeDisabled();
  });
 it('handles form submission with all fields', async () => {
   render(
<MemoryRouter>
<AjoutModele />
</MemoryRouter>
   );
   const fileInput = screen.getByTestId('file-input');
   Object.defineProperty(fileInput, 'files', { value: [mockFile] });
   fireEvent.change(fileInput);
   fireEvent.change(screen.getByTestId('id-courrier-branche'), {
     target: { value: '' }
   });
   fireEvent.change(screen.getByTestId('type-select'), {
     target: { value: '' }
   });
   const form = screen.getByTestId('form-id');
   await fireEvent.submit(form);
   expect(mockApiCall).toHaveBeenCalledWith({
     template: null,
     tags: 'test-tag',
     branche: '',
     ecmDocumentType: '',
   });
 });
});Warning: An update to AjoutModele inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    at AjoutModele (C:\dev\Front\Ellipse\src\Admin\ajoutModele\index.tsx:37:57)
    at Router (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1174:17)
    at MemoryRouter (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1069:7)
Warning: An update to AjoutModele inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
    at AjoutModele (C:\dev\Front\Ellipse\src\Admin\ajoutModele\index.tsx:37:57)
    at Router (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1174:17)
    at MemoryRouter (C:\dev\Front\Ellipse\node_modules\react-router\dist\umd\react-router.development.js:1069:7)

 ❯ src/Admin/ajoutModele/ajoutModele.spec.tsx (3)
   ❯ AjoutModele (3)
     × renders component title
     × submit button is initially disabled
     ✓ handles form submission with all fields

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
 FAIL  src/Admin/ajoutModele/ajoutModele.spec.tsx > AjoutModele > renders component title
Error: Invalid Chai property: toBeInTheDocument
 ❯ src/Admin/ajoutModele/ajoutModele.spec.tsx:55:29
     53|         </MemoryRouter>
     54|            );
     55|     expect(screen.getByText('Ajouter un modèle')).toBeInTheDocument();
       |                             ^
     56|   });
     57|   it('submit button is initially disabled', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/2]⎯
 FAIL  src/Admin/ajoutModele/ajoutModele.spec.tsx > AjoutModele > submit button is initially disabled
Error: Invalid Chai property: toBeDisabled
 ❯ src/Admin/ajoutModele/ajoutModele.spec.tsx:64:12
     62|            );
     63|     const submitButton = screen.getByRole('button', { name: /enregistrer/i });
     64|     expect(submitButton).toBeDisabled();
       |            ^
     65|   });
     66|  it('handles form submission with all fields', async () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/2]⎯
 Test Files  1 failed (1)
      Tests  2 failed | 1 passed (3)
   Start at  17:56:52
   Duration  12.07s (transform 1.00s, setup 0ms, collect 4.16s, tests 149ms, environment 5.48s, prepare 811ms)

PS C:\dev\Front\Ellipse> 
