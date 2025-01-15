export const currentUser="consolePfel_ADMIN"
export  const listProfile: string[] = [
  "consolePfel_ADMIN",
  "ConsolePfel_AGS",
  "ConsolePfel_ATS",
  "ConsolePfel_DIM",
  "ConsolePfel_DSAT",
  "ConsolePfel_FSQC",
  "ConsolePfel_IARD",
  "ConsolePfel_VIECOL",
  "ConsolePfel_VIEIND"
];


export type UserRole =
 | 'consolePfel_ADMIN'
 | 'ConsolePfel_AGS'
 | 'ConsolePfel_Aspose'
 | 'ConsolePfel_ATS'
 | 'ConsolePfel_DIM'
 | 'ConsolePfel_DSAT'
 | 'ConsolePfel_FSQC'
 | 'ConsolePfel_IARD'
 | 'ConsolePfel_VIECOL'
 | 'ConsolePfel_VIEIND';


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "@/components/layout/Layout";
import DocumentsList from "@/pages/esign-demat/document";
import FormSetting from "@/pages/esign-demat/document/FormSetting";
import { GroupeList } from "@/pages/esign-demat/groupe";
import LettreList from "@/pages/esign-demat/lettre";
import PerimetreMetierList from "@/pages/esign-demat/perimetreMetier";
import PrePrintedList from "@/pages/esign-demat/prePrinted";

import ProductFamilyList from "@/pages/esign-demat/product/family";
import ProductLabelList from "@/pages/esign-demat/product/label";
import TemplateList from "@/pages/esign-demat/template";
import { LogsList } from "@/pages/logs";
import { ApplicationsList } from "@/pages/pfel";
import { SubrogationList } from "@/pages/subrogation";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roleTypes";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { currentUser } from "@/constants/global";
import { useOidcUser } from "@axa-fr/react-oidc";
export const createProtectedRouter = (userRole: UserRole) => {
  return createBrowserRouter([
    {
      path: "consolePfel",
      element: (
        <ProtectedRoute userRole={userRole}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        // Logs - accessible à tous
        {
          path: "logs/list",
          element: <LogsList />,
        },
        // Routes protégées - accessible uniquement à l'admin
        {
          path: "pfel/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <ApplicationsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "lettre/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <LettreList />
            </ProtectedRoute>
          ),
        },
        {
          path: "product",
          children: [
            {
              path: "family/list",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <ProductFamilyList />
                </ProtectedRoute>
              ),
            },
            {
              path: "label/list",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <ProductLabelList />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "groupKey/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <GroupeList />
            </ProtectedRoute>
          ),
        },
        {
          path: "documentSettings",
          children: [
            {
              path: "list",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <DocumentsList />
                </ProtectedRoute>
              ),
            },
            {
              path: "setting/:id",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <FormSetting />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "subrogation/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <SubrogationList />
            </ProtectedRoute>
          ),
        },
        {
          path: "businessPerimeter/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <PerimetreMetierList />
            </ProtectedRoute>
          ),
        },
        {
          path: "prePrinted/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <PrePrintedList />
            </ProtectedRoute>
          ),
        },
        {
          path: "template/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <TemplateList />
            </ProtectedRoute>
          ),
        },
        // Redirection par défaut
        {
          path: "*",
          element: <Navigate to="logs/list" replace />,
        },
      ],
    },
    // Redirection racine
    {
      path: "/",
      element: <Navigate to="consolePfel/logs/list" replace />,
    },
  ]);
};
// Pour utilisation dans AppRoutes.tsx
export const AppRoutes = () => {
    const { oidcUser } = useOidcUser();
    const { member_of} = (oidcUser as any ) || {};
    console.log(member_of.includes(currentUser) ,"tetete")
    console.log(currentUser,"sqqqqqq")
    console.log(member_of ,"ssss")
  const router = createProtectedRouter(currentUser);
  return <RouterProvider router={router} />;
};


import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserRole } from "@/types/roleTypes";
interface ProtectedRouteProps {
  userRole: UserRole;
  children: React.ReactNode;
}
export const isAdmin = (role: UserRole) => role === "consolePfel_ADMIN";
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  userRole,
  children,
}) => {
  const location = useLocation();
  const isLogsRoute = location.pathname.includes("/consolePfel/logs/list");
  if (isAdmin(userRole)) {
    return <>{children}</>;
  }
  if (!isLogsRoute) {
    return <Navigate to="/consolePfel/logs/list" replace />;
  }
  return <>{children}</>;
};

import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavBar, NavBarItem } from "@axa-fr/react-toolkit-layout-header";
import { useNavLinkInfo } from "@/hooks/navLink/useNavLinkInfo";
import { navLinks } from "@/constants/navLinks";


import "./NavBar.scss";
import { isAdmin } from "@/routes/ProtectedRoute";
import { currentUser } from "@/constants/global";

