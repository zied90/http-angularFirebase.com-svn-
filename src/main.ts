import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AjoutModele } from '.';
import { MemoryRouter } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
const mockApiCall = vi.fn().mockResolvedValue({});
// Mock FiltersPanel component
vi.mock('./tags', () => ({
 default: () => <div data-testid="filters">Filters Mock</div>
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
 const renderComponent = () => {
   return render(
<MemoryRouter>
<AjoutModele />
</MemoryRouter>
   );
 };
 it('handles form submission with all fields', async () => {
   renderComponent();
   const fileInput = screen.getByTestId('file-input');
   Object.defineProperty(fileInput, 'files', { value: [mockFile] });
   fireEvent.change(fileInput);
   fireEvent.change(screen.getByTestId('id-courrier-branche'), {
     target: { value: 'test-branch' }
   });
   fireEvent.change(screen.getByTestId('type-select'), {
     target: { value: 'test-type' }
   });
   const form = screen.getByRole('form');
   await fireEvent.submit(form);
   expect(mockApiCall).toHaveBeenCalledWith({
     template: mockFile,
     tags: 'test-tag',
     branche: 'test-branch',
     ecmDocumentType: 'test-type',
   });
 });
}); FAIL  src/Admin/ajoutModele/ajoutModele.spec.tsx > AjoutModele > handles form submission with all fields
TestingLibraryElementError: Unable to find an element by: [data-testid="id-courrier-branche"]

Ignored nodes: comments, script, style
