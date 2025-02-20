import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
// @ts-ignore
import {SelectInput} from "@axa-fr/react-toolkit-form-input-select";
// @ts-ignore
import Loader from "@axa-fr/react-toolkit-loader";

// @ts-ignore
import {BooleanModal} from "@axa-fr/react-toolkit-all";
// @ts-ignore
import DateInput from "@axa-fr/react-toolkit-form-input-date/dist/DateInput";
import Title from "@axa-fr/react-toolkit-title";
import Button from "@axa-fr/react-toolkit-button";
import Table, {Paging} from "@axa-fr/react-toolkit-table";
import Flux from "models/flux";
import FluxService from "api/flux.service";
import SearchFlux from "models/searchFlux";
import SlidingPane from "components/sliding-pane/sliding-pane";
import {Link, RouteComponentProps, useHistory} from "react-router-dom";
import './flow-list.scss';
import FlowDetail from "components/flux-detail/flow-detail";
import ValidationAction from "components/validation-action/validation-action";
import {flowListReducer} from "./flowList.reducer";
import * as queryString from "querystring";
import RequestPage from "models/requestPage";
import moment from 'moment';
import Toast from "components/toast";
import ErrorMessage from "models/errorMessage";
import errorIcon from 'assets/svg/error.svg';
import Refresh from "components/refresh";
import DocumentService from "../../api/document.service";

interface Props {
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
}

interface Page {
    numberItems: number,
    page: number
}

interface Params {
    id: string
}


