import React, {FunctionComponent, useEffect, useRef, useState} from "react";
// @ts-ignore
import {Document, Page} from 'react-pdf/dist/esm/entry.webpack';
import {Link} from "react-router-dom";
import configurationService from "api/config-api";
import Flux from "models/flux";
import DocumentService from "api/document.service";
import {compose} from "recompose";
// @ts-ignore
import {withAuthentication} from '@axa-fr/react-oidc-context-fetch';
import "./file-viewer.scss";
import useEventListener from './useEventListener'



type Props = {
    idDoc: string,
    oidcUser?: any,
    fetch?: (input: RequestInfo, init?: RequestInit) => Promise<Response>
};


const KEY_Q = ['81', 'KeyA'];
const KEY_D = ['68', 'KeyD'];
const KEY_S = ['83', 'KeyS'];
const KEY_Z = ['90', 'KeyW'];

const FileViewerApp: FunctionComponent<Props> = ({idDoc, oidcUser, fetch}) => {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numPages, setNumPages] = useState<number>(1);
    const [scale, setScales] = useState<number>(1.5);
    const [pageSelected, setPageSelected] = useState<string>("");
    const pageRef = useRef(null);


    const [flux, setFlux] = useState<Flux>(new Flux(0, "", "", false, "", 0, "", "", "", false));
    let url = `${configurationService.api_url}/document/${idDoc}/content`;



    const fileCst =
        {
            url: url,
            httpHeaders: {'authorization': 'Bearer ' + oidcUser.access_token}

        };

    const [file] = useState<any>(fileCst);
    const [documentName, setDocumentName] = useState<string>("");

    useEventListener('keydown', handler);
    useEffect(() => {
            let isCancelled = false;
            if (!isCancelled) {
                DocumentService.getDocumentById(typeof (fetch) === 'undefined' ? window.fetch : fetch, +idDoc).then(f => {
                    setFlux(f.flux);
                    setDocumentName(f.name);
                });

            }
            return () => {
                isCancelled = true;
            };
        }, [idDoc]
    );

    function removeFontFamily() {
        if (pageRef.current != null) {
            // @ts-ignore
            const spanText = pageRef.current.querySelectorAll(".react-pdf__Page__textContent span");
            setTimeout(() => {
                spanText.forEach((layer: { style: any; }) => {
                    // @ts-ignore
                    let {style} = layer;
                    style.fontFamily = 'serif';
                    style.color = ""

                });
            }, 1000)
        }
    }


    const onDocumentLoadSuccess = (page: any) => {
        const {numPages} = page;
        setNumPages(numPages);
    }

    function handler( key : KeyboardEvent) {

        if (KEY_Q.includes(key.code)) {
            changePage(pageNumber - 1);
        }

        if (KEY_D.includes(key.code)) {
            changePage(pageNumber + 1);
        }

        if (KEY_Z.includes(key.code)) {
            addScale(0.1);
        }

        if (KEY_S.includes(key.code)) {
            subractScale(0.1);
        }
    }

    function addScale(scaleToAdd: number) {
        if (scale < 3) {
            let nextScale = scale + scaleToAdd;
            setScales(nextScale);
        } else {
            setScales(3);
        }
    }

    function subractScale(scaleToSubstract: number) {
        if (scale > 1) {
            let previousScale = scale - scaleToSubstract;
            setScales(previousScale);
        } else {
            setScales(1);
        }
    }

    const changePage = (page: number) => {
        let nextPage = page;
        if (page <= 0) {
            nextPage = 1;
        }

        if (page >= numPages) {
            nextPage = numPages;
        }

        setPageNumber(nextPage);
        setPageSelected(""+nextPage);
    };

    const previousPage = () => {
        changePage(pageNumber - 1);

    };

    const nextPage = () => {
        changePage(pageNumber + 1);
    };

    const handleSearchText = (name: string, e: any) => {
        const key = e.key;
        if (key === 'Enter') {
            if (pageSelected !== "")
                changePage(parseInt(pageSelected));
        }
    };

    const onChangeSearchText = (name: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;

        if (typeof (pageSelected) !== "undefined") {
            setPageSelected(term);
        } else {
            setPageSelected("")
        }
    };

    return (
        <>
            <div className="title-pdf">{flux.name} - {documentName}</div>
            <div className={"container_content_document"} tabIndex={0}>

                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page inputRef={pageRef} onGetTextSuccess={removeFontFamily}  renderMode={"svg"} scale={scale}  pageNumber={pageNumber}/>
                </Document>

            </div>
            <div className="close-pdf-border">
                <div className="af-paging">
                    <div className="af-paging__limit">

                        <Link className="btn af-btn af-btn--quote one" id="link" to={{
                            pathname: '/open/' + flux.id
                        }}>
                            <span className="af-btn__text one">Fermer la visionneuse PDF</span>
                        </Link>
                    </div>

                    <div className="af-paging__pager" id="pdf-nav">
                        <nav className="af-pager">
                            <ul className="af-pager__pagination">
                                <li className="af-pager__item af-pager__item--disabled"><span
                                    className="af-pager__item-nolink"><button onClick={previousPage}
                                                                              disabled={pageNumber <= 1}>« Précédent</button></span></li>
                                <li>
                                    <input type="text" maxLength={3} placeholder="1" value={pageSelected}
                                           onKeyDown={(e: any) => handleSearchText('name', e)}
                                           onChange={(e) => onChangeSearchText('name', e)}
                                    /> / {numPages}
                                </li>
                                <li className="af-pager__item af-pager__item--disabled"><span
                                    className="af-pager__item-nolink"><button onClick={nextPage}
                                                                              disabled={pageNumber >= numPages}>Suivant »</button></span>
                                </li>
                                <li>
                                    <a className="af-btn--circle" title="Détails" role="button" onClick={e => subractScale(0.1)}><i className="glyphicon glyphicon-minus"></i></a>
                                </li>
                                <li>
                                    <a className="af-btn--circle" title="Détails" role="button" onClick={e => addScale(0.1)}><i className="glyphicon glyphicon-plus"></i></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

            </div>


        </>
    );
};

const enhanceAuth = compose<Props, Props>(
    withAuthentication(fetch)
);

const FileViewerAppEnhance = enhanceAuth(FileViewerApp);

export default FileViewerAppEnhance;

                                  je veux que lorsque je clique  sur le burron Fermer la visionneuse PDF il me rederige pas vers la premiere page  je garder la page ou jai  ouvri la page 
