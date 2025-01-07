
 DEV  v2.1.2 C:/dev/Front/consolepfel-refonte-front

stderr | src/pages/esign-demat/perimetreMetier/perimetreList.test.tsx > PerimetreMetierList > should show error alert if fetching data fails
Error: API Error
    at C:\dev\Front\consolepfel-refonte-front\src\pages\esign-demat\perimetreMetier\perimetreList.test.tsx:79:7
    at file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:146:14
    at file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:533:11
    at runWithTimeout (file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:61:7)
    at runTest (file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:986:17)
    at runSuite (file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:1142:15)
    at runSuite (file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:1142:15)
    at runFiles (file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:1199:5)
    at startTests (file:///C:/dev/Front/consolepfel-refonte-front/node_modules/@vitest/runner/dist/index.js:1208:3)
    at file:///C:/dev/Front/consolepfel-refonte-front/node_modules/vitest/dist/chunks/runBaseTests.D-Gcin7G.js:130:11

stderr | src/components/atoms/dateInput/dateInput.test.tsx > CustomInputDate > should call onChange when a date is selected
Warning: `ReactDOMTestUtils.act` is deprecated in favor of `React.act`. Import `act` from `react` instead of `react-dom/test-utils`. See https://react.dev/warnings/react-dom-test-utils for more info.

import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor, act } from "@testing-library/react";
import { describe, it, vi, expect, Mock } from "vitest";
import { getPerimetresMetiers } from "@/api/apifunctions/perimetreMetier/perimetreMetier";
import PerimetreMetierList from "./index";
// Mock des fonctions et hooks
vi.mock("@/stores/perimetreMetier/perimetreMetierStore", () => ({
  default: vi.fn().mockReturnValue({
    perimetresMetiers: {
      businessPerimeters: [],
      totalPages: 1,
    },
    setPerimetreMetier: vi.fn(),
  }),
}));
vi.mock("@/api/apifunctions/perimetreMetier/perimetreMetier", () => ({
  getPerimetresMetiers: vi.fn(),
  addPerimetreMetier: vi.fn(),
  updatePerimetreMetier: vi.fn(),
  deletePerimetreMetier: vi.fn(),
}));
describe("PerimetreMetierList", () => {
  const createQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
  it("should render the component with 'Ajouter un Périmètre Métier' button", async () => {
    const queryClient = createQueryClient();
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <PerimetreMetierList />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });
    expect(screen.getByText("Ajouter un Périmètre Métier")).toBeInTheDocument();
  });
  it("should display 'Aucun Périmètre Métier trouvé' alert if the list is empty", async () => {
    const queryClient = createQueryClient();
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <PerimetreMetierList />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });
    expect(
      screen.getByText("Aucun Périmètre Métier trouvé.")
    ).toBeInTheDocument();
  });
  it("should call the API to fetch data on mount", async () => {
    const queryClient = createQueryClient();
    (getPerimetresMetiers as Mock).mockResolvedValueOnce({
      successData: { businessPerimeters: [], totalPages: 1 },
    });
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <PerimetreMetierList />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });
    await waitFor(() => {
      expect(getPerimetresMetiers).toHaveBeenCalled();
    });
  });
  it("should show error alert if fetching data fails", async () => {
    const queryClient = createQueryClient();
    (getPerimetresMetiers as Mock).mockRejectedValueOnce(
      new Error("API Error")
    );
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <PerimetreMetierList />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });
    await waitFor(() => {
      expect(
        screen.getByText(
          "Une erreur est survenue lors du chargement des Périmètres Métiers."
        )
      ).toBeInTheDocument();
    });
  });
});
