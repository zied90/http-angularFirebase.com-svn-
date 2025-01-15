export const AppRoutes = () => {
  const userRole=useUserRole()
    console.log(consolePfelAdmin,"sqqqqqq")
    console.log(userRole ,"ssss")
  const router = createProtectedRouter(userRole);
  return <RouterProvider router={router} />;
};
Argument of type 'string | null' is not assignable to parameter of type 'UserRole'.
  Type 'null' is not assignable to type 'UserRole


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
import { consolePfelAdmin } from "@/constants/global";

import { useUserRole } from "@/hooks/userRole/useUserRole";
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
  const userRole=useUserRole()
    console.log(consolePfelAdmin,"sqqqqqq")
    console.log(userRole ,"ssss")
  const router = createProtectedRouter(userRole);
  return <RouterProvider router={router} />;
};
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
