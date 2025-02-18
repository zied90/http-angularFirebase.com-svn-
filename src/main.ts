import { Navigate, Outlet } from "react-router-dom";
import { useOidcUser } from "@/oidc/useOidc";
const ProtectedRoute = () => {
 const { oidcUser } = useOidcUser() as any;
 const isAdmin = oidcUser?.member_of?.includes("ADMIN");
 return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoute;

import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "@/toolkit/Components/Loader";
import Home from "@/pages/Home";
import MesCourriers from "@/pages/MesCourriers";
import CourriersSauvegardes from "@/pages/CourriersSauvegardes";
import MesModeles from "@/pages/MesModeles";
import CourriersDerniers from "@/pages/CourriersDerniers";
import Favoris from "@/pages/Favoris";
import Generer from "@/pages/Generer";
import Search from "@/pages/Search";
import Help from "@/pages/Help";
import { RouteItem } from "@/toolkit/Components/Navigation";
import memoize from "@/toolkit/Utils/Memoize";
import { courriersGeneresRoute, courriersSauvegardesRoute } from "@/Api/ApiRoutes";
import { ColumnNameEnum } from "@/types/ColumnName.type";
const Parametres = lazy(() => import("@/pages/Parametres"));
const Admin = lazy(() => import("@/Admin/Admin"));
const Habilitations = lazy(() => import("@/Admin/Habilitations"));
const AjoutModele = lazy(() => import("@/Admin/ajoutModele"));
const GestionModeles = lazy(() => import("@/Admin/GestionModeles"));
export const RouteItems: RouteItem[] = [
  { id: "accueil", inNavigation: true, label: "Accueil", index: true, path: "/", element: <Home /> },
  { id: "courriers", inNavigation: true, label: "Mes courriers", path: "/courriers", element: <MesCourriers /> },
  {
    id: "courriersSauvegardes",
    inNavigation: false,
    label: "Courriers sauvegardés",
    path: "/courriers/sauvegardes",
    element: (
      <CourriersSauvegardes
        route={courriersSauvegardesRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.modifyDate]}
      />
    ),
    parent: "courriers",
  },
  {
    id: "courriersGeneres",
    inNavigation: false,
    label: "Courriers générés",
    path: "/courriers/generes",
    element: (
      <CourriersSauvegardes
        route={courriersGeneresRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.createDate]}
      />
    ),
    parent: "courriers",
  },
  { id: "mesModeles", inNavigation: true, label: "Mes Modèles", path: "/courriers/mesmodeles", element: <MesModeles /> },
  { id: "favoris", inNavigation: true, label: "Mes favoris", path: "/courriers/favoris", element: <Favoris /> },
  {
    id: "courriersDerniers",
    inNavigation: true,
    label: "Mes derniers courriers utilisés",
    path: "/courriers/derniers",
    element: <CourriersDerniers />,
  },
  {
    id: "parametres",
    inNavigation: true,
    label: "Paramètres",
    path: "/parametres",
    element: (
      <Suspense fallback={<Loader loaded={true}>Chargement...</Loader>}>
        <Parametres />
      </Suspense>
    ),
  },
  { id: "search", inNavigation: false, label: "Rechercher", path: "/search", element: <Search />, parent: "accueil" },
  { id: "generer", inNavigation: false, label: "Générer le courrier", path: "/generer/:id", element: <Generer />, parent: "accueil" },
  {
    id: "contactaide",
    inNavigation: true,
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
  // SECTION ADMIN PROTÉGÉE PAR `ProtectedRoute`
  {
    id: "admin",
    inNavigation: true,
    label: (
      <>
        {" "}
        <i className="icon icon-settings"></i>&nbsp; Admin{" "}
      </>
    ),
    title: "Admin",
    path: "/admin",
    element: (
      <ProtectedRoute >
        <Suspense fallback={<Loader loaded={true}>Admin, chargement en cours...</Loader>}>
          <Admin />
        </Suspense>
      </ProtectedRoute>
    ),
    navigationClass: "menu-position--right",
    children: [
      {
        id: "adminHabilitations",
        inNavigation: true,
        label: "Habilitations",
        icon: "icon-user-add",
        description: "Ajouter des utilisateurs depuis des listes d'utilisateurs",
        path: "/admin/habilitations",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Habilitations, chargement en cours...</Loader>}>
              <Habilitations />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        id: "adminTemplateAdd",
        inNavigation: true,
        icon: "icon-word-add",
        label: "Ajouter un modèle de courrier",
        description: "Ajout d'un nouveau modèle de courrier",
        path: "/admin/templateAdd",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Ajout de modèle, chargement en cours...</Loader>}>
              <AjoutModele />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        id: "adminTemplateManage",
        inNavigation: true,
        icon: "icon-list",
        label: "Gérer les modèles",
        description: "Gérer les modèles de courrier existants",
        path: "/admin/templateManage",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Gestion des modèles, chargement en cours...</Loader>}>
              <GestionModeles />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Page 404
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
  return getRoutesList().find((route) => route.id === name);
};
export const getRouteItemFromLocation = (location: string): RouteItem | undefined => {
  return getRoutesList().find((route) => route.path === location);
};
export const setAppTitleFromLocation = (location: string, template: string) => {
  const route = getRouteItemFromLocation(location);
  if (route) {
    document.title = template.replace("{pageTitle}", (route.title as string) || (route.label as string));
  }
};
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "@/toolkit/Components/Loader";
import Home from "@/pages/Home";
import MesCourriers from "@/pages/MesCourriers";
import CourriersSauvegardes from "@/pages/CourriersSauvegardes";
import MesModeles from "@/pages/MesModeles";
import CourriersDerniers from "@/pages/CourriersDerniers";
import Favoris from "@/pages/Favoris";
import Generer from "@/pages/Generer";
import Search from "@/pages/Search";
import Help from "@/pages/Help";
import { RouteItem } from "@/toolkit/Components/Navigation";
import memoize from "@/toolkit/Utils/Memoize";
import { courriersGeneresRoute, courriersSauvegardesRoute } from "@/Api/ApiRoutes";
import { ColumnNameEnum } from "@/types/ColumnName.type";
const Parametres = lazy(() => import("@/pages/Parametres"));
const Admin = lazy(() => import("@/Admin/Admin"));
const Habilitations = lazy(() => import("@/Admin/Habilitations"));
const AjoutModele = lazy(() => import("@/Admin/ajoutModele"));
const GestionModeles = lazy(() => import("@/Admin/GestionModeles"));
export const RouteItems: RouteItem[] = [
  { id: "accueil", inNavigation: true, label: "Accueil", index: true, path: "/", element: <Home /> },
  { id: "courriers", inNavigation: true, label: "Mes courriers", path: "/courriers", element: <MesCourriers /> },
  {
    id: "courriersSauvegardes",
    inNavigation: false,
    label: "Courriers sauvegardés",
    path: "/courriers/sauvegardes",
    element: (
      <CourriersSauvegardes
        route={courriersSauvegardesRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.modifyDate]}
      />
    ),
    parent: "courriers",
  },
  {
    id: "courriersGeneres",
    inNavigation: false,
    label: "Courriers générés",
    path: "/courriers/generes",
    element: (
      <CourriersSauvegardes
        route={courriersGeneresRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.createDate]}
      />
    ),
    parent: "courriers",
  },
  { id: "mesModeles", inNavigation: true, label: "Mes Modèles", path: "/courriers/mesmodeles", element: <MesModeles /> },
  { id: "favoris", inNavigation: true, label: "Mes favoris", path: "/courriers/favoris", element: <Favoris /> },
  {
    id: "courriersDerniers",
    inNavigation: true,
    label: "Mes derniers courriers utilisés",
    path: "/courriers/derniers",
    element: <CourriersDerniers />,
  },
  {
    id: "parametres",
    inNavigation: true,
    label: "Paramètres",
    path: "/parametres",
    element: (
      <Suspense fallback={<Loader loaded={true}>Chargement...</Loader>}>
        <Parametres />
      </Suspense>
    ),
  },
  { id: "search", inNavigation: false, label: "Rechercher", path: "/search", element: <Search />, parent: "accueil" },
  { id: "generer", inNavigation: false, label: "Générer le courrier", path: "/generer/:id", element: <Generer />, parent: "accueil" },
  {
    id: "contactaide",
    inNavigation: true,
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
  // SECTION ADMIN PROTÉGÉE PAR `ProtectedRoute`
  {
    id: "admin",
    inNavigation: true,
    label: (
      <>
        {" "}
        <i className="icon icon-settings"></i>&nbsp; Admin{" "}
      </>
    ),
    title: "Admin",
    path: "/admin",
    element: (
      <ProtectedRoute >
        <Suspense fallback={<Loader loaded={true}>Admin, chargement en cours...</Loader>}>
          <Admin />
        </Suspense>
      </ProtectedRoute>
    ),
    navigationClass: "menu-position--right",
    children: [
      {
        id: "adminHabilitations",
        inNavigation: true,
        label: "Habilitations",
        icon: "icon-user-add",
        description: "Ajouter des utilisateurs depuis des listes d'utilisateurs",
        path: "/admin/habilitations",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Habilitations, chargement en cours...</Loader>}>
              <Habilitations />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        id: "adminTemplateAdd",
        inNavigation: true,
        icon: "icon-word-add",
        label: "Ajouter un modèle de courrier",
        description: "Ajout d'un nouveau modèle de courrier",
        path: "/admin/templateAdd",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Ajout de modèle, chargement en cours...</Loader>}>
              <AjoutModele />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        id: "adminTemplateManage",
        inNavigation: true,
        icon: "icon-list",
        label: "Gérer les modèles",
        description: "Gérer les modèles de courrier existants",
        path: "/admin/templateManage",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Gestion des modèles, chargement en cours...</Loader>}>
              <GestionModeles />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Page 404
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
  return getRoutesList().find((route) => route.id === name);
};
export const getRouteItemFromLocation = (location: string): RouteItem | undefined => {
  return getRoutesList().find((route) => route.path === location);
};
export const setAppTitleFromLocation = (location: string, template: string) => {
  const route = getRouteItemFromLocation(location);
  if (route) {
    document.title = template.replace("{pageTitle}", (route.title as string) || (route.label as string));
  }
};
import { lazy, Suspense } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "@/toolkit/Components/Loader";
import Home from "@/pages/Home";
import MesCourriers from "@/pages/MesCourriers";
import CourriersSauvegardes from "@/pages/CourriersSauvegardes";
import MesModeles from "@/pages/MesModeles";
import CourriersDerniers from "@/pages/CourriersDerniers";
import Favoris from "@/pages/Favoris";
import Generer from "@/pages/Generer";
import Search from "@/pages/Search";
import Help from "@/pages/Help";
import { RouteItem } from "@/toolkit/Components/Navigation";
import memoize from "@/toolkit/Utils/Memoize";
import { courriersGeneresRoute, courriersSauvegardesRoute } from "@/Api/ApiRoutes";
import { ColumnNameEnum } from "@/types/ColumnName.type";
const Parametres = lazy(() => import("@/pages/Parametres"));
const Admin = lazy(() => import("@/Admin/Admin"));
const Habilitations = lazy(() => import("@/Admin/Habilitations"));
const AjoutModele = lazy(() => import("@/Admin/ajoutModele"));
const GestionModeles = lazy(() => import("@/Admin/GestionModeles"));
export const RouteItems: RouteItem[] = [
  { id: "accueil", inNavigation: true, label: "Accueil", index: true, path: "/", element: <Home /> },
  { id: "courriers", inNavigation: true, label: "Mes courriers", path: "/courriers", element: <MesCourriers /> },
  {
    id: "courriersSauvegardes",
    inNavigation: false,
    label: "Courriers sauvegardés",
    path: "/courriers/sauvegardes",
    element: (
      <CourriersSauvegardes
        route={courriersSauvegardesRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.modifyDate]}
      />
    ),
    parent: "courriers",
  },
  {
    id: "courriersGeneres",
    inNavigation: false,
    label: "Courriers générés",
    path: "/courriers/generes",
    element: (
      <CourriersSauvegardes
        route={courriersGeneresRoute}
        showColumns={[ColumnNameEnum.title, ColumnNameEnum.creator, ColumnNameEnum.createDate]}
      />
    ),
    parent: "courriers",
  },
  { id: "mesModeles", inNavigation: true, label: "Mes Modèles", path: "/courriers/mesmodeles", element: <MesModeles /> },
  { id: "favoris", inNavigation: true, label: "Mes favoris", path: "/courriers/favoris", element: <Favoris /> },
  {
    id: "courriersDerniers",
    inNavigation: true,
    label: "Mes derniers courriers utilisés",
    path: "/courriers/derniers",
    element: <CourriersDerniers />,
  },
  {
    id: "parametres",
    inNavigation: true,
    label: "Paramètres",
    path: "/parametres",
    element: (
      <Suspense fallback={<Loader loaded={true}>Chargement...</Loader>}>
        <Parametres />
      </Suspense>
    ),
  },
  { id: "search", inNavigation: false, label: "Rechercher", path: "/search", element: <Search />, parent: "accueil" },
  { id: "generer", inNavigation: false, label: "Générer le courrier", path: "/generer/:id", element: <Generer />, parent: "accueil" },
  {
    id: "contactaide",
    inNavigation: true,
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
  // SECTION ADMIN PROTÉGÉE PAR `ProtectedRoute`
  {
    id: "admin",
    inNavigation: true,
    label: (
      <>
        {" "}
        <i className="icon icon-settings"></i>&nbsp; Admin{" "}
      </>
    ),
    title: "Admin",
    path: "/admin",
    element: (
      <ProtectedRoute >
        <Suspense fallback={<Loader loaded={true}>Admin, chargement en cours...</Loader>}>
          <Admin />
        </Suspense>
      </ProtectedRoute>
    ),
    navigationClass: "menu-position--right",
    children: [
      {
        id: "adminHabilitations",
        inNavigation: true,
        label: "Habilitations",
        icon: "icon-user-add",
        description: "Ajouter des utilisateurs depuis des listes d'utilisateurs",
        path: "/admin/habilitations",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Habilitations, chargement en cours...</Loader>}>
              <Habilitations />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        id: "adminTemplateAdd",
        inNavigation: true,
        icon: "icon-word-add",
        label: "Ajouter un modèle de courrier",
        description: "Ajout d'un nouveau modèle de courrier",
        path: "/admin/templateAdd",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Ajout de modèle, chargement en cours...</Loader>}>
              <AjoutModele />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        id: "adminTemplateManage",
        inNavigation: true,
        icon: "icon-list",
        label: "Gérer les modèles",
        description: "Gérer les modèles de courrier existants",
        path: "/admin/templateManage",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loader loaded={true}>Gestion des modèles, chargement en cours...</Loader>}>
              <GestionModeles />
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
  // Page 404
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
  return getRoutesList().find((route) => route.id === name);
};
export const getRouteItemFromLocation = (location: string): RouteItem | undefined => {
  return getRoutesList().find((route) => route.path === location);
};
export const setAppTitleFromLocation = (location: string, template: string) => {
  const route = getRouteItemFromLocation(location);
  if (route) {
    document.title = template.replace("{pageTitle}", (route.title as string) || (route.label as string));
  }
};
type '{ children: Element; }' has no properties in common with type 'IntrinsicAttributes'.ts(2559)
(alias) const ProtectedRoute: () => JSX.Element
import ProtectedRout
