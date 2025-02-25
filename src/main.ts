import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import Table, {Paging} from "@axa-fr/react-toolkit-table";
import ErrorMessage from "models/errorMessage";
import errorIcon from "assets/svg/error.svg";
import {compose} from "recompose";
import {withAuthentication} from "@axa-fr/react-oidc-context-fetch/dist";
import Title from "@axa-fr/react-toolkit-title";
import SlidingPane from "../sliding-pane/sliding-pane";
import {Link, RouteComponentProps} from "react-router-dom";
import './admin.scss';
import {projectsReducer} from "./projects.reducer";
import ProjectService from "api/project.service";
import SearchProject from "models/searchProject";
import RequestPage from "models/requestPage";
import queryString from "querystring";
import DeleteProject from "./delete-project";
import WorkspaceService from "api/workspace.service";
import ProjectDetails from "models/ProjectDetails";
// @ts-ignore
import {BooleanModal} from "@axa-fr/react-toolkit-all";
import Button from "@axa-fr/react-toolkit-button";
import UserInfo from "models/userInfo";

export type IFetch = {
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}
type Props = {
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
    usr: UserInfo;
}

type Page = {
    numberItems: number,
    page: number
}

type Params = {
    id: string
}

const ProjectsConfiguration: FunctionComponent<RouteComponentProps<Params> & Props> = ({
                                                                                           match,
                                                                                           location,
                                                                                           fetch,
                                                                                            usr
                                                                                       }) => {

    const [errorMessage, setErrorMessage] = useState(new ErrorMessage(false, "", "", errorIcon));


    const pageParam = new RequestPage(0, 10, "name", "asc");
    const workspaceId = +match.params.id;
    const searchProjectParams = new SearchProject("", workspaceId,"", pageParam, true);
    const searchGlobal = location.search ? SearchProject.fromJSON(queryString.parse(location.search.slice(1))) : searchProjectParams;


    const [state, dispatch] = useReducer(projectsReducer, {
        name: "",
        idUser: 0,
        projectList: [],
        isPaneOpen: false,
        currentPage: 1,
        totalResults: 0,
        search: searchGlobal,
        idProject: 0,
        labelWorkspace: "",
        providedName: "",
        deleteErrorMessage: "",
        selectedProjectName : ""
    });
    const {
        name,
        idUser,
        projectList,
        isPaneOpen,
        currentPage,
        totalResults,
        idProject,
        labelWorkspace,
        providedName,
        deleteErrorMessage,
        selectedProjectName
    } = state;
    useEffect(() => {
        let isCancelled = false;

        // get workspaces:


        WorkspaceService.getWorkspaces(idUser, typeof (fetch) === 'undefined' ? window.fetch : fetch).then(res => {
            res.forEach(e => {
                if (e.id == workspaceId) {

                    dispatch({
                        type: "ON_SHOW_LABEL",
                        labelWorkspace: e.name
                    });
                }
            });
        });


        searchProjects(searchGlobal);
        return () => {
            isCancelled = true;
        };

    }, [workspaceId, location.search]);

    const searchProjects = (searchParam: SearchProject) => {
        
        ProjectService.searchProject(typeof (fetch) === 'undefined' ? window.fetch : fetch, searchParam, usr.id).then(projects => {
            dispatch({
                type: "ON_LOAD_PROJECTS",
                projectList: projects.elementDTOs,
                totalResults: projects.numberElement,
                currentPage: searchParam.requestPage.page + 1,
                isPaneOpen: false
            });
            return projects;
        }).catch(error => {
            let message = JSON.parse(error.message);
            setErrorMessage(new ErrorMessage(true, message.message.substring(0, 300) + "...", "Détail des utilisateurs", errorIcon));
            dispatch({
                type: "ON_LOAD_PROJECTS",
                projectList: [],
                totalResults: 0,
                currentPage: searchParam.requestPage.page + 1,
                isPaneOpen: false
            });
        });


    }


    const deleteProject = (idProject: number) => {
        ProjectService.deleteProject(typeof (fetch) === 'undefined' ? window.fetch : fetch, idProject).then(projects => {
            let projectListUpdated = state.projectList.filter((project: ProjectDetails) => {
                return project.id !== idProject;
            })
        
            dispatch({
                type: "ON_LOAD_PROJECTS",
                projectList: projectListUpdated,
                totalResults: state.totalResults - 1,
                currentPage: projectListUpdated.length == 0 && state.currentPage > 1 ? state.currentPage - 1 : state.currentPage,
                isPaneOpen: false
            });

            const searchProjectParams = new SearchProject(state.name, workspaceId,"", pageParam, true);
            searchProjects(searchProjectParams);
            
        });
    }
    const onChangePaging = (e: Page) => {

        const requestPage = state.search.requestPage;
        requestPage.page = e.page - 1;
        if (requestPage.size != e.numberItems) {
            requestPage.page = 0;
        }
        requestPage.size = e.numberItems;
        const searchParam: SearchProject = new SearchProject(state.search.projectName, state.search.workspaceId,"" , requestPage, true);
        console.log(state.search,"stateee")

        dispatch({
                type: "ON_CHANGE_PAGE",
                search: searchParam
            }
        );
        searchProjects(searchParam);
    };
    const closePane = () => {
        dispatch({
            type: "ON_DISPLAY_DETAIL",
            isPaneOpen: false,
            providedName: "",
            selectedProjectName:"",
            deleteErrorMessage: ""
        });
    }
    const submit = () => {
        if (providedName.toLowerCase() == selectedProjectName.toLowerCase()) {
            deleteProject(idProject);

            dispatch({
                type: "ON_DISPLAY_DETAIL",
                isPaneOpen: false,
                providedName: "",
                selectedProjectName:"",
                deleteErrorMessage: ""
            });
        } else {
            dispatch({
                type: "ON_DISPLAY_DETAIL",
                isPaneOpen: true,
                providedName: "",
                selectedProjectName:selectedProjectName,
                deleteErrorMessage: "Le nom du projet que vous avez écrit dans le champ texte ne correspond pas au projet sélectionné. Veuillez écrire textuellement le nom du projet que vous souhaitez supprimer."
            });
        }

    }
    const handleSearchText = (input: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === 'Enter') {
            manageSearchText(input)
        }
    };

    const manageSearchText = (input:string):void => {
        if (input === "name") {
            const searchProjectParams = new SearchProject(state.name, workspaceId,"", pageParam, true);
            searchProjects(searchProjectParams);
        }
    }
    const onSort = () => {
        const newSearch = state.search;
        newSearch.requestPage.sortOrder == "desc" ? newSearch.requestPage.sortOrder = "asc" : newSearch.requestPage.sortOrder = "desc";
        dispatch({
            type: "ON_CHANGE_PAGE",
            search: newSearch
        });
        searchProjects(newSearch);
    }

    const onChangeSearchText = (projectName: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        console.log('ONCHANGESEARCHTEXT');
        dispatch({type: "ON_CHANGE_SEARCH_TEXT_NAME", name: term});
    };
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('ONCHANGETEXT');
        const term = e.target.value;

        dispatch({type: "ON_CHANGE_TEXT", providedName: term});


    }
    return (
        <div className="af-home container" >



            <BooleanModal isOpen={isPaneOpen} id={"booleanMODAL"}
                          title={"Supprimer le projet"}
                          onCancel={closePane}
                          onSubmit={submit}
                          submitTitle={"supprimer"}
                          buttonClassName={"af-btn--danger"}
            >


                <div
                    style={{color: "red"}}>{deleteErrorMessage.toString()}</div>


                <p>Etes-vous sûr de vouloir supprimer le projet :{selectedProjectName} </p>
                <div className={"col-md-12"}>
                    <p>Ecrire le nom du projet pour confirmer la
                        suppression <span style={{color: "red"}}>*</span></p>
                </div>
                <div className={"col-md-10"}>
                    <input className="af-form__input-text" name="inputtextname"
                           type="text" value={providedName}
                           onChange={(e) => onChangeText(e)}/>
                </div>


            </BooleanModal>


            <div style={{marginBottom: "&rem"}}>
                <Title>Projets du workspace {labelWorkspace}</Title>
            </div>


            <div className={"container"}>

                <div className={"row"}>
                    <div className={"col-md-1"}></div>

                    <div className={"col-md-10"}>
                        <div className={"row"}>

                            <Link role="button"
                                  className="btn af-btn af-btn--reverse af-btn--hasiconLeft"
                                  style={{marginLeft: "auto", marginBottom: "10px"}}
                                  to={{
                                      pathname: `/projectCreation/${workspaceId}/0`
                                  }}>
                                <span className="af-link__text af-btn__text">Créer un nouveau projet</span>
                                <i className="glyphicon glyphicon-plus"></i>
                            </Link>


                    <Table className="af-table one">
                        <Table.Header>
                            <Table.Tr>
                                <Table.Th classModifier="sortable">

                            <span className="af-table__th-content">
                    <Button className="af-btn" classModifier="table-sorting"
                            onClick={() => {
                                onSort();
                            }}
                    >
                      <span className="af-btn__text">Nom du projet</span>
                      <i
                          className={
                              "glyphicon " +
                              (`glyphicon-sorting-${state.search.requestPage.sortOrder}`)
                          }
                      />
                    </Button>
                  </span>

                                </Table.Th>
                                <Table.Th> </Table.Th>
                                <Table.Th>
                  <span className="af-table__th-content">
                   Actions
                  </span>
                                </Table.Th>

                            </Table.Tr>
                        </Table.Header>
                        <Table.Body>
                            <Table.Tr className="af-table-head">
                                <Table.Td>
                                    <div className="inner-addon right-addon one ">
                                        <button className="glyphicon glyphicon-search one btn-icon" onClick={() => manageSearchText("name")}/>
                                        <input type="text"
                                               className="form-control one"
                                               placeholder="" value={name}

                                               onKeyDown={(e) => handleSearchText('name', e)}
                                               onChange={(e) => onChangeSearchText('name', e)}

                                        />
                                    </div>
                                </Table.Td>
                                <Table.Td></Table.Td>
                                <Table.Td>

                                </Table.Td>
                            </Table.Tr>
                            {
                                projectList.map(project => (
                                        <Table.Tr key={project.id}>
                                            <Table.Td>{project.projectName}</Table.Td>
                                            <Table.Td></Table.Td>
                                            <Table.Td>
<div className="row">
                                                <Link
                                                    to={{
                                                        pathname: `/projectCreation/${workspaceId}/${project.id}`
                                                    }}>
                                                    <span className={"af-btn--circle"}>
                                                        <i className="glyphicon glyphicon-cog"/>
                                                    </span>
                                                </Link>


                                                <a className="af-btn--circle"
                                                   title="Delete" role="button"
                                                   onClick={() => {
                                                       dispatch({
                                                           type: "ON_DISPLAY_DELETE",
                                                           idProject: project.id,
                                                           selectedProjectName: project.projectName,
                                                           isPaneOpen: true
                                                       })
                                                   }}
                                                >
                                                    <i className="glyphicon glyphicon-trash"/>
                                                </a>
</div>
                                            </Table.Td>

                                        </Table.Tr>
                                    )
                                )}
                        </Table.Body>

                    </Table>
                        </div>
                    </div>
                    <div className={"col-md-1"}></div>


                </div>
            </div>
            <Paging
                onChange={(e: any) => onChangePaging(e)}
                numberItems={state.search.requestPage.size}
                numberPages={Math.ceil(totalResults / state.search.requestPage.size)}
                currentPage={currentPage}
            />

            <SlidingPane
                className="some-custom-class"
                overlayClassName="none"
                isOpen={false}
                title="Supprimer le project"
                subtitle="Etes vous sûr de vouloir supprimer ce projet?"

                onRequestClose={() => {
                    dispatch({
                        type: "ON_DISPLAY_DELETE",
                        idProject: 0,
                        selectedProjectName: '',
                        isPaneOpen: false
                    })
                }}
            >

                <dl className="information-list">
                    <DeleteProject idProject={state.idProject}
                                   isPaneOpen={isPaneOpen}
                                   deleteProject={deleteProject}
                                   closePane={closePane} projectName={name}
                    />
                </dl>

            </SlidingPane>

        </div>


    );

}


const enhanceAuth = compose<RouteComponentProps<Params> & Props, RouteComponentProps<Params> & Props>(
    withAuthentication(fetch)
);

const ProjectsEnhance = enhanceAuth(ProjectsConfiguration);

export default ProjectsEnhance;
 dans ce code  lorsque je change  afiichager par lot dans cette fonction :    const onChangePaging = (e: Page) => {

        const requestPage = state.search.requestPage;
        requestPage.page = e.page - 1;
        if (requestPage.size != e.numberItems) {
            requestPage.page = 0;
        }
        requestPage.size = e.numberItems;
        const searchParam: SearchProject = new SearchProject(state.search.projectName, state.search.workspaceId,"" , requestPage, true);
        console.log(state.search,"stateee")

        dispatch({
                type: "ON_CHANGE_PAGE",
                search: searchParam
            }
        );
        searchProjects(searchParam);
    }; je vois que il prend pas en consideration workspaceId  en cours car il prend le precendent workspaceId
