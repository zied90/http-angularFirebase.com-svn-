import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Title from "@axa-fr/react-toolkit-title";
// @ts-ignore
import {BooleanModal} from "@axa-fr/react-toolkit-all";
// @ts-ignore
import Loader from "@axa-fr/react-toolkit-loader";
import Button from "@axa-fr/react-toolkit-button";
import Table, {Paging} from "@axa-fr/react-toolkit-table";
import SearchDocuments from "models/searchDocuments";
import RequestPage from "models/requestPage";
import requestPage from "models/requestPage";
import DocumentService from "api/document.service";
import SlidingPane from "components/sliding-pane/sliding-pane";
import DocumentDetail from "components/document-detail/document-detail";
import {documentsReducer} from "./documents.reducer";
// @ts-ignore
import {withAuthentication} from '@axa-fr/react-oidc-context-fetch';
import {compose} from "recompose";
import './documents.scss';
import * as queryString from "querystring";
import ErrorMessage from "models/errorMessage";
import errorIcon from "assets/svg/error.svg";
import Toast from "components/toast";
import {SUBMIT, VALIDATE} from "../../api/actions-constant";
import ValidationAction from "../validation-action";
import SearchParams from "models/searchParams";
import { areAllValuesValid, buildSearchParams} from "utils/queryString";



interface Page {
    numberItems: number,
    page: number
}

interface Props {
    fluxId: string,
    documentName?: string,
    searchParams?:SearchParams
    requestPage?: requestPage,
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
}