const FlowList: FunctionComponent<RouteComponentProps<Params> & Props> = ({match, location, fetch}) => {
    const pageParam = new RequestPage(0, 10, "receptionDate", "desc");
    const workspaceId = +match.params.id;
    const initialSearchFlux = new SearchFlux("", "", "", "", "", workspaceId, pageParam);
    const searchGlobal = location.search ? SearchFlux.fromJSON(queryString.parse(location.search.slice(1))) : initialSearchFlux;

    const history = useHistory();

    const [state, dispatch] = useReducer(flowListReducer, {
        name: "",
        fluxList: [],
        idFlux: 0,
        pdfNumber: 10,
        isPaneOpen: false,
        isModalSave: false,
        dateCreation: null,
        loaderMode: "none",
        currentPage: 1,
        totalResults: 0,
        type: "",
        status: "DEFAULT_STATUS",
        submit: "DEFAULT_SUBMIT",
        search: searchGlobal,
        saveable: false
    });

    const {name, fluxList, idFlux, pdfNumber, isModalSave, isPaneOpen, loaderMode, currentPage, totalResults, type, dateCreation, status, submit} = state;
    const [workspaceName, setWorkspaceName] = useState("");
    const [errorMessage, setErrorMessage] = useState(new ErrorMessage(false, "", "", errorIcon))


    const getFluxByWorkspace = (searchFlux: SearchFlux) => {
        dispatch({type: "ON_SEARCH"});
        FluxService.getFluxByWorkspace(typeof (fetch) === 'undefined' ? window.fetch : fetch, searchFlux, workspaceId)
            .then(f => {
                    if (typeof (f) !== "undefined" && f.elementDTOs && f.elementDTOs[0]) {
                        setWorkspaceName(f.elementDTOs[0].workspaceName);
                    }
                    dispatch({
                        type: "ON_LOAD_FLUX",
                        fluxList: f.elementDTOs,
                        totalResults: f.numberElement,
                        currentPage: searchFlux.requestPage.page + 1
                    });
                }
            )
            .catch(error => {
                dispatch({
                    type: "ON_LOAD_FLUX",
                    fluxList: [],
                    totalResults: 0,
                    currentPage: searchFlux.requestPage.page + 1
                });

                let message = JSON.parse(error.message);
                setErrorMessage(new ErrorMessage(true, message.message.substring(0, 300) + "...", "Recherche de flux", errorIcon));
            });

    };


    const computeSortField = (s: string) => {
        if (state.search.requestPage.sortField == s) {
            state.search.requestPage.sortOrder = state.search.requestPage.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            state.search.requestPage.sortOrder = 'desc'
        }
        const searchFlux = state.search;
        searchFlux.requestPage.sortField = s;

        //state.search.requestPage.sortField  = s;
        dispatch({type: "ON_FILTER_FLUX", search: searchFlux});
    };

    function goToUrl() {
        getFluxByWorkspace(state.search);
    }

    const onSort = (s: string) => {
        computeSortField(s);
        goToUrl();
    };


    const onChangePaging = (e: Page) => {
        state.search.requestPage.page = e.page - 1;
        if (state.search.requestPage.size != e.numberItems)
            state.search.requestPage.page = 0;
        state.search.requestPage.size = e.numberItems;
        goToUrl();
    };

    const onChangeSearchText = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        if (name === "name") {
            dispatch({type: "ON_CHANGE_SEARCH_TEXT_NAME", name: term});
        }

        if (name === "type") {
            dispatch({type: "ON_CHANGE_SEARCH_TEXT_TYPE", typeIn: term});
        }

    };

    const onChangeSearchNumber = ( e: React.ChangeEvent<HTMLInputElement>) => {
        const term = parseInt(e.target.value);
            dispatch({type: "ON_CHANGE_SEARCH_PDF_NUMBER", pdfNumber:term === 0 ? 10 : term > 30 ? 30 : term});
        };

        const onChangeDate = (e: any) => {
        const date = e.viewValue;
        if (!moment(date, 'DD/MM/YYYY', true).isValid() && date !== "") {
            dispatch({type: "ON_CHANGE_DATE", creationDate: date});
        } else {
            dispatch({type: "ON_CHANGE_DATE", creationDate: date});
            state.search.receptionDate = date;
            goToUrl();
        }


    };

    const onChangeAction = (e: any) => {
        const status = e.value;
        dispatch({type: "ON_CHANGE_STATUS", status: status});
        state.search.fluxStatus = status;
        goToUrl();
    };

    const onChangeSubmitAction = (e: any) => {
        const submit = e.value;
        dispatch({type: "ON_CHANGE_SUBMIT", submit: submit});
        state.search.fluxSubmit = submit;
        goToUrl();
    };


    const handleSearchText = (input: string, e: React.KeyboardEvent<HTMLInputElement>) => {
        const key = e.key;
        if (key === 'Enter') {
            manageSearchText(input)
        }
    };
    const manageSearchText = (input:string):void => {
        if (input === "name") {
            state.search.editionName = name;
        }

            if (input === "type") {
                state.search.editionType = type;
            }
            if (input === "pdfNumber") {
                state.pdfNumber = pdfNumber;
            }
            //dispatch({type: "ON_FILTER_FLUX", searchFlux: searchFlux});
            goToUrl();

    }

    const handleStartChildAction = () => {
        dispatch({type: "ON_VALIDATION_CALL"});
    };


    const handleChildAction = (idFlux: number, action: string, error: ErrorMessage) => {
        let flux: Flux = fluxList.filter(f => f.id === idFlux)[0];


        if (error.hasErrors) {
            setErrorMessage(error);
            dispatch({type: "ON_VALIDATION", fluxList: [...fluxList]})
            return;
        }

        if (action === 'SUBMIT') {
            flux = {...flux, "fluxSubmit": true};
            fluxList[fluxList.findIndex(f => f.id === idFlux)] = flux;
        } else {
            flux.fluxStatus = action;
        }

        dispatch({type: "ON_VALIDATION", fluxList: [...fluxList]})

    };
    useEffect(() => {
        getFluxByWorkspace(initialSearchFlux);
    }, [workspaceId, location.search]);
    const handleRefresh = () => {

        /**
         *
         dispatch({type: "ON_CHANGE_SEARCH_TEXT_NAME", name: ''});

         dispatch({type: "ON_CHANGE_SEARCH_TEXT_TYPE", typeIn: ''});

         dispatch({type: "ON_CHANGE_DATE", creationDate: ''});

         dispatch({type: "ON_CHANGE_STATUS", status: ''});

         dispatch({type: "ON_CHANGE_SUBMIT", submit: ''});


         dispatch({type: "ON_FILTER_FLUX", search: initialSearchFlux});
         */
        getFluxByWorkspace(state.search);
    };
    const closeModalSave = () => {
        dispatch({type: "ON_DISPLAY_MODAL_SAVE", idFlux: 0, isModalSave: false, pdfNumber: pdfNumber})
    }

    const saveZip = () => {
        const pdfN=isNaN(pdfNumber)?10:pdfNumber;
        dispatch({type: "ON_DISPLAY_MODAL_SAVE", idFlux: idFlux, isModalSave: false,  pdfNumber:pdfN })
        DocumentService.downloadZip(typeof (fetch) === 'undefined' ? window.fetch : fetch, idFlux, pdfN)
            .then(response => {
                dispatch({type: "ON_DISPLAY_MODAL_SAVE", idFlux: 0, isModalSave: false, pdfNumber: pdfN})
            });
    };
