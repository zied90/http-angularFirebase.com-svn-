import { FC } from "react";
import SendUserInfos from "./SendUserInfos";
import { OidcSecure } from "./useOidc";
import { AdminProvider } from "@/services/AdminContext";

type Props = {
  children?: React.ReactNode;
};

const OidcNotLoadedApp: FC<Props> = ({ children }) => {
  return (
    <OidcSecure>
      <AdminProvider>
      <SendUserInfos>{children}</SendUserInfos>
      </AdminProvider>
    </OidcSecure>
  );
};

export default OidcNotLoadedApp;

import React, { createContext, useContext, useState } from 'react';
interface AdminContextType {
 isAdmin: boolean;
 setIsAdmin: (value: boolean) => void;
}
const AdminContext = createContext<AdminContextType | undefined>(undefined);
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [isAdmin, setIsAdmin] = useState(false);
 return (
<AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
     {children}
</AdminContext.Provider>
 );
};
export const useAdmin = () => {
 const context = useContext(AdminContext);
 if (!context) {
   throw new Error('useAdmin must be used within an AdminProvider');
 }
 return context;
};
import CourriersSauvegardes from "@/pages/CourriersSauvegardes";
import MesModeles from "@/pages/MesModeles";
import CourriersDerniers from "@/pages/CourriersDerniers";
import Favoris from "@/pages/Favoris";
import Generer from "@/pages/Generer";
import Home from "@/pages/Home";
import MesCourriers from "@/pages/MesCourriers";

import Search from "@/pages/Search";
import { RouteItem } from "@/toolkit/Components/Navigation";
import memoize from "@/toolkit/Utils/Memoize";
import { courriersGeneresRoute, courriersSauvegardesRoute } from "@/Api/ApiRoutes";
import { ColumnNameEnum } from "@/types/ColumnName.type";
import React, { lazy, Suspense } from "react";
import Help from "@/pages/Help";
import Loader from "@/toolkit/Components/Loader";
import { useAdmin } from "@/services/AdminContext";

// import Parametres from "@/pages/Parametres";
const Parametres = lazy(() => import("@/pages/Parametres"));
const Admin = lazy(() => import("@/Admin/Admin"));
const Habilitations = lazy(() => import("@/Admin/Habilitations"));
const AjoutModele = lazy(() => import("@/Admin/ajoutModele"));
const GestionModeles = lazy(() => import("@/Admin/GestionModeles"));

export const accueil = "accueil";
export const courriers = "courriers";
export const courriersSauvegardes = "courriersSauvegardes";
export const courriersGeneres = "courriersGeneres";
export const courriersDerniers = "courriersDerniers";
export const mesModeles = "mesModeles";
export const favoris = "favoris";
export const parametres = "parametres";
export const contactaide = "contactaide";
export const search = "search";
export const generer = "generer";
export const admin = "admin";
export const adminHabilitations = "adminHabilitations";
export const adminTemplateAdd = "adminTemplateAdd";
export const adminTemplateManage = "adminTemplateManage";
export const isAdmin = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isAdmin } = useAdmin();
  return isAdmin;
 };
