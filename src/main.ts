 search: `?type=${state.search.editionType}&name=${state.search.editionName}&receptionDate=${state.search.receptionDate}&fluxStatus=${state.search.fluxStatus}&fluxSubmit=${state.search.fluxSubmit}`,
   <Link
                        className="af-btn--circle"
                        title="Ouvrir"
                        role="button"
                        to={{
                          pathname: `/open/${id}`,
                          search: buildSearchParams(state),
                        }}
                      >
                        <i className="glyphicon glyphicon-folder-open" />
                      </Link>

                   rgument of type '{ fluxList: Flux[]; totalResults: number; currentPage: number; loaderMode: string; name: string; type: string; status: string; submit: string; dateCreation: string | null; idFlux: number; ... 4 more ...; saveable: boolean; }' is not assignable to parameter of type 'Record<string, string | number | boolean | null | undefined>'.
  Property 'fluxList' is incompatible with index signature.
    Type 'Flux[]' is not assignable to type 'string | number | boolean | null | undefined'.ts(2345)
const state: {
    fluxList: Flux[];
    totalResults: number;
    currentPage: number;
    loaderMode: string;
    name: string;
    type: string;
    export function buildSearchParams(paramsObj: Record<string, string | number | boolean | null | undefined>): string {
    const params = new URLSearchParams();
    Object.entries(paramsObj).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
    return params.toString() ? `?${params.toString()}` : "";
   }

            <Link
                        className="btn af-btn af-btn--quote"
                             /*    to={{
                                    pathname: `/workspaces/${workspaceId}/flow-list`,
                                    search: `workspaceId=${workspaceId}&type=${searchParmsDoc.type}&name=${searchParmsDoc.name}&sortField=receptionDate&sortOrder=desc&page=0&size=10&fluxStatus=${searchParmsDoc.fluxStatus}&fluxSubmit=${searchParmsDoc.fluxSubmit}&receptionDate=${searchParmsDoc.receptionDate}`
                                }} */
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
                            <span className="af-btn__text" style={{paddingLeft: "2rem"}}>Retour à la liste des fluxxxxxxxx </span>
                        </Link>
