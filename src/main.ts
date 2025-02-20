 search: `?type=${state.search.editionType}&name=${state.search.editionName}&receptionDate=${state.search.receptionDate}&fluxStatus=${state.search.fluxStatus}&status=${status}&fluxSubmit=${state.search.fluxSubmit}`,


      <Link
                        className="btn af-btn af-btn--quote"
                                to={{
                                    pathname: `/workspaces/${workspaceId}/flow-list`,
                                    search: `workspaceId=${workspaceId}&type=${searchParmsDoc.type}&name=${searchParmsDoc.name}&sortField=receptionDate&sortOrder=desc&page=0&size=10&fluxStatus=${searchParmsDoc.fluxStatus}&fluxSubmit=${searchParmsDoc.fluxSubmit}&receptionDate=${searchParmsDoc.receptionDate}`
                                }}
                                >
                            <i className="glyphicon glyphicon-arrowthin-left"/>
                            <span className="af-btn__text" style={{paddingLeft: "2rem"}}>Retour à la liste des fluxxxxxxxx </span>
                        </Link>