export const RouteItems: RouteItem[] = [
  { id: accueil, inNavigation: true, label: "Accueil", index: true, path: "/", element: <Home /> },
  {
    id: courriers,
    inNavigation: true,
    label: "Mes courriers",
    path: "/courriers",
    element: <MesCourriers />,
  },
  {
    id: courriersSauvegardes,
    inNavigation: false,
    label: "Courriers sauvegardés",
    path: "/courriers/sauvegardes",
    element: (
      <CourriersSauvegardes
        route={courriersSauvegardesRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.modifyDate]}
      />
    ),
    parent: courriers,
  },
  {
    id: courriersGeneres,
    inNavigation: false,
    label: "Courriers générés",
    path: "/courriers/generes",
    element: (
      <CourriersSauvegardes
        route={courriersGeneresRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.createDate]}
        title={
          <>
            Courriers générés <i className="icon icon-pdf2 icon-pdf-color"></i>
          </>
        }
      />
    ),
    parent: courriers,
  },
  {
    id: mesModeles,
    inNavigation: true,
    label: "Mes Modèles",
    path: "/courriers/mesmodeles",
    element: <MesModeles />,
  },
  { id: favoris, inNavigation: true, label: "Mes favoris", path: "/courriers/favoris", element: <Favoris /> },
  {
    id: courriersDerniers,
    inNavigation: true,
    label: "Mes derniers courriers utilisés",
    path: "/courriers/derniers",
    element: <CourriersDerniers />,
  },
  {
    id: parametres,
    inNavigation: true,
    label: "Paramètres",
    path: "/parametres",
    element: (
      <React.Suspense fallback={<>...</>}>
        <Parametres />
      </React.Suspense>
    ),
  },
  { id: search, inNavigation: false, label: "Rechercher", path: "/search", element: <Search />, parent: accueil },
  { id: generer, inNavigation: false, label: "Générer le courrier", path: "/generer/:id", element: <Generer />, parent: accueil },
  {
    id: contactaide,
    inNavigation: true,
    filter: ({ user }) => {
      return [1, 2, 6, 7].includes(user?.axa_type * 1);
    },
    label: (
      <>
        Guide et fiches&nbsp;&nbsp;<i className="icon icon-question-sign"></i>
      </>
    ),
    title: "Guide et fiches pratiques",
    path: "/guide",
    element: <Help />,
    navigationClass: "ml-a",
  },
  /* charger les composants en Lazy, cf Menu Parametres */
  {
    id: admin,
    inNavigation: true,
    label: (
      <>
        <i className="icon icon-settings"></i>&nbsp; Admin
      </>
    ),
    title: "Admin",
    path: "/admin",
    element: (
      <Suspense fallback={<Loader loaded={true}>Admin, chargement en cours...</Loader>}>
        <Admin />
      </Suspense>
    ),
    navigationClass: "menu-position--right",
    filter: () => isAdmin(),
    children: [
      {
        id: adminHabilitations,
        inNavigation: true,
        label: "Habilitations",
        icon: "icon-user-add",
        description: "Ajouter des utilisateurs depuis des listes d'utilisateurs",
        path: "/admin/habilitations",
        element: (
          <Suspense fallback={<Loader loaded={true}>Habilitations, chargement en cours...</Loader>}>
            <Habilitations />
          </Suspense>
        ),
        filter: () => isAdmin(),
      },
      {
        id: adminTemplateAdd,
        inNavigation: true,
        icon: "icon-word-add",
        label: "Ajouter un modèle de courrier",
        description: "Ajout d'un nouveau modèle de courrier",
        path: "/admin/templateAdd",
        element: (
          <Suspense fallback={<Loader loaded={true}>Ajout de modèle, chargement en cours...</Loader>}>
            <AjoutModele />
          </Suspense>
        ),
        filter: () => isAdmin(),
      },
      {
        id: adminTemplateManage,
        inNavigation: true,
        icon: "icon-list",
        label: "Gérer les modèles",
        description: "Gérer les modèles de courrier existants",
        path: "/admin/templateManage",
        element: (
          <Suspense fallback={<Loader loaded={true}>Gestion des modèles, chargement en cours...</Loader>}>
            <GestionModeles />
          </Suspense>
        ),
        filter: () => isAdmin(),
      },
    ],
  },
  {
    id: "404",
    inNavigation: false,
    label: "404",
    path: "*",
    element: (
      <div>
        <h2>Page 404</h2>
        <p>Page non trouvée</p>
      </div>
    ),
  },
];

export const getNavigationItemById = memoize((id: string): RouteItem | undefined => {
  return getRoutesList().find((route) => route.id === id);
});

export const findItem = (id: string, routesArray?: RouteItem[]): RouteItem | null => {
  if (!routesArray) routesArray = RouteItems;
  for (const route of routesArray) {
    if (route.id === id) return route;
    if (route.children) {
      const child = findItem(id, route.children);
      if (child) return child;
    }
  }
  return null;
};

export const getRoutesList = (): RouteItem[] => {
  let routes: RouteItem[] = [];
  RouteItems.forEach((route) => {
    routes.push(route);
    if (route.children) {
      routes = [...routes, ...route.children];
    }
  });
  return routes;
};

export const getRouteItemFromId = (name: string): RouteItem | undefined => {
  const routes = getRoutesList();
  return routes.find((route) => route.id === name);
};

export const getRouteItemFromLocation = (location: string): RouteItem | undefined => {
  const routes = getRoutesList();
  return routes.find((route) => route.path === location);
};

export const setAppTitleFromLocation = (location: string, template: string) => {
  const route = getRouteItemFromLocation(location);
  if (route) {
    document.title = template.replace("{pageTitle}", (route.title as string) || (route.label as string));
  }
};
 quand jai integrer ca dans mon  code ilya des erreur // AdminContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
