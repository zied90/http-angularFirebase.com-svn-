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
const isAdmin = (member_of: string[]) => member_of?.includes("ADMIN");
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
    filter: ({ user }) => isAdmin(user?.member_of),
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
        filter: ({ user }) => isAdmin(user?.member_of),
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
        filter: ({ user }) => isAdmin(user?.member_of),
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
        filter: ({ user }) => isAdmin(user?.member_of),
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


                                      import { putInfosUserRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import { useOidcUser } from "../useOidc";
import { FC, useEffect, useState } from "react";
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

  useEffect(() => {
    (async () => {
      try {
      const response=await call({ email, userNumber: axa_uid_racf, name, axaUiRdu: axa_uid_rdu, axaType: axa_type });
      if (response?.authorities) {
        (oidcUser as any).member_of = response.authorities;
      }
        setUserAllowed(true);
      } catch (error) {
        console.error("Error while sending user infos to Maam", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, axa_uid_racf, name, axa_type]);
  return (
    <>
      {loaded ? (
        userAllowed ? (
          children
        ) : (
          <div className="bigCenteredMessage">Vous n'avez pas accès à Ellipse, veuillez contacter votre administrateur.</div>
        )
      ) : (
        <div className="bigCenteredMessage">Chargement de Ellipse en cours</div>
      )}
    </>
  );
};

export default SendUserInfos;  je veux  donner a filter une info pour dire si cest admin ou non etque soit info global   car avec  lexistant des fois ca marche pâs et lorsque je refrch ca perd linfo

