import React, { FunctionComponent, useEffect, useState } from "react";
// @ts-ignore
import { NavBar, NavBarItem, Title } from "@axa-fr/react-toolkit-layout-header";
// @ts-ignore
import "./nav-bar.scss";
import UserInfo from "models/userInfo";
import { useLocation } from "react-router-dom";
import UserService, { AuthoritiesEnum } from "api/user.service";
import { Link } from "react-router-dom";

interface Usr {
  usr: UserInfo;
  title: string;
  fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const NavBarApp: FunctionComponent<Usr> = (usr) => {
  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(false);
  const [itemPosition, setItemPosition] = useState<number | null | undefined>(
    0
  );
  const handleClickItem = (position: number) => {
    setItemPosition(position);
  };
  const handleClick = () => {
    const { body } = document;
    body.classList.toggle("af-menu-open");
    const visibleTmp = !visible;
    setVisible(visibleTmp);
  };
  useEffect(() => {
    const path: string = location.pathname;
    const pathsConfiguration = [
      "/users",
      "/notifications",
      "/projects",
      "UserManagement",
      "projectCreation",
      "/workspaces",
    ];
    if (path && pathsConfiguration.some((v) => path.includes(v))) {
      setItemPosition(1);
    }
  }, [itemPosition]);
  return (
    <>
      <NavBar
        isVisible={false}
        positionInit={itemPosition}
        onClick={handleClick}
      >
        <NavBarItem
          key="flux"
          arial-label="menuItem1"
          actionElt={
            <Link
              className="af-nav__link"
              to={"/"}
              onClick={() => handleClickItem(0)}
            >
              {" "}
              Gestion des flux
            </Link>
          }
          classModifier={itemPosition === 0 ? "active" : ""}
        />

        {UserService.hasPrivilege(
          usr.usr.authorityList,
          AuthoritiesEnum.ADMINISTRATEUR
        ) ? (
          <NavBarItem
            key="configuration"
            arial-label="menuItem2"
            actionElt={<span className="af-nav__link">Configuration</span>}
            classModifier={itemPosition === 1 ? "active" : ""}
          >
            <NavBarItem
              key="workspaces"
              actionElt={
                <Link
                  className="af-nav__link two"
                  to={"/workspaces"}
                  onClick={() => handleClickItem(1)}
                >
                  Workspaces
                </Link>
              }
            />
            <NavBarItem
              key="flux-durationqqqq"
              actionElt={
                <Link
                  className="af-nav__link two"
                  to={"/flux-duration"}
                  onClick={() => handleClickItem(1)}
                >
                  Configuration des durées maximales
                </Link>
              }
            />
            <NavBarItem
              key="projects"
              actionElt={
                <Link
                  to={"/projects"}
                  className="af-nav__link two"
                  onClick={() => handleClickItem(1)}
                >
                  Projets
                </Link>
              }
              classModifier={itemPosition === 1 ? "active" : ""}
            />
            <NavBarItem
              key="users"
              actionElt={
                <Link
                  className="af-nav__link two"
                  to={"/users"}
                  onClick={() => handleClickItem(1)}
                >
                  Utilisateurs
                </Link>
              }
              classModifier={itemPosition === 1 ? "active" : ""}
            />
          </NavBarItem>
        ) : null}
      </NavBar>
      <Title title={usr.title} toggleMenu={handleClick} />
    </>
  );
};

export default NavBarApp;
pl que lorsque je charge au debu la  paque que sur la page /flux-duration  jai cette erreur pas pour lres autre page flux-duration.tsx:163  Warning: Each child in a list should have a unique "key" prop.

Check the render method of `FluxDuration`. See https://fb.me/react-warning-keys for more information.
    in Hoc (at flux-duration.tsx:175)
    in FluxDuration (created by withProps(FluxDuration))
    in withProps(FluxDuration)
    in Unknown (created by withProps(Component))
    in withProps(Component) (created by withProps(withProps(Component)))
    in withProps(withProps(Component)) (created by withProps(withProps(withProps(Component))))
    in withProps(withProps(withProps(Component))) (created by withOidcUser(withProps(withProps(withProps(Component)))))
    in withOidcUser(withProps(withProps(withProps(Component)))) (at flux-duration-page.tsx:18)
    in div (at flux-duration-page.tsx:17)
    in FluxDurationPage (at home.tsx:75)
    in Route (at home.tsx:74)
    in Switch (at home.tsx:44)
    in Router (created by BrowserRouter)
    in BrowserRouter (at home.tsx:41)
    in div (created by Loader)
    in Loader (at user.provider.tsx:47)
    in UserContextProvider (created by withProps(UserContextProvider))
    in withProps(UserContextProvider)
    in Unknown (created by withProps(Component))
    in withProps(Component) (created by withProps(withProps(Component)))
    in withProps(withProps(Component)) (created by withProps(withProps(withProps(Component))))
    in withProps(withProps(withProps(Component))) (created by withOidcUser(withProps(withProps(withProps(Component)))))
    in withOidcUser(withProps(withProps(withProps(Component)))) (at home.tsx:33)
    in Home (at environment.provider.tsx:14)
    in Unknown
    in Unknown
    in Unknown
    in Unknown
    in Unknown
    in Unknown (at app.tsx:28)
    in div (created by Loader)
    in Loader (at environment.provider.tsx:36)
    in EnvironmentProvider (at app.tsx:27)
    in OidcRoutes
    in OidcRoutes
    in Unknown
    in Unknown (created by AuthenticationProvider)
    in AuthenticationProvider (at app.tsx:21)
    in App (at src/index.tsx:10)
