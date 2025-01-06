import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
});