interface AdminContextType {
 isAdmin: boolean;
 setIsAdmin: (value: boolean) => void;
}
const AdminContext = createContext<AdminContextType | undefined>(undefined);
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 const [isAdmin, setIsAdmin] = useState(false);
 return (
<AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
     {children}
</AdminContext.Provider>
 );
};
export const useAdmin = () => {
 const context = useContext(AdminContext);
 if (!context) {
   throw new Error('useAdmin must be used within an AdminProvider');
 }
 return context;
};
// Modified SendUserInfos.tsx
import { putInfosUserRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import { useOidcUser } from "../useOidc";
import { FC, useEffect, useState } from "react";
import { useAdmin } from './AdminContext';
import "./SendUserInfos.scss";
interface Props {
 className?: string;
 children?: React.ReactNode;
}
const SendUserInfos: FC<Props> = ({ children }) => {
 const { oidcUser } = useOidcUser();
 const { email, axa_uid_racf, name, axa_uid_rdu, axa_type } = (oidcUser as any) || {};
 const { call, loaded } = useDelayApi(putInfosUserRoute);
 const [userAllowed, setUserAllowed] = useState(false);
 const { setIsAdmin } = useAdmin();
 useEffect(() => {
   (async () => {
     try {
       const response = await call({
         email,
         userNumber: axa_uid_racf,
         name,
         axaUiRdu: axa_uid_rdu,
         axaType: axa_type
       });
       if (response?.authorities) {
         (oidcUser as any).member_of = response.authorities;
         // Set global admin state
         setIsAdmin(response.authorities.includes('ADMIN'));
       }
       setUserAllowed(true);
     } catch (error) {
       console.error("Error while sending user infos to Maam", error);
     }
   })();
 }, [email, axa_uid_racf, name, axa_type, setIsAdmin]);
 return (
<>
     {loaded ? (
       userAllowed ? (
         children
       ) : (
<div className="bigCenteredMessage">
           Vous n'avez pas accès à Ellipse, veuillez contacter votre administrateur.
</div>
       )
     ) : (
<div className="bigCenteredMessage">Chargement de Ellipse en cours</div>
     )}
</>
 );
};
export default SendUserInfos;
// Modified Routes.tsx (relevant parts)
import { useAdmin } from './AdminContext';
// Modify the isAdmin function to use the global state
export const isAdmin = () => {
 const { isAdmin } = useAdmin();
 return isAdmin;
};
// Modified route filter
export const RouteItems: RouteItem[] = [
 // ... other routes ...
 {
   id: admin,
   inNavigation: true,
   label: (
<>
<i className="icon icon-settings"></i>&nbsp; Admin
</>
   ),
   title: "Admin",
   path: "/admin",
   element: (
<Suspense fallback={<Loader loaded={true}>Admin, chargement en cours...</Loader>}>
<Admin />
</Suspense>
   ),
   navigationClass: "menu-position--right",
   filter: () => isAdmin(), // Using the global admin state
   children: [
     {
       id: adminHabilitations,
       inNavigation: true,
       label: "Habilitations",
       icon: "icon-user-add",
       description: "Ajouter des utilisateurs depuis des listes d'utilisateurs",
       path: "/admin/habilitations",
       element: (
<Suspense fallback={<Loader loaded={true}>Habilitations, chargement en cours...</Loader>}>
<Habilitations />
</Suspense>
       ),
       filter: () => isAdmin(), // Using the global admin state
     },
     // ... other admin routes with similar filter modifications
   ],
 },
];
// App.tsx or your main wrapper component
import { AdminProvider } from './AdminContext';
const App = () => {
 return (
<AdminProvider>
<SendUserInfos>
       {/* Your app content */}
</SendUserInfos>
</AdminProvider>
 );
};
export default App;  voci erreur Fetch /user with params undefined and datas {}
AdminContext.tsx:16  Warning: Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks
    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739876478867:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739876478867:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739876478867:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739876548121:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739876262959:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739876614754:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739876614754:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
error @ react-dom.development.js:60
warnInvalidHookAccess @ react-dom.development.js:16801
useContext @ react-dom.development.js:17255
useContext @ react.development.js:1618
useAdmin @ AdminContext.tsx:16
isAdmin @ Routes.tsx:43
filter @ Routes.tsx:147
(anonymes) @ AppContent.tsx:15
(anonymes) @ AppContent.tsx:15
mountMemo @ react-dom.development.js:16406
useMemo @ react-dom.development.js:16851
useMemo @ react.development.js:1650
AppContent @ AppContent.tsx:12
renderWithHooks @ react-dom.development.js:15486
mountIndeterminateComponent @ react-dom.development.js:20103
beginWork @ react-dom.development.js:21626
beginWork$1 @ react-dom.development.js:27465
performUnitOfWork @ react-dom.development.js:26596
workLoopSync @ react-dom.development.js:26505
renderRootSync @ react-dom.development.js:26473
performConcurrentWorkOnRoot @ react-dom.development.js:25777
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
AdminContext.tsx:16  Warning: Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks
    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739876478867:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739876478867:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739876478867:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739876548121:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739876262959:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739876614754:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739876614754:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
error @ react-dom.development.js:60
warnInvalidHookAccess @ react-dom.development.js:16801
useContext @ react-dom.development.js:17255
useContext @ react.development.js:1618
useAdmin @ AdminContext.tsx:16
isAdmin @ Routes.tsx:43
filter @ Routes.tsx:161
(anonymes) @ AppContent.tsx:15
(anonymes) @ AppContent.tsx:15
mountMemo @ react-dom.development.js:16406
useMemo @ react-dom.development.js:16851
useMemo @ react.development.js:1650
AppContent @ AppContent.tsx:12
renderWithHooks @ react-dom.development.js:15486
mountIndeterminateComponent @ react-dom.development.js:20103
beginWork @ react-dom.development.js:21626
beginWork$1 @ react-dom.development.js:27465
performUnitOfWork @ react-dom.development.js:26596
workLoopSync @ react-dom.development.js:26505
renderRootSync @ react-dom.development.js:26473
performConcurrentWorkOnRoot @ react-dom.development.js:25777
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
AdminContext.tsx:16  Warning: Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks
    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739876478867:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739876478867:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739876478867:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739876548121:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739876262959:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739876614754:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739876614754:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
error @ react-dom.development.js:60
warnInvalidHookAccess @ react-dom.development.js:16801
useContext @ react-dom.development.js:17255
useContext @ react.development.js:1618
useAdmin @ AdminContext.tsx:16
isAdmin @ Routes.tsx:43
filter @ Routes.tsx:175
(anonymes) @ AppContent.tsx:15
(anonymes) @ AppContent.tsx:15
mountMemo @ react-dom.development.js:16406
useMemo @ react-dom.development.js:16851
useMemo @ react.development.js:1650
AppContent @ AppContent.tsx:12
renderWithHooks @ react-dom.development.js:15486
mountIndeterminateComponent @ react-dom.development.js:20103
beginWork @ react-dom.development.js:21626
beginWork$1 @ react-dom.development.js:27465
performUnitOfWork @ react-dom.development.js:26596
workLoopSync @ react-dom.development.js:26505
renderRootSync @ react-dom.development.js:26473
performConcurrentWorkOnRoot @ react-dom.development.js:25777
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
AdminContext.tsx:16  Warning: Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks
    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739876478867:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739876478867:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739876478867:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739876548121:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739876262959:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739876614754:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739876614754:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
error @ react-dom.development.js:60
warnInvalidHookAccess @ react-dom.development.js:16801
useContext @ react-dom.development.js:17255
useContext @ react.development.js:1618
useAdmin @ AdminContext.tsx:16
isAdmin @ Routes.tsx:43
filter @ Routes.tsx:189
(anonymes) @ AppContent.tsx:15
(anonymes) @ AppContent.tsx:15
mountMemo @ react-dom.development.js:16406
useMemo @ react-dom.development.js:16851
useMemo @ react.development.js:1650
AppContent @ AppContent.tsx:12
renderWithHooks @ react-dom.development.js:15486
mountIndeterminateComponent @ react-dom.development.js:20103
beginWork @ react-dom.development.js:21626
beginWork$1 @ react-dom.development.js:27465
performUnitOfWork @ react-dom.development.js:26596
workLoopSync @ react-dom.development.js:26505
renderRootSync @ react-dom.development.js:26473
performConcurrentWorkOnRoot @ react-dom.development.js:25777
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
deprecations.ts:9  ⚠️ React Router Future Flag Warning: React Router will begin wrapping state updates in `React.startTransition` in v7. You can use the `v7_startTransition` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_starttransition.
warnOnce @ deprecations.ts:9
logDeprecation @ deprecations.ts:14
logV6DeprecationWarnings @ deprecations.ts:26
(anonymes) @ index.tsx:816
commitHookEffectListMount @ react-dom.development.js:23189
commitPassiveMountOnFiber @ react-dom.development.js:24965
commitPassiveMountEffects_complete @ react-dom.development.js:24930
commitPassiveMountEffects_begin @ react-dom.development.js:24917
commitPassiveMountEffects @ react-dom.development.js:24905
flushPassiveEffectsImpl @ react-dom.development.js:27078
flushPassiveEffects @ react-dom.development.js:27023
(anonymes) @ react-dom.development.js:26808
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
deprecations.ts:9  ⚠️ React Router Future Flag Warning: Relative route resolution within Splat routes is changing in v7. You can use the `v7_relativeSplatPath` future flag to opt-in early. For more information, see https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath.
warnOnce @ deprecations.ts:9
logDeprecation @ deprecations.ts:14
logV6DeprecationWarnings @ deprecations.ts:37
(anonymes) @ index.tsx:816
commitHookEffectListMount @ react-dom.development.js:23189
commitPassiveMountOnFiber @ react-dom.development.js:24965
commitPassiveMountEffects_complete @ react-dom.development.js:24930
commitPassiveMountEffects_begin @ react-dom.development.js:24917
commitPassiveMountEffects @ react-dom.development.js:24905
flushPassiveEffectsImpl @ react-dom.development.js:27078
flushPassiveEffects @ react-dom.development.js:27023
(anonymes) @ react-dom.development.js:26808
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
[NOUVEAU] Expliquez les erreurs de la console à l’aide de Copilot pour Edge : cliquez sur
         
         pour expliquer une erreur.
        En savoir plus
        Ne plus afficher
AppContent.tsx:26  Warning: React has detected a change in the order of Hooks called by AppContent. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
1. useState                   useState
2. useState                   useState
3. useState                   useState
4. useEffect                  useEffect
5. useMemo                    useMemo
6. useContext                 useContext
7. useContext                 useContext
8. useContext                 useContext
9. useContext                 useContext
10. useContext                useContext
11. useContext                useContext
12. useContext                useContext
13. useContext                useEffect
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    at AppContent (http://localhost/src/components/AppContent/AppContent.tsx?t=1739876478867:19:26)
    at div
    at App (http://localhost/src/App.tsx?t=1739876478867:24:22)
    at FiltersProvider (http://localhost/src/context/FiltersProvider.tsx?t=1739876478867:21:28)
    at Router (http://localhost/node_modules/.vite/deps/chunk-QQ5GUQ7I.js?v=9e035f9b:4546:15)
    at BrowserRouter (http://localhost/node_modules/.vite/deps/react-router-dom.js?v=9e035f9b:556:5)
    at SignatureProvider (http://localhost/src/context/SignatureProvider.tsx:22:37)
    at AgencesProvider (http://localhost/src/context/AgencesProvider.tsx:17:28)
    at DocumentManagerProvider (http://localhost/src/context/documentManager/DocumentManagerProvider.tsx:16:43)
    at SendUserInfos (http://localhost/src/oidc/SendUserInfos/SendUserInfos.tsx?t=1739876548121:17:26)
    at AdminProvider (http://localhost/src/services/AdminContext.tsx?t=1739876262959:13:33)
    at ge2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2161:13)
    at OidcNotLoadedApp (http://localhost/src/oidc/OidcNotLoadedApp.tsx?t=1739876614754:13:29)
    at fe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2021:21)
    at _e2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:1984:27)
    at P2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2035:24)
    at Pe2 (http://localhost/node_modules/.vite/deps/@axa-fr_react-oidc.js?v=9e035f9b:2040:13)
    at Oidc (http://localhost/src/oidc/Oidc.tsx?t=1739876614754:13:17)
    at CacheProvider (http://localhost/src/context/CacheProvider.tsx:15:33)
    at GlobalAlertProvider (http://localhost/src/toolkit/Components/GlobalAlert/GlobalAlertContext.tsx:16:32)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at NestedProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:12:25)
    at FlatProviders (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:31:24)
    at ChainedFlatProviders2 (http://localhost/node_modules/.vite/deps/react-flat-providers.js?v=9e035f9b:45:29)
    at AppWithProviders
printWarning @ react-dom.development.js:86
error @ react-dom.development.js:60
warnOnHookMismatchInDev @ react-dom.development.js:15401
updateHookTypesDev @ react-dom.development.js:15360
useEffect @ react-dom.development.js:17042
useEffect @ react.development.js:1634
AppContent @ AppContent.tsx:26
renderWithHooks @ react-dom.development.js:15486
updateFunctionComponent @ react-dom.development.js:19617
beginWork @ react-dom.development.js:21640
beginWork$1 @ react-dom.development.js:27465
performUnitOfWork @ react-dom.development.js:26596
workLoopSync @ react-dom.development.js:26505
renderRootSync @ react-dom.development.js:26473
performConcurrentWorkOnRoot @ react-dom.development.js:25777
workLoop @ scheduler.development.js:266
flushWork @ scheduler.development.js:239
performWorkUntilDeadline @ scheduler.development.js:533