console.log('test', type, name, dateCreation, pdfNumber, status, submit);
//voci les filtere agarder  et tu peux faire ca  pathname: `/open/${id}?ici tu rajoute les critere  que  tu va garder `
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
                    <div style={{marginBottom: "&rem", marginTop: "2rem"}}>
                        <Title>{`Liste des flux duuuu ${workspaceName}`}</Title>
                    </div>

                    <div className="float-right"><Refresh buttonAction={() => {
                        handleRefresh();
                    }}/></div>

                    <Table className="af-table one">
                        <Table.Header>
                            <Table.Tr>
                                <Table.Th classModifier="sortable">
                  <span className="af-table__th-content">
                    <Button className="af-btn" classModifier="table-sorting" onClick={() => {
                        onSort("editionType");
                    }}
                    >
                      <span className="af-btn__text">Type d'édition</span>
                      <i
                          className={
                              "glyphicon " +
                              (state.search.requestPage.sortField === "editionType"
                                  ? `glyphicon-sorting-${state.search.requestPage.sortOrder}`
                                  : "glyphicon-sorting")
                          }
                      />

                    </Button>
                  </span>
                                </Table.Th>
                                <Table.Th classModifier="sortable">
                  <span className="af-table__th-content">
                    <Button className="af-btn" classModifier="table-sorting" onClick={() => {
                        onSort("editionName");
                    }}
                    >
                      <span className="af-btn__text">Libellé d'édition</span>
                      <i
                          className={
                              "glyphicon " +
                              (state.search.requestPage.sortField === "editionName"
                                  ? `glyphicon-sorting-${state.search.requestPage.sortOrder}`
                                  : "glyphicon-sorting")
                          }
                      />
                    </Button>
                  </span>
                                </Table.Th>
                                <Table.Th classModifier="sortable">
                  <span className="af-table__th-content">
                    <Button className="af-btn" classModifier="table-sorting" onClick={() => {
                        onSort("receptionDate");
                    }}
                    >
                      <span className="af-btn__text">Date de réception</span>
                     <i
                         className={
                             "glyphicon " +
                             (state.search.requestPage.sortField === "receptionDate"
                                 ? `glyphicon-sorting-${state.search.requestPage.sortOrder}`
                                 : "glyphicon-sorting")
                         }
                     />
                    </Button>
                  </span>
                                </Table.Th>

                                <Table.Th>Heure de réception</Table.Th>
                                <Table.Th>Consultation</Table.Th>
                                <Table.Th>Validation / Soumission</Table.Th>
                                <Table.Th classModifier="sortable">
                  <span className="af-table__th-content">
                    <Button className="af-btn" classModifier="table-sorting" onClick={() => {
                        onSort("fluxStatus");
                    }}
                    >
                      <span className="af-btn__text">Etat</span>
                      <i
                          className={
                              "glyphicon " +
                              (state.search.requestPage.sortField === "fluxStatus"
                                  ? `glyphicon-sorting-${state.search.requestPage.sortOrder}`
                                  : "glyphicon-sorting")
                          }
                      />
                    </Button>
                  </span>
                                </Table.Th>
                                <Table.Th classModifier="sortable">
                  <span className="af-table__th-content">
                    <Button className="af-btn" classModifier="table-sorting" onClick={() => {
                        onSort("fluxSubmit");
                    }}
                    >
                      <span className="af-btn__text">Traitement</span>
                      <i
                          className={
                              "glyphicon " +
                              (state.search.requestPage.sortField === "fluxSubmit"
                                  ? `glyphicon-sorting-${state.search.requestPage.sortOrder}`
                                  : "glyphicon-sorting")
                          }
                      />
                    </Button>
                  </span>
                                </Table.Th>
                            </Table.Tr>
                        </Table.Header>
                        <Table.Body>
                            <Table.Tr className="af-table-head">
                                <Table.Td>
                                    <div className="inner-addon right-addon one ">
                                        <button className="glyphicon glyphicon-search one btn-icon" onClick={() => manageSearchText("type")}/>
                                        <input type="text" className="form-control one" placeholder="" value={type}
                                               onKeyDown={(e) => handleSearchText('type', e)}
                                               onChange={(e) => onChangeSearchText('type', e)}
                                        />
                                    </div>
                                </Table.Td>
                                <Table.Td>
                                    <div className="inner-addon right-addon one ">
                                        <button className="glyphicon glyphicon-search one btn-icon" onClick={() => manageSearchText("name")}/>
                                        <input type="text" className="form-control one" placeholder="" value={name}
                                               onKeyDown={(e: any) => handleSearchText('name', e)}
                                               onChange={(e) => onChangeSearchText('name', e)}
                                        />
                                    </div>
                                </Table.Td>
                                <Table.Td>
                                    <div className="form-group-date">
                                        <DateInput
                                            name="dateCreation"
                                            label=""
                                            locale="fr-fr"
                                            onChange={(e: any) => {
                                                onChangeDate(e);
                                            }}
                                            viewValue={dateCreation}
                                            helpMessage=""
                                            classNameContainerLabel="col-md-1"
                                            classNameContainerInput="col-md-8"
                                            forceDisplayMessage={true}
                                            messageType="error"
                                        />
                                    </div>
                                </Table.Td>
                                <Table.Td colSpan={1}/>
                                <Table.Td>
                                    <div>
                                        <input type="number" className="form-control one" placeholder="" value={pdfNumber}
                                               onKeyDown={(e: any) => handleSearchText('pdfNumber', e)}
                                               onChange={(e) => onChangeSearchNumber(e)}
                                        />
                                    </div>
                                </Table.Td>
                                <Table.Td colSpan={1}/>
                                <Table.Td>

                                    <div className="form-group-select">
                                        <SelectInput

                                            id="action"
                                            name="action"
                                            label=""
                                            onChange={(e: any) => {
                                                onChangeAction(e);
                                            }}
                                            value={status}
                                            options={[
                                                {value: "DEFAULT_STATUS", label: "- Sélectionner -"},
                                                {value: "VALIDATE", label: "Validé"},
                                                {value: "INVALIDATE", label: "Invalidé"},
                                                {value: "NEUTRAL", label: "Non qualifié"}
                                            ]}
                                        />
                                    </div>
                                </Table.Td>

                                <Table.Td>

                                    <div className="form-group-select">
                                        <SelectInput

                                            id="submitAction"
                                            name="submitAction"
                                            label=""
                                            value={submit}
                                            onChange={(e: any) => {
                                                onChangeSubmitAction(e);
                                            }}
                                            options={[
                                                {value: "DEFAULT_SUBMIT", label: "- Sélectionner -"},
                                                {value: "SUBMIT", label: "Oui"},
                                                {value: "NEUTRAL", label: "Non"}

                                            ]}
                                        />
                                    </div>
                                </Table.Td>
                            </Table.Tr>
                            {
                                fluxList.map(({id, type, name, creationDate, fluxStatus, fluxSubmit, role, saveable}) => (
                                        <Table.Tr key={id}>
                                            <Table.Td>{type}</Table.Td>
                                            <Table.Td>{name}</Table.Td>
                                            <Table.Td
                                                className={'af-table__cell af-table__cell_padding'}>{new Date(creationDate).toLocaleDateString()}</Table.Td>
                                            <Table.Td>{("0" + new Date(creationDate).getHours()).slice(-2) + ":" +
                                                ("0" + new Date(creationDate).getMinutes()).slice(-2) + ":" + ("0" + new Date(creationDate).getSeconds()).slice(-2)}</Table.Td>
                                            <Table.Td>
                                                <Link className="af-btn--circle" title="Ouvrir" role="button"
                                                      to={{
                                                          pathname: `/open/${id}?2`
                                                      }}>
                                                    <i className="glyphicon glyphicon-folder-open"/>
                                                </Link>


                                                <a className="af-btn--circle" title="Détails" role="button"
                                                   onClick={() => {
                                                       dispatch({type: "ON_DISPLAY_DETAIL", idFlux: id, isPaneOpen: true})
                                                   }}
                                                >
                                                    <i className="glyphicon glyphicon-info-sign"/>
                                                </a>
                                                <a className="af-btn--circle" title="Sauvegarder zip" role="button"
                                                   hidden={!saveable}
                                                   onClick={() => {
                                                       dispatch({
                                                           type: "ON_DISPLAY_MODAL_SAVE",
                                                           idFlux: id,
                                                           isModalSave: true,
                                                           pdfNumber: pdfNumber
                                                       });

                                                   }}
                                                >
                                                    <i className="glyphicon glyphicon-download"/>
                                                </a>
                                            </Table.Td>
                                            <Table.Td>
                                                <ValidationAction idFlux={id} action={fluxStatus} submitAction={fluxSubmit ? "SUBMIT" : ""}
                                                                  childAction={handleChildAction}
                                                                  handleStartChildAction={handleStartChildAction} role={role}/>
                                            </Table.Td>
                                            <Table.Td>
                                                <div
                                                    className={fluxStatus === "VALIDATE" ? "oval-valide" : fluxStatus === "INVALIDATE" ? "oval-invalide" : "oval-other"}>
                                                    {fluxStatus === "VALIDATE" ? "Validé" : fluxStatus === "INVALIDATE" ? "Invalidé" : "Non qualifié"}
                                                </div>
                                            </Table.Td>
                                            <Table.Td>
                                                <div
                                                    className={fluxSubmit ? "oval-oui" : "oval-other"}>
                                                    {fluxSubmit ? "Oui" : "Non"}
                                                </div>
                                            </Table.Td>
                                        </Table.Tr>
                                    )
                                )}
                        </Table.Body>

                    </Table>
                    <Paging
                        onChange={(e: any) => onChangePaging(e)}
                        numberItems={state.search.requestPage.size}
                        numberPages={Math.ceil(totalResults / state.search.requestPage.size)}
                        currentPage={currentPage}
                    />

                    <SlidingPane
                        className="some-custom-class"
                        overlayClassName="none"
                        isOpen={isPaneOpen}
                        title="Détails du flux"
                        subtitle={name}

                        onRequestClose={() => {
                            // triggered on "<" on left top click or on outside click
                            dispatch({type: "ON_DISPLAY_DETAIL", idFlux: 0, isPaneOpen: false})
                        }}
                    >
                        <dl className="information-list">
                            <FlowDetail idFlux={idFlux} isPaneOpen={isPaneOpen}/>
                        </dl>
                    </SlidingPane>

                    <BooleanModal isOpen={isModalSave} id={"modalSave"}
                                  title={"Sauvegarder les documents"}
                                  onCancel={closeModalSave}
                                  onSubmit={saveZip}
                                  submitTitle={"Sauvegarder"}
                                  buttonClassName={"af-btn--danger"}
                    >
                        <div>
                            Il est impératif de :
                            <ul>
                                <li> stocker les documents sur des répertoires à accès restreints aux seules personnes
                                    ayant besoin d’y
                                    accéder
                                </li>
                                <li> supprimer les documents au bout de 2 ans (si possible mise en place d'une
                                    suppression automatique)
                                </li>
                            </ul>
                        </div>

                    </BooleanModal>

                </div>
            </Loader>
        </>
    );
};
//
// const enhanceAuth = compose<Props, Props>(
//     withAuthentication(fetch)
// );
//
// //const FlowListEnhance = enhanceAuth(FlowList);


