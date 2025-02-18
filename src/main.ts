import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { isCurrent } from "@/Utils/NavigationUtils";
import { RouteItem } from "../RouteItem.type";
import "./NavigationList.scss";
import { useOidcUser } from "@/oidc/useOidc";


interface Props {
  className?: string;
  items: RouteItem[];
}

const NavigationList: FC<Props> = ({ className = "", items }) => {
  const location = useLocation();
  const { oidcUser } = useOidcUser();

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.target as HTMLAnchorElement;
    target.blur();
  };

  return (
    <div className={`af-navigation-list ${className}`}>
      <ul>
        {items
          .filter(({ inNavigation, filter }) => inNavigation && (!filter || filter({ user: oidcUser })))
          .map((route) => (
            <li
              tabIndex={-1}
              key={route.id}
              className={`
                ${isCurrent(route, location.pathname, items) ? "current" : ""}
                ${route.navigationClass ? route.navigationClass : ""}
              `}
            >
              <Link to={route.path || "/"} onClick={onLinkClick}>
                {route.icon ? <i className={`icon ${route.icon}`}></i> : null}
                {route.label}
              </Link>
              {route.children && <NavigationList items={route.children} />}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NavigationList;

import { FC } from "react";
import "./Navigation.scss";
import NavigationList from "./NavigationList";
import { RouteItem } from "./RouteItem.type";

interface Props {
  items: RouteItem[];
}

const Navigation: FC<Props> = ({ items }) => {
  //const basePath = currentPath.replace(/^(\/.*?)\/.*/, "$1");

  return (
    <div className="af-navigation container">
      <NavigationList items={items} />
    </div>
  );
};

export default Navigation;

export type RouteItem = {
  id: string;
  label: string | React.ReactElement;
  filter?: (params: any) => boolean;
  title?: string;
  description?: string;
  path?: string;
  index?: boolean;
  element?: React.ReactElement;
  inNavigation: boolean;
  children?: RouteItem[];
  parent?: string;
  navigationClass?: string;
  icon?: string;
};

import { FC, useEffect, useMemo } from "react";
import "./AppContent.scss";
import { useRoutes, RouteObject } from "react-router";
import { getRoutesList, setAppTitleFromLocation } from "@/config/Routes";
import { useLocation } from "react-router-dom";
import { useOidcUser } from "@/oidc/useOidc";

interface Props {}

const AppContent: FC<Props> = () => {
  const { oidcUser } = useOidcUser();
  const routes: RouteObject[] = useMemo(
    () =>
      getRoutesList()
        .filter(({ filter }) => !filter || filter({ user: oidcUser }))
        .map(({ id, path, element }) => ({
          path,
          element,
        })),
    [oidcUser]
  );

  const routesElements = useRoutes(routes);

  let location = useLocation();
  useEffect(() => {
    setAppTitleFromLocation(location.pathname, "Ellipse - {pageTitle}");
  }, [location]);
  return <div className="AppContent container">{routesElements}</div>;
};

export default AppContent;

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
/*     filter: ({ isAdmin }) => {
      return isAdmin;
    }, */
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
      /*   filter: ({ isAdmin }) => {
          return isAdmin;
        }, */
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
    /*     filter: ({ isAdmin }) => {
          return isAdmin;
        }, */
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
  /*           filter: ({ isAdmin }) => {
      return isAdmin;
    }, */
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
import App from "./App";
import CacheProvider from "./context/CacheProvider";
import DocumentManagerProvider from "./context/documentManager/DocumentManagerProvider";
import { useChainProviders } from "react-flat-providers";
import { BrowserRouter } from "react-router-dom";
import GlobalAlertProvider from "./toolkit/Components/GlobalAlert/GlobalAlertContext";
import AgencesProvider from "./context/AgencesProvider";
import FiltersProvider from "./context/FiltersProvider";
import Oidc from "./oidc/Oidc";
import SignatureProvider from "./context/SignatureProvider";

/** provide all the providers and flatten them. */
const AppWithProviders = () => {
  const FlatChainedProviders = useChainProviders()
    .add(GlobalAlertProvider)
    .add(CacheProvider)
    .add(Oidc)
    .add(DocumentManagerProvider)
    .add(AgencesProvider)
    .add(SignatureProvider)

    .make();
  return (
    <FlatChainedProviders>
      <BrowserRouter>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </BrowserRouter>
    </FlatChainedProviders>
  );
};

export default AppWithProviders;

/* c8< ignore file */

import ReactDOM from "react-dom/client";
import AppWithProviders from "./Providers";
import "./Utils/polyfills";

if (import.meta.env.VITE_LOCAL_ENV === "true" && !import.meta.env.VITE_API_URL && import.meta.env.MODE === "development") {
  console.log("Local dev Env with Mock active");
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}

if (!navigator.locks) {
  await import("navigator.locks");
}
if (window.crypto && !window.crypto.subtle) {
  await import("./Utils/polyfills/window.crypto.subtle");
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<AppWithProviders />);


import { createContext, FC, useEffect, useState } from "react";
import { FilterCategory } from "@/types/FilterCategory.type";
import { ListOfFilters } from "./FiltersProviderList";
import Filter from "@/types/Filter.type";
import { useLocation, useSearchParams } from "react-router-dom";
import { getRouteItemFromLocation } from "@/config/Routes";

import { useOidcUser } from "@/oidc/useOidc";
import { EventCallback, useEvent } from "@/hooks/useEvent";
import { removeDiacritics } from "@/Utils/StringUtils";
import { addOrRemoveBooleanFilterInSearchParams } from "./FiltersProvidersUtils";

export type FiltersContextType = {
  searchParams: URLSearchParams;
  getFilters: () => FilterCategory[];
  updateFilterCategory: (id: string, options: any) => void;
  isFilterSelected: (filterCategoryId: string, filterId: number | string) => boolean;
  getFilterValue: (filterCategoryId: string, filterId: string | number) => string | null;
  onFilterChange: (filterCategoryId: string, filterId: string, filterValue: string | boolean | null) => void;
  resetFilters: () => void;
  registerEvent: (callback: EventCallback) => void;
  clearEvent: (callback: EventCallback) => void;
  getFiltersParams: () => Record<string, string[]>;
  isTextFiltered: (filterCategory: FilterCategory, filterId: string | number) => boolean;
  isFilterCategorySelected: (filterCategoryId: string) => boolean;
};

//create a context, with createContext api
export const FiltersContext = createContext<FiltersContextType>({} as any);

type Props = {
  children?: React.ReactNode;
};

const FiltersProvider: FC<Props> = ({ children }) => {
  const location = useLocation();

  const [filters, setFilters] = useState<FilterCategory[]>(ListOfFilters);
  const [searchParams, setSearchParams] = useSearchParams();
  const { addListener, removeListener, trigger } = useEvent();
  const { oidcUser } = useOidcUser();

  const isFilterCategorySelected = (filterCategoryId: string): boolean => {
    const filterValues = searchParams.get(filterCategoryId);
    if (filterValues) return true;
    // check if a filter exist with a name with _ (date_field=10/10/2020)
    for (let key of searchParams.keys()) {
      if (key.includes(`${filterCategoryId}_`)) {
        const value = searchParams.get(key);
        if (value) return true;
      }
    }
    return false;
  };

  /**
   * Call only from a FilterCheckbox component and return true if the filter is selected
   * @param filterCategoryId
   * @param filterId
   * @returns
   */
  const isFilterSelected = (filterCategoryId: string, filterId: number | string): boolean => {
    const filterValues = searchParams.get(filterCategoryId);
    if (filterValues) {
      return filterValues.split(",").includes(filterId.toString());
    }
    return false;
  };

  /**
   * Return the value of the filter (usefull for date filter)
   */
  const getFilterValue = (filterCategoryId: string, filterId: string | number): string | null => {
    const filterValues = searchParams.get(`${filterCategoryId}_${filterId}`);
    if (filterValues) {
      return filterValues;
    }
    return "";
  };

  const isTextFiltered = (filterCategory: FilterCategory, filterId: string | number): boolean => {
    if (!filterCategory.hasTextFilter) return false;
    if (filterCategory.textFilter === "" || filterCategory.textFilter === null || filterCategory.textFilter === undefined) return false;
    const filterItem = filterCategory.values.find((value) => {
      return value.id.toString() === filterId.toString();
    });
    if (!filterItem) return false;

    if (removeDiacritics(filterItem.name.toLowerCase()).includes(removeDiacritics(filterCategory.textFilter.toLowerCase()))) return false;
    return true;
  };

  /**
   * Update searchParams when filter change
   */
  const onFilterChange = (filterCategoryId: string, filterId: string, filterValue: string | boolean | null) => {
    const filterCategory = getFilterCategoryById(filterCategoryId);
    if (!filterCategory) {
      throw new Error(`FilterCategory with id ${filterCategoryId} not found`);
    }

    switch (filterCategory.type) {
      case "checkbox":
        onFilterChangeCheckbox(filterCategoryId, filterId, filterValue as boolean);
        break;
      case "date":
        onFilterChangeInput(filterCategoryId, filterId, filterValue as string);
        break;
    }
    trigger("filterChange", searchParams);
  };

  const onFilterChangeCheckbox = (filterCategoryId: string, filterId: string, newState: boolean) => {
    addOrRemoveBooleanFilterInSearchParams(filterId, searchParams, filterCategoryId, newState);
    setSearchParams(searchParams);
  };

  const onFilterChangeInput = (filterCategoryId: string, filterId: string, filterValue: string) => {
    searchParams.set(`${filterCategoryId}_${filterId}`, filterValue);
    setSearchParams(searchParams);
  };

  const updateFilterCategory = (id: string, options: any) => {
    const newFilters = updateFilterCategoryFunc(id, options);
    setFilters(newFilters);
  };

  /**
   *
   * @param filterCategoryId
   * @returns
   */
  const getFilterCategoryById = (filterCategoryId: string): FilterCategory | undefined => {
    return getFilters().find((filter) => filter.id.toString() === filterCategoryId.toString());
  };

  const resetFilters = () => {
    getFilters().forEach((filterCategory) => {
      switch (filterCategory.type) {
        case "checkbox":
          searchParams.delete(filterCategory.id);
          break;
        case "date":
          filterCategory.values.forEach((value) => {
            searchParams.delete(`${filterCategory.id}_${value.id}`);
          });
          break;
      }
    });
    setSearchParams(searchParams);
  };

  const getFilters = (): FilterCategory[] => {
    const routeItem = getRouteItemFromLocation(document.location.pathname || "");

    const tmpFilters = filters.filter((filter) =>
      filter.canDisplay({
        routeItem,
        user: oidcUser,
      })
    );
    tmpFilters.forEach(initializeFilterCategory);
    return tmpFilters;
  };

  const updateFilterCategoryFunc = (id: string, options: any) => {
    return ListOfFilters.map((filter) => {
      if (filter.id === id) {
        for (let key in options) {
          switch (key) {
            case "values":
              let values = options[key];
              if (filter.sort) {
                values = values.sort((a: Filter, b: Filter) => {
                  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                  else return 0;
                });
              }
              filter.values = values;
              break;
            default:
              // @ts-ignore
              filter[key] = options[key];
              break;
          }
        }
        initializeFilterCategory(filter);
      }
      return filter;
    });
  };

  const getFiltersParams = (): Record<string, string[]> => {
    const filters = getFilters();
    const filterValues = filters.reduce((acc: any, filter) => {
      switch (filter.type) {
        case "checkbox":
          const searchParamsValues = searchParams.get(filter.id);
          if (searchParamsValues) {
            acc[filter.id] = searchParamsValues.split(",");
          }
          break;
        case "date":
          filter.values.forEach((value) => {
            const searchParamsValue = searchParams.get(`${filter.id}_${value.id}`);
            if (searchParamsValue) {
              acc[`${filter.id}_${value.id}`] = [searchParamsValue];
            }
          });
          break;
      }
      return acc;
    }, {} as Record<string, string[]>);
    return filterValues;
  };

  const registerEvent = (callback: EventCallback) => {
    addListener("filterChange", callback);
  };

  const clearEvent = (callback: EventCallback) => {
    removeListener("filterChange", callback);
  };

  useEffect(() => {
    filters.forEach((filter) => {
      filter.textFilter = "";
    });
    setFilters(filters);
  }, [location]);

  return (
    <FiltersContext.Provider
      value={{
        searchParams,
        isFilterCategorySelected,
        isTextFiltered,
        getFilters,
        updateFilterCategory,
        isFilterSelected,
        getFilterValue,
        onFilterChange,
        resetFilters,
        registerEvent,
        clearEvent,
        getFiltersParams,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

/**
 * Initializes a filter category by setting the category ID on each of its values.
 * @param filterCategory - The filter category to initialize.
 */
const initializeFilterCategory = (filterCategory: FilterCategory) => {
  if (filterCategory.initialized) return;
  if (filterCategory.values.length) {
    filterCategory.values.forEach((value) => {
      setCategoryIdOnFilter(value, filterCategory.id);
    });
    filterCategory.initialized = true;
  }
};

/**
 * Sets the filterCategoryId property on the given filter and its subfilters recursively.
 * @param filter - The filter to set the filterCategoryId on.
 * @param filterCategoryId - The ID of the category to set on the filter.
 */
const setCategoryIdOnFilter = (filter: Filter, filterCategoryId: string) => {
  filter.filterCategoryId = filterCategoryId;
  if (filter.subFilters?.length) {
    filter.subFilters.forEach((subFilter) => {
      setCategoryIdOnFilter(subFilter, filterCategoryId);
    });
  }
};

export default FiltersProvider;

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


import { putInfosUserRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import { useOidcUser } from "../useOidc";
import { FC, useEffect, useState } from "react";
import "./SendUserInfos.scss";
import { useAdmin } from "@/services/AdminContext";

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
      const response=await call({ email, userNumber: axa_uid_racf, name, axaUiRdu: axa_uid_rdu, axaType: axa_type });
      if (response?.authorities) {
       // (oidcUser as any).member_of = response.authorities;
        setIsAdmin(response.authorities.includes('ADMIN'));
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

export default SendUserInfos;
comment faire  pour ne pas ni affciher admin dans le navigation et je  aussi de ne pas acceder a admin et les cheldrin si ne pas admin