export const NavBarApp = () => {
  const location = useLocation();
  useNavLinkInfo(location.pathname);
  const [activePosition, setActivePosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const filteredNavLinks = useMemo(() => {
    if (isAdmin(currentUser)) {
      return navLinks;
    }
    return navLinks.filter((link) => link.href.includes("/logs/list"));
  }, []);
  const handleNavClick = (position: number) => {
    setActivePosition(position);
    setIsMenuOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <NavBar
      key={activePosition}
      isVisible={isMenuOpen}
      onClick={toggleMenu}
      positionInit={activePosition}
    >
      {filteredNavLinks.map((link, subIndex) => (
        <NavBarItem
          key={`${link.href}-${subIndex}`}
          actionElt={
            <Link
              className="af-nav__link"
              to={link.href}
              onClick={() => handleNavClick(link.position)}
            >
              {link.label}
            </Link>
          }
          aria-expanded="false"
          aria-haspopup="true"
          ariaLabel={link.label}
          className="af-nav__item--haschild af-nav__item"
        >
          {link.subLinks
            ?.filter((link) => !link.hidden)
            .map((subLink, subIndex) => (
              <NavBarItem
                onClick={() => handleNavClick(link.position)}
                key={`${subLink.href}-${subIndex}`}
                actionElt={
                  <Link className="af-nav__link" to={subLink.href}>
                    {subLink.label}
                  </Link>
                }
              />
            ))}
        </NavBarItem>
      ))}
    </NavBar>
  );
};

import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavBar, NavBarItem } from "@axa-fr/react-toolkit-layout-header";
import { useNavLinkInfo } from "@/hooks/navLink/useNavLinkInfo";
import { navLinks } from "@/constants/navLinks";


import "./NavBar.scss";
import { isAdmin } from "@/routes/ProtectedRoute";
import { currentUser } from "@/constants/global";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout } from "@/components/layout/Layout";
import DocumentsList from "@/pages/esign-demat/document";
import FormSetting from "@/pages/esign-demat/document/FormSetting";
import { GroupeList } from "@/pages/esign-demat/groupe";
import LettreList from "@/pages/esign-demat/lettre";
import PerimetreMetierList from "@/pages/esign-demat/perimetreMetier";
import PrePrintedList from "@/pages/esign-demat/prePrinted";

import ProductFamilyList from "@/pages/esign-demat/product/family";
import ProductLabelList from "@/pages/esign-demat/product/label";
import TemplateList from "@/pages/esign-demat/template";
import { LogsList } from "@/pages/logs";
import { ApplicationsList } from "@/pages/pfel";
import { SubrogationList } from "@/pages/subrogation";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRole } from "@/types/roleTypes";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { currentUser } from "@/constants/global";
import { useOidcUser } from "@axa-fr/react-oidc";
export const createProtectedRouter = (userRole: UserRole) => {
  return createBrowserRouter([
    {
      path: "consolePfel",
      element: (
        <ProtectedRoute userRole={userRole}>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        // Logs - accessible à tous
        {
          path: "logs/list",
          element: <LogsList />,
        },
        // Routes protégées - accessible uniquement à l'admin
        {
          path: "pfel/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <ApplicationsList />
            </ProtectedRoute>
          ),
        },
        {
          path: "lettre/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <LettreList />
            </ProtectedRoute>
          ),
        },
        {
          path: "product",
          children: [
            {
              path: "family/list",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <ProductFamilyList />
                </ProtectedRoute>
              ),
            },
            {
              path: "label/list",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <ProductLabelList />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "groupKey/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <GroupeList />
            </ProtectedRoute>
          ),
        },
        {
          path: "documentSettings",
          children: [
            {
              path: "list",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <DocumentsList />
                </ProtectedRoute>
              ),
            },
            {
              path: "setting/:id",
              element: (
                <ProtectedRoute userRole={userRole}>
                  <FormSetting />
                </ProtectedRoute>
              ),
            },
          ],
        },
        {
          path: "subrogation/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <SubrogationList />
            </ProtectedRoute>
          ),
        },
        {
          path: "businessPerimeter/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <PerimetreMetierList />
            </ProtectedRoute>
          ),
        },
        {
          path: "prePrinted/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <PrePrintedList />
            </ProtectedRoute>
          ),
        },
        {
          path: "template/list",
          element: (
            <ProtectedRoute userRole={userRole}>
              <TemplateList />
            </ProtectedRoute>
          ),
        },
        // Redirection par défaut
        {
          path: "*",
          element: <Navigate to="logs/list" replace />,
        },
      ],
    },
    // Redirection racine
    {
      path: "/",
      element: <Navigate to="consolePfel/logs/list" replace />,
    },
  ]);
};
// Pour utilisation dans AppRoutes.tsx
export const AppRoutes = () => {
    const { oidcUser } = useOidcUser();
    const { member_of} = (oidcUser as any ) || {};
    console.log(member_of.includes(currentUser) ,"tetete")
    console.log(currentUser,"sqqqqqq")
    console.log(member_of ,"ssss")
  const router = createProtectedRouter(currentUser);
  return <RouterProvider router={router} />;
};

voici   console.log(member_of ,"ssss") [
    "consolePfel_ADMIN"
]  'ssss'   donc ici aparti de cette info puisque il est admin il a acces atous  et pour les autre il on acces que a laliste des logs comment faire 