const Documents: FunctionComponent<Props> = ({fluxId, documentName, requestPage, fetch, searchParams}) => {
    const pageParam = typeof (requestPage) !== "undefined" &&areAllValuesValid(requestPage) ? new RequestPage(requestPage.page, requestPage.size, requestPage.sortField, requestPage.sortOrder) : new RequestPage(0, 10, "", "desc");
    const searchParmsDoc = typeof (searchParams) !== "undefined" ? new SearchParams(searchParams.type, searchParams.name, searchParams.fluxStatus, searchParams.fluxSubmit, searchParams.receptionDate)  : new SearchParams("", "","","","");
    const searchDocument = new SearchDocuments(typeof (documentName) !== "undefined" ? documentName : "", pageParam,searchParmsDoc );
    const history = useHistory();
    const searchString = queryString.stringify(searchDocument.objToJSON());

    const [state, dispatch] = useReducer(documentsReducer, {
        idDocument: 0,
        name: "",
        fluxName: "",
        role: "",
        fluxSubmit: "",
        fluxStatus: "",
        workspaceId: 0,
        documentList: [],
        totalResults: 0,
        currentPage: 1,
        isPaneOpen: false,
        isModalPrint: false,
        isModalSave: false,
        loaderMode: "get"
    });

    const {
        idDocument,
        name,
        documentList,
        totalResults,
        currentPage,
        isPaneOpen,
        fluxName,
        fluxStatus,
        fluxSubmit,
        role,
        workspaceId,
        isModalPrint,
        isModalSave,
        loaderMode
    } = state;
    const [errorMessage, setErrorMessage] = useState(new ErrorMessage(false, "", "", errorIcon))


    useEffect(() => {
            let isCancelled = false;
            if (!isCancelled)
                getDocumentsByFlux(searchDocument);
            return () => {
                isCancelled = true;
            };
        }, [fluxId, searchString]
    );


    const getDocumentsByFlux = (searchDocument: SearchDocuments) => {
        let role = "";
        let fluxNameDisplay: string = "";
        let currentId: number = -1;
        let status: string = "";
        let submit: string = "";
        dispatch({type: "ON_SEARCH"});
        DocumentService.getDocumentsByFlux(typeof (fetch) === 'undefined' ? window.fetch : fetch, searchDocument, fluxId).then(f => {
            role = f.elementDTOs ? f.elementDTOs[0].flux.role : "";
            console.log("workspazzzzzzzzzzzzceId",workspaceId)
           
            if (workspaceId === 0) {
                fluxNameDisplay = f.elementDTOs ? f.elementDTOs[0].flux.name : "";
                status = f.elementDTOs ? !f.elementDTOs[0].flux.fluxSubmit ? f.elementDTOs[0].flux.fluxStatus : VALIDATE : "";
                submit = f.elementDTOs ? f.elementDTOs[0].flux.fluxSubmit ? SUBMIT : "" : "";
                currentId = f.elementDTOs ? f.elementDTOs[0].workspaceId : 0;
               
            } else {
                fluxNameDisplay = fluxName;
                status = fluxStatus;
                currentId = workspaceId;
            }
            console.log("kkk",fluxNameDisplay,status,submit,currentId)
            console.log("ttt",f.elementDTOs ? f.elementDTOs[0].flux.fluxSubmit ? SUBMIT : "" : "")

            dispatch({
                type: "ON_LOAD_DOCUMENTS",
                documentList: f.elementDTOs,
                totalResults: f.numberElement,
                fluxName: fluxNameDisplay,
                fluxStatus: status,
                role,
                fluxSubmit: submit,
                workspaceId: currentId,
                currentPage: searchDocument.requestPage.page + 1
            });
        }).catch(error => {
                dispatch({
                    type: "ON_LOAD_DOCUMENTS",
                    documentList: [],
                    totalResults: 0,
                    fluxName: "Erreur",
                    role:"",
                    fluxStatus: "",
                    fluxSubmit: "",
                    workspaceId: 1,
                    currentPage: searchDocument.requestPage.page + 1
                });

                let message = JSON.parse(error.message);

                setErrorMessage(new ErrorMessage(true, message.message.substring(0, 300) + "...", "Recherche de documents", errorIcon));
            }
        )

    };

    function goToUrl() {
        const stringifield = queryString.stringify(searchDocument.objToJSON());
        history.push({
            pathname: `/open/${fluxId}`,
            search: stringifield
        })
    }

    const computeSortField = (s: string) => {
        if (searchDocument.requestPage.sortField === s) {
            searchDocument.requestPage.sortOrder = searchDocument.requestPage.sortOrder === "asc" ? "desc" : "asc"
        }
        searchDocument.requestPage.sortField = s;
        //dispatch({type: "ON_FILTER_DOCUMENTS", searchDocument: searchDocument});
    };


    const onSort = (s: string) => {
        computeSortField(s);
        goToUrl();
        //getDocumentsByFlux(searchDocument);
    };

    const onChangePaging = (e: Page) => {
        searchDocument.requestPage.page = e.page - 1;
        if (searchDocument.requestPage.size != e.numberItems)
            searchDocument.requestPage.page = 0;
        searchDocument.requestPage.size = e.numberItems;
        goToUrl();
        //dispatch({type: "ON_FILTER_DOCUMENTS", searchDocument: searchDocument});
        //getDocumentsByFlux(searchDocument);
    };

    const onChangeSearchText = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        if (name === "name") {
            dispatch({type: "ON_CHANGE_SEARCH_TEXT_NAME", name: term});
        }
    };

    const handleSearchText = (input: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === 'Enter') {
            if (input === "name") {
                console.log(`click enter on name : ${name}`)
                searchDocument.documentName = name;
            }
            goToUrl();
            //dispatch({type: "ON_FILTER_DOCUMENTS", searchDocument: searchDocument});
            //getDocumentsByFlux(searchDocument);

        }
    };

    const closeModalPrint = () => {
        dispatch({type: "ON_DISPLAY_MODAL_PRINT", idDocument: 0, isModalPrint: false})
    }

    const printDocument = () => {
        dispatch({type: "ON_DISPLAY_MODAL_PRINT", idDocument: idDocument, isModalPrint: false})
        DocumentService.printDocument(typeof (fetch) === 'undefined' ? window.fetch : fetch, idDocument)
            .then(response => {
                dispatch({type: "ON_DISPLAY_MODAL_PRINT", idDocument: 0, isModalPrint: false})
            });
    }

    const closeModalSave = () => {
        dispatch({type: "ON_DISPLAY_MODAL_SAVE", idDocument: 0, isModalSave: false,name:""})
    }

    const saveDocument = () => {
        dispatch({type: "ON_DISPLAY_MODAL_SAVE", idDocument: idDocument, isModalSave: false,name:name})
        DocumentService.downloadDocument(typeof (fetch) === 'undefined' ? window.fetch : fetch, idDocument,name)
            .then(response => {
                dispatch({type: "ON_DISPLAY_MODAL_SAVE", idDocument: 0, isModalSave: false,name:""})
            });
    }


    const handleStartChildAction = () => {
        dispatch({type: "ON_SEARCH"});
    };


    const handleChildAction = (idDocument: number, action: string, error: ErrorMessage) => {

        if (error.hasErrors) {
            setErrorMessage(error);
            dispatch({type: "ON_VALIDATE_FLOW", idDocument: idDocument, fluxStatus: action, fluxSubmit: ""})
            return;
        }

        dispatch({type: "ON_VALIDATE_FLOW", idDocument: idDocument, fluxStatus: action === SUBMIT ? "" : action, fluxSubmit: action === SUBMIT ? action : ""})

    };


    return (
        <>
            <Loader mode={loaderMode}>

                {
                    errorMessage.hasErrors ?
                        <Toast
                            errorMessage={errorMessage}
                            position={'bottom-right'}
                            autoDelete={true}
                            dismissTime={10000}
                        />
                        : ""
                }

                <div className="af-home container">
                    <Link to={`/workspaces/${workspaceId}/flow-list`}>
                        <span className="af-btn__text" style={{marginRight: "0.5rem"}}>Liste des flux </span>

                        <i className="glyphicon glyphicon-arrow-xs-right"/>
                        <label style={{color: "gray", marginLeft: "0.5rem"}}>
                            liste des documents
                        </label>
                    </Link>
                    <div style={{marginBottom: "2rem", marginTop: "2rem"}}>
                        <Title>
                            {`Liste des documents du flux : `}
                            <label style={{color: "gray", marginLeft: "0.5rem"}}>
                                {fluxName}
                            </label>
                        </Title>{" "}
                    </div>

                    <Table>
                        <Table.Header>
                            <Table.Tr>
                                <Table.Th classModifier="sortable one">
                  <span className="af-table__th-content one"> <Button className="af-btn" classModifier="table-sorting one" onClick={() => {
                      onSort("documentName");
                  }}>
                      <span className="af-btn__text">Nom du document</span>
                      <i
                          className={
                              "glyphicon " +
                              (searchDocument.requestPage.sortField === "documentName"
                                  ? `glyphicon-sorting-${searchDocument.requestPage.sortOrder}`
                                  : "glyphicon-sorting")
                          }
                      />
                    </Button>
                  </span>
                                </Table.Th>
                                <Table.Th>Actions</Table.Th>

                            </Table.Tr>
                        </Table.Header>
                        <Table.Body>
                            <Table.Tr className="af-table-head">
                                <Table.Td>
                                    <div className="inner-addon right-addon">
                                        <i className="glyphicon glyphicon-search"/>
                                        <input type="text" className="form-control" placeholder=""
                                               onKeyDown={(e: any) => handleSearchText('name', e)}
                                               onChange={(e) => onChangeSearchText('name', e)}
                                        />
                                    </div>
                                </Table.Td>
                                <Table.Td colSpan={"2"}>
                                    <ValidationAction idFlux={+fluxId} action={fluxStatus} submitAction={fluxSubmit ? "SUBMIT" : ""}
                                                      childAction={handleChildAction}
                                                      handleStartChildAction={handleStartChildAction} role={role}/>


                                </Table.Td>
                            </Table.Tr>
                            {documentList.map(({id, name, printable, saveable}) => (
                                <Table.Tr key={id}>
                                    <Table.Td>{name}</Table.Td>
                                    <Table.Td style={{textAlign: "center"}} colSpan={"2"}>
                                        <a className="af-btn--circle" title="Détails" role="button" onClick={() => {
                                            dispatch({type: "ON_DISPLAY_DETAIL", idDocument: id, isPaneOpen: true});

                                        }}
                                        >
                                            <i className="glyphicon glyphicon-info-sign"/>
                                        </a>

                                        <Link className="af-btn--circle" style={{left: "3em"}} title="Consulter" role="button"
                                              to={{
                                                  pathname: '/view/' + id,
                                                  search: queryString.stringify(searchDocument.objToJSON())
                                              }}>
                                            <i className="glyphicon glyphicon-pdf"/>
                                        </Link>

                                        {saveable && (<a className="af-btn--circle" style={{left: "3em"}} title="Sauvegarder" role="button"
                                                         onClick={() => {
                                                             dispatch({type: "ON_DISPLAY_MODAL_SAVE", idDocument: id, isModalSave: true, name:name});

                                                         }}
                                        >
                                            <i className="glyphicon glyphicon-download"/>
                                        </a>)}

                                        {printable && (<a className="af-btn--circle" style={{left: "3em"}} title="Imprimer" role="button"
                                                          onClick={() => {
                                                              dispatch({
                                                                  type: "ON_DISPLAY_MODAL_PRINT",
                                                                  idDocument: id,
                                                                  isModalPrint: true
                                                              });

                                                          }}
                                        >
                                            <i className="glyphicon glyphicon-print"/>
                                        </a>)}


                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Body>
                    </Table>

                    <Paging
                        onChange={(e: any) => onChangePaging(e)}
                        numberItems={searchDocument.requestPage.size}
                        numberPages={Math.ceil(totalResults / searchDocument.requestPage.size)}
                        currentPage={currentPage}
                    />


                    <SlidingPane
                        className="some-custom-class"
                        overlayClassName="some-custom-overlay-class"
                        isOpen={isPaneOpen}
                        title="Détails du flux"
                        subtitle={name}
                        onRequestClose={() => {
                            // triggered on "<" on left top click or on outside click
                            dispatch({type: "ON_DISPLAY_DETAIL", idDocument: 0, isPaneOpen: false});
                        }}
                    >
                        <dl className="information-list">
                            <DocumentDetail idDocument={idDocument} isPaneOpen={isPaneOpen}/>
                        </dl>
                    </SlidingPane>

                    <BooleanModal isOpen={isModalPrint} id={"modalPrint"}
                                  title={"Imprimer le document"}
                                  onCancel={closeModalPrint}
                                  onSubmit={printDocument}
                                  submitTitle={"Imprimer"}
                                  buttonClassName={"af-btn--danger"}
                    >
                        <div>
                            Il est impératif de :
                            <ul>
                                <li> stocker les documents imprimés dans une armoire fermée à clé</li>
                                <li> détruire les documents imprimés au bout de 2 ans à l'aide d'une déchiqueteuse</li>
                            </ul>
                        </div>

                    </BooleanModal>

                    <BooleanModal isOpen={isModalSave} id={"modalSave"}
                                  title={"Sauvegarder le document"}
                                  onCancel={closeModalSave}
                                  onSubmit={saveDocument}
                                  submitTitle={"Sauvegarder"}
                                  buttonClassName={"af-btn--danger"}
                    >
                        <div>
                            Il est impératif de :
                            <ul>
                                <li> stocker les documents sur des répertoires à accès restreints aux seules personnes ayant besoin d’y
                                    accéder
                                </li>
                                <li> supprimer les documents au bout de 2 ans (si possible mise en place d'une suppression automatique)</li>
                            </ul>
                        </div>

                    </BooleanModal>

                    <div style={{marginTop: "3em"}}>
                       <Link
                        className="btn af-btn af-btn--quote"
                                    to={{
                                        pathname: `/workspaces/${workspaceId}/flow-list`,
                                        search: buildSearchParams({
                                          workspaceId,
                                          ...searchParmsDoc,
                                          sortField: "receptionDate",
                                          sortOrder: "desc",
                                          page: 0,
                                          size: 10
                                        })
                                      }}
                                >
                            <i className="glyphicon glyphicon-arrowthin-left"/>
                            <span className="af-btn__text" style={{paddingLeft: "2rem"}}>Retour à la liste des flux</span>
                        </Link>
                    </div>

                </div>
            </Loader>
        </>
    );
};


const enhanceAuth = compose<Props, Props>(
    withAuthentication(fetch)
);

const DocumentsEnhance = enhanceAuth(Documents);

export default DocumentsEnhance;  je veux ajoouter  role dans ce block de elese  {
                fluxNameDisplay = fluxName;
                status = fluxStatus;
                currentId = workspaceId;
            }  quaznd jai fait role=role
            } il ma dit role=role
            } alor moi je veux affecter le role dans le state 