export default FlowList;


cest ici le bouton pour aller detail : <Link className="af-btn--circle" title="Ouvrir" role="button"
                                                      to={{
                                                          pathname: "/open/" + id
                                                      }}>
                                                    <i className="glyphicon glyphicon-folder-open"/>
                                                </Link>



                                                      et viuci la page detail :import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
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

interface Page {
    numberItems: number,
    page: number
}

interface Props {
    fluxId: string,
    documentName?: string,

    requestPage?: requestPage,
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
}

const Documents: FunctionComponent<Props> = ({fluxId, documentName, requestPage, fetch}) => {
    const pageParam = typeof (requestPage) !== "undefined" ? new RequestPage(requestPage.page, requestPage.size, requestPage.sortField, requestPage.sortOrder) : new RequestPage(0, 10, "", "desc");
    const searchDocument = new SearchDocuments(typeof (documentName) !== "undefined" ? documentName : "", pageParam);
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

            if (workspaceId == 0) {
                fluxNameDisplay = f.elementDTOs ? f.elementDTOs[0].flux.name : "";
                status = f.elementDTOs ? !f.elementDTOs[0].flux.fluxSubmit ? f.elementDTOs[0].flux.fluxStatus : VALIDATE : "";
                submit = f.elementDTOs ? f.elementDTOs[0].flux.fluxSubmit ? SUBMIT : "" : "";
                currentId = f.elementDTOs ? f.elementDTOs[0].workspaceId : 0;
                role = f.elementDTOs ? f.elementDTOs[0].flux.role : "";
            } else {
                fluxNameDisplay = fluxName;
                status = fluxStatus;
                currentId = workspaceId;
            }

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
                                                  pathname: '/view/' + id
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
                        <Link className="btn af-btn af-btn--quote" to={`/workspaces/${workspaceId}/flow-list`}>
                            <i className="glyphicon glyphicon-arrowthin-left"/>
                            <span className="af-btn__text" style={{paddingLeft: "2rem"}}>Retour à la liste des fluxxxxxxxx </span>
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

export default DocumentsEnhance;
  je veux lorsque  je clique sur Retour à la liste des fluxxxxxxxx je trouve les critere des recherche que deja remmpli
 et pour infoi :console.log('test', type, name, dateCreation, pdfNumber, status, submit);
//voci les filtere agarder  et tu peux faire ca  pathname: `/open/${id}?ici tu rajoute les critere  que  tu va garder `
