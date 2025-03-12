import React, {FunctionComponent, useEffect, useState} from 'react';
// @ts-ignore
import {NavBar, NavBarItem, Title} from '@axa-fr/react-toolkit-layout-header';
// @ts-ignore
import './nav-bar.scss';
import UserInfo from "models/userInfo";
import { useLocation } from 'react-router-dom';
import UserService, {AuthoritiesEnum} from "api/user.service";
import { Link } from 'react-router-dom';

interface Usr {
    usr: UserInfo,
    title: string,
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}

const NavBarApp: FunctionComponent<Usr> = (usr) => {
    const location = useLocation();
    const [visible, setVisible] = useState<boolean>(false);
    const [itemPosition, setItemPosition] = useState<number | null | undefined>(0);
    const handleClickItem = (position: number) => {
        setItemPosition(position);
    };
    const handleClick  = () => {
        const { body } = document;
        body.classList.toggle('af-menu-open');
        const visibleTmp = !visible
        setVisible(visibleTmp);

    }
    useEffect(() => {
        const path: string = location.pathname;
        const pathsConfiguration = ["/users","/notifications", "/projects", "UserManagement","projectCreation", "/workspaces"];
        if(path && (pathsConfiguration.some(v => path.includes(v)))){
         setItemPosition(1);
        }

    }, [itemPosition]);
    return (
        <>
            <NavBar isVisible={false} positionInit={itemPosition} onClick={handleClick}>
                <NavBarItem
                    key="doc-1"
                    arial-label="menuItem1"
                    actionElt={<Link className="af-nav__link"  to={"/"} onClick={() => handleClickItem(0)}> Gestion des flux</Link>}
                    classModifier={itemPosition === 0 ? 'active' : ''}
                />

                {UserService.hasPrivilege(usr.usr.authorityList, AuthoritiesEnum.ADMINISTRATEUR) ? (
                    <NavBarItem
                        key="doc-2"
                        arial-label="menuItem2"

                        actionElt={<span className="af-nav__link">Configuration</span>}
                        classModifier={itemPosition === 1 ? 'active' : ''}
                    >
                        {UserService.hasPrivilege(usr.usr.authorityList, AuthoritiesEnum.ADMINISTRATEUR) ? (
                        <NavBarItem
                            key="table-1"
                            actionElt={
                                <Link className="af-nav__link two"
                                to={"/workspaces"} onClick={() => handleClickItem(1)}>
                                    Workspaces
                                </Link>
                            }
                        />

                        ) : (
                            <></>
                        )}

                        {UserService.hasPrivilege(usr.usr.authorityList, AuthoritiesEnum.ADMINISTRATEUR) ? (
                            <NavBarItem
                                key="table-1"
                                actionElt={
                                    <Link className="af-nav__link two"
                                          to={"/flux-duration"} onClick={() => handleClickItem(1)}>
                                        Configuration des durées maximales
                                    </Link>
                                }
                            />
                        ) : (
                            <></>
                        )}


                        {UserService.hasPrivilege(usr.usr.authorityList, AuthoritiesEnum.ADMINISTRATEUR) ? (
                            <NavBarItem
                                key="table-2"
                                actionElt={
                                    <Link to={"/projects"} className="af-nav__link two" onClick={() => handleClickItem(1)}>
                                        Projets
                                    </Link>
                                }
                                classModifier={itemPosition === 1 ? 'active' : ''}
                            />
                        ) : (
                            <></>
                        )}

                        {(UserService.hasPrivilege(usr.usr.authorityList, AuthoritiesEnum.ADMINISTRATEUR)
                        ) ? (
                            <NavBarItem
                                key="table-1"
                                actionElt={
                                <Link className="af-nav__link two"
                                    to={"/users"} onClick={() => handleClickItem(1)}>
                                    Utilisateurs
                                </Link>
                        }
                                classModifier={itemPosition === 1 ? 'active' : ''}

                            />
                        ) : (
                            <></>
                        )}
                    </NavBarItem>


                ) : null}

            </NavBar>
            <Title title={usr.title} toggleMenu={handleClick} />
        </>


    )
}

export default NavBarApp; je pense ilya 2 tcheck sur le profile administratuer
