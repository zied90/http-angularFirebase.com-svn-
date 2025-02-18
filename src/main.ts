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
vi.mock("@", () => ({
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

 FAIL  src/components/AppContent/AppContent.spec.tsx [ src/components/AppContent/AppContent.spec.tsx ]
Error: [vitest] No "createContext" export is defined on the "react" mock. Did you forget to return it from "vi.mock"?
If you need to partially mock a module, you can use "importOriginal" helper inside:

vi.mock(import("react"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    // your mocked methods
  }
})

import { FC, useEffect, useMemo } from "react";
import "./AppContent.scss";
import { useRoutes, RouteObject } from "react-router";
import { getRoutesList, setAppTitleFromLocation } from "@/config/Routes";
import { useLocation } from "react-router-dom";
import { useOidcUser } from "@/oidc/useOidc";
import { useAdmin } from "@/services/AdminContext";

interface Props {}

const AppContent: FC<Props> = () => {
  const { oidcUser } = useOidcUser();
  const { isAdmin } = useAdmin();
  const routes: RouteObject[] = useMemo(
    () =>
      getRoutesList()
        .filter(({ filter }) => !filter || filter({ user: oidcUser , isAdmin}))
        .map(({ id, path, element }) => ({
          path,
          element,
        })),
    [oidcUser,isAdmin]
  );

  const routesElements = useRoutes(routes);

  let location = useLocation();
  useEffect(() => {
    setAppTitleFromLocation(location.pathname, "Ellipse - {pageTitle}");
  }, [location]);
  return <div className="AppContent container">{routesElements}</div>;
};

export default AppContent;


 ❯ src/services/AdminContext.tsx:6:22
      4|  setIsAdmin: (value: boolean) => void;
      5| }
      5| }
      6| const AdminContext = createContext<AdminContextType | undefined>(undefined);
       |                      ^
      7| export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      8|  const [isAdmin, setIsAdmin] = useState(false);
      5| }
      6| const AdminContext = createContext<AdminContextType | undefined>(undefined);
       |                      ^
      7| export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      8|  const [isAdmin, setIsAdmin] = useState(false);
      5| }
      6| const AdminContext = createContext<AdminContextType | undefined>(undefined);
       |                      ^
      7| export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      5| }
      6| const AdminContext = createContext<AdminContextType | undefined>(undefined);
       |                      ^
      5| }
      6| const AdminContext = createContext<AdminContextType | undefined>(undefined);
      5| }
      5| }
      6| const AdminContext = createContext<AdminContextType | undefined>(undefined);
       |                      ^
      7| export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      8|  const [isAdmin, setIsAdmin] = useState(false);
 ❯ src/components/AppContent/AppContent.tsx:8:31

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

 Test Files  1 failed | 48 passed (49)
