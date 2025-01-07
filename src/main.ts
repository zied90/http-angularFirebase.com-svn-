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

import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "consolePfel",
    element: <Layout />,
    children: [
      {
        path: "logs/list",
        element: <LogsList />,
      },
      {
        path: "pfel/list",
        element: <ApplicationsList />,
      },
      {
        path: "lettre/list",
        element: <LettreList />,
      },
      {
        path: "product",
        children: [
          {
            path: "family/list",
            element: <ProductFamilyList />,
          },
          {
            path: "label/list",
            element: <ProductLabelList />,
          },
        ],
      },
      {
        path: "groupKey/list",
        element: <GroupeList />,
      },
      {
        path: "documentSettings",
        children: [
          {
            path: "list",
            element: <DocumentsList />,
          },
          {
            path: "setting/:id",
            element: <FormSetting />,
          },
        ],
      },
      {
        path: "subrogation/list",
        element: <SubrogationList />,
      },
      {
        path: "businessPerimeter/list",
        element: <PerimetreMetierList />,
      },
      {
        path: "prePrinted/list",
        element: <PrePrintedList />,
      },
      {
        path: "template/list",
        element: <TemplateList />,
      },
      {
        path: "*",
        element: <Navigate to="logs/list" replace />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="consolePfel/logs/list" replace />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
voci cette liste :ConsolePfel_Admin

ConsolePfel_AGS

ConsolePfel_Aspose

ConsolePfel_ATS

ConsolePfel_DIM

ConsolePfel_DSAT

ConsolePfel_FSQC

ConsolePfel_IARD

ConsolePfel_VIECOL

ConsolePfel_VIEIND
pour ConsolePfel_Admin il peux consullter tou kles route mais pour  les rest il peuxcvet consulter que les logs : <LogsList />,

  import { Link, useLocation, useParams } from "react-router-dom";
import { navLinks } from "@/constants/navLinks";
import { NavBar, NavBarItem } from "@axa-fr/react-toolkit-layout-header";
import { useEffect, useState } from "react";
import { useNavLinkInfo } from "@/hooks/navLink/useNavLinkInfo";
import "./NavBar.scss";

export const NavBarApp = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const { id } = useParams();
  const { position: positionNavLink } = useNavLinkInfo(pathName);
  const [activePosition, setActivePosition] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleNavClick = (position: number) => {
    setActivePosition(position);
    setIsMenuOpen(false);
  };
  useEffect(() => {
    setActivePosition(positionNavLink);
  }, [positionNavLink]);

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
      {navLinks.map((link, subIndex) => (
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
                  <Link
                    className="af-nav__link"
                    to={
                      subLink.href.includes(":id")
                        ? subLink.href.replace(":id", id ?? "")
                        : subLink.href
                    }
                  >
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

import { NavLink } from "@/types/navLinksType";
export const navLinks: NavLink[] = [
  {
    label: "Logs",
    href: "/consolePfel/logs/list",
    position: 0,
  },

  {
    label: "Configuration Spoolnet",
    href: "#",
    position: 1,
    subLinks: [
      {
        label: "Applications",
        href: "/consolePfel/pfel/list",
      },
      { label: "Courriers", href: "/consolePfel/lettre/list" },
      { label: "Produits", href: "/consolePfel/product/label/list" },
      { label: "Familles", href: "/consolePfel/product/family/list" },
      { label: "Groupes", href: "/consolePfel/groupKey/list" },
      { label: "Documents", href: "/consolePfel/documentSettings/list" },
      {
        label: "Paramétrage",
        href: "/consolePfel/documentSettings/setting/:id",
        hidden: true,
      },
     

      {
        label: "Périmètres Métiers",
        href: "/consolePfel/businessPerimeter/list",
      },
      { label: "Pré Imprimés", href: "/consolePfel/prePrinted/list" },
      { label: "Templates", href: "/consolePfel/template/list" },
    ],
  },
  { label: "Subrogation", href: "/consolePfel/subrogation/list", position: 2 },
];
import { navLinks } from "@/constants/navLinks";
import { useCallback, useEffect, useState } from "react";
import { NavLink, SubLink } from "@/types/navLinksType";
interface LinkInfo {
  label: string | null;
  position: number;
}export const useNavLinkInfo = (href: string): LinkInfo => {
  const [linkInfo, setLinkInfo] = useState<LinkInfo>({
    label: null,
    position: 0,
  });
  const findLinkInfo = useCallback(
    (hrefToFind: string, links: Array<NavLink | SubLink>): LinkInfo => {
      for (const link of links) {
        if (link.href && hrefToFind.startsWith(link.href.replace(':id', ''))) {
          return {
            label: link.label,
            position: 'position' in link ? link.position : 0,
          };
        }
        if ('subLinks' in link && link.subLinks) {
          const subLinkInfo = findLinkInfo(hrefToFind, link.subLinks);
          if (subLinkInfo.label) {
            return {
              label: subLinkInfo.label,
              position: 'position' in link ? link.position : 0,
            };
          }
        }
      }
      return { label: null, position: 0 };
    },
    []
  );
  useEffect(() => {
    setLinkInfo(findLinkInfo(href, navLinks));
  }, [href, findLinkInfo]);
  return linkInfo;
 };


