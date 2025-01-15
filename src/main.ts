import { render } from "@testing-library/react";
import { vi } from "vitest";
import * as React from "react";

import AppContent from "./AppContent";

vi.spyOn(React, "useMemo").mockImplementation((fn) => fn());

vi.mock("react", async () => {
  return {
    useEffect: vi.fn((cb) => {
      cb();
    }),
    useMemo: vi.fn((fn) => fn()),
  };
});

// Mocks des imports
vi.mock("react-router", () => ({
  useRoutes: vi.fn(() => <div>Mocked Routes</div>),
}));

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(() => ({ pathname: "/test" })),
}));

vi.mock("@/oidc/useOidc", () => ({
  useOidcUser: vi.fn(() => ({ oidcUser: null })),
}));

const setAppTitleFromLocation = vi.fn();
vi.mock("@/config/Routes", () => ({
  getRoutesList: () => [
    { id: "accueil", inNavigation: true, label: "Accueil", index: true, path: "/", element: <div>Accueil</div> },
    {
      id: "courriers",
      inNavigation: true,
      label: "Mes courriers",
      path: "/courriers",
      element: <div>Mes courriers</div>,
    },
  ],

  setAppTitleFromLocation: (...args: any) => {
    setAppTitleFromLocation(...args);
  },
}));

vi.mock("react-router", () => ({
  useRoutes: (routes: any) => (
    <div>
      {routes.map((r: any) => (
        <div key={r.path}>
          {r.path}
          {r.element}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn().mockReturnValue({ pathname: "/courriers" }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AppContent", () => {
  test("Should render AppContent", () => {
    render(<AppContent />);

    expect(setAppTitleFromLocation).toHaveBeenCalledWith("/courriers", "Ellipse - {pageTitle}");
  });
});
pour vi.mock("react-router-dom"  fait  comme lexmple que tetai donné et ajust le test de ajout template et pour info  voci url http://localhost/admin/templateAdd?tags=7  et ddans cete interface ilya enregiter 
