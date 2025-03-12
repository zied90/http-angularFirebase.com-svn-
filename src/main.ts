import React, {FunctionComponent, useEffect, useReducer, useState} from "react";
import Table from "@axa-fr/react-toolkit-table";
import ErrorMessage from "models/errorMessage";
import errorIcon from "assets/svg/error.svg";
import {fluxDurationReducer} from "components/admin/flux-duration/flux-duration-reducer";
import Title from "@axa-fr/react-toolkit-title";
// @ts-ignore
import {Link, RouteComponentProps} from "react-router-dom";
// @ts-ignore
import Loader from "@axa-fr/react-toolkit-loader";
import './flux-duration.scss';
import userInfo from "models/userInfo";
import FluxDurationService from "../../../api/flux-duration.service";
import {compose} from "recompose";
import {withAuthentication} from "@axa-fr/react-oidc-context-fetch";
import Toast from "../../toast";


export interface IFetch {
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

interface Props {
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
    usr: userInfo
}

type Params = {}

const FluxDuration: FunctionComponent<Props> = ({usr, fetch}) => {

    const [errorMessage, setErrorMessage] = useState(new ErrorMessage(false, "", "", errorIcon));

    const [state, dispatch] = useReducer(fluxDurationReducer, {
        loaderMode: "none",
        fluxDurations: []
    });

    useEffect(() => {
            let isCancelled = false;
            if (!isCancelled)
                getFluxDurations();
            return () => {
                isCancelled = true;
            };
        }, []
    );

    const getFluxDurations = () => {
        dispatch({type: "ON_LOAD", loaderMode: "get"});
        FluxDurationService.getFluxDurations(typeof (fetch) === 'undefined' ? window.fetch : fetch).then(f => {
            dispatch({
                type: "ON_LOAD_FLUX_DURATION",
                fluxDurations: f
            });
            dispatch({type: "ON_LOAD", loaderMode: "none"});
        }).catch(error => {
                dispatch({
                    type: "ON_LOAD_FLUX_DURATION",
                    fluxDurations: []
                });
                dispatch({type: "ON_LOAD", loaderMode: "none"});
                let message = JSON.parse(error.message);
                setErrorMessage(new ErrorMessage(true, message.message.substring(0, 300) + "...", "Recherche des durées", errorIcon));
            }
        )

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        const key = e.key;
        if (key === 'Enter') {
            e.preventDefault();
        }
    };

    const isNumeric = (s: string): boolean => {
        return !isNaN(+s);
    }

    const handleChangeText = (sensitive: boolean, input: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        fluxDurations.filter(f => f.sensitiveData === sensitive).map(flux => {
            if (input === "validation" && isNumeric(value)) {
                flux.validationInvalidationDelay = +value;
                dispatch({type: "ON_UPDATE_FLUX_DURATION", fluxDurations: fluxDurations})
            }

            if (input === "submission" && isNumeric(value)) {
                flux.submissionDelay = +value;
                dispatch({type: "ON_UPDATE_FLUX_DURATION", fluxDurations: fluxDurations})
            }

            if (input === "retention" && isNumeric(value)) {
                flux.retentionPeriod = +value;
                dispatch({type: "ON_UPDATE_FLUX_DURATION", fluxDurations: fluxDurations})

            }
        })



    }

    const saveData = (e: any) => {
        dispatch({type: "ON_LOAD", loaderMode: "get"});
        FluxDurationService.saveFluxDuration(typeof (fetch) === 'undefined' ? window.fetch : fetch, fluxDurations).then(res => {
            dispatch({type: "ON_LOAD", loaderMode: "none"});
        }).catch(error => {
                dispatch({
                    type: "ON_LOAD_FLUX_DURATION",
                    fluxDurations: fluxDurations
                });

                let message = JSON.parse(error.message);
                setErrorMessage(new ErrorMessage(true, message.message.substring(0, 300) + "...", "Recherche des durées", errorIcon));
            }
        )
    }

    const {
        loaderMode,
        fluxDurations
    } = state;


    return (
        <Loader mode={loaderMode}>
            <>
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


                <div style={{marginBottom: "2rem", marginTop: "2rem"}}>
                    <Title>Gestion de la configuration des durées</Title>
                </div>

                <Table className="af-table one">
                    <Table.Header>
                        <Table.Tr>
                            <Table.Th>
                                <span className="af-table__th-content">Sensible</span>
                            </Table.Th>

                            <Table.Th>
                                <span className="af-table__th-content">Validation / Invalidation auto max</span>
                            </Table.Th>

                            <Table.Th>
                                <span className="af-table__th-content">Soumission auto max</span>
                            </Table.Th>

                            <Table.Th>
                                <span className="af-table__th-content">Durée de conservation des flux traités</span>
                            </Table.Th>
                        </Table.Tr>
                    </Table.Header>
                    <Table.Body>
                        {
                            fluxDurations && fluxDurations.map(({
                                                                    sensitiveData,
                                                                    validationInvalidationDelay,
                                                                    submissionDelay,
                                                                    retentionPeriod
                                                                }, i) => (
                                <Table.Tr>
                                    <Table.Td>
                                        <span className="af-table__th-content">{sensitiveData ? "Oui" : "Non"}</span>
                                    </Table.Td>
                                    <Table.Td>
                                        <input type="number" className="form-control one"
                                               placeholder="400" defaultValue={validationInvalidationDelay}
                                               onKeyDown={(e) => handleKeyDown(e)}
                                               onChange={(e) => handleChangeText(sensitiveData, 'validation', e)}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <input type="number" className="form-control one"
                                               placeholder="400" defaultValue={submissionDelay}
                                               onKeyDown={(e) => handleKeyDown(e)}
                                               onChange={(e) => handleChangeText(sensitiveData, 'submission', e)}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <input type="number" className="form-control one"
                                               placeholder="400" defaultValue={retentionPeriod}
                                               onKeyDown={(e) => handleKeyDown(e)}
                                               onChange={(e) => handleChangeText(sensitiveData, 'retention', e)}
                                        />
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        }

                    </Table.Body>
                </Table>
                <div className={"row"}>
                    <div className="col-md-12">
                        <button className={"afn-af-btn af-btn float-right"}
                                title="Sauvegarder les données"
                                onClick={e => saveData(e)}>Sauvegarder les données
                        </button>
                    </div>
                </div>
            </>
        </Loader>

    );

}
const enhanceAuth = compose<Props, Props>(
    withAuthentication(fetch)
);

const FluxDurationEnhance = enhanceAuth(FluxDuration);

export default FluxDurationEnhance;
