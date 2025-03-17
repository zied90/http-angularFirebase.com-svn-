import { ChangeEvent } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Title } from "@axa-fr/react-toolkit-layout-header";
import Loader from "@axa-fr/react-toolkit-loader";
import HeaderApp from "@/components/header/header";
import FooterApp from "@/components/footer/footer";
import { SwitchToggle, RefreshButton } from "@/components/filter";
import DocumentsApp from "@/pages/Documents/documentsApp";
import ActsApp from "@/pages/Documents/ActsApp";
import FilterApp from "@/pages/Filters/filterApp";
import userStore from "@/stores/userStore";
import configStore from "@/stores/configStore";
import massActionStore from "@/stores/massActionStore";
import MassActionResolver from "@/resolvers/massActionResolver";
import { GetConfiguration } from "@/api/apifunctions/configuration";
import usePagination from "@/hooks/usePagination";
import useSort from "@/components/SortButton/useSort";
import { useSearchParams } from "react-router-dom";
import GlobalAlert from "@/components/GlobalAlert";

const ContainerApp: React.FC = () => {
  const { setMassAction } = massActionStore();
  const { token } = userStore();
  const { getParamsKeys: getPaginationParamKeys } = usePagination();
  const { getParamsKeys: getSortParamKeys } = useSort();
  const { setConfig } = configStore();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const groupByAct = searchParams.get("groupact") === "true";
  const setGroupByAct = (value: boolean) => {
    const paramsKeys = [...getPaginationParamKeys(), ...getSortParamKeys()];
    const newSearchParams = new URLSearchParams(searchParams);
    paramsKeys.forEach((key) => newSearchParams.delete(key));
    // keep the number of items per page between switch of document/acts
    if (searchParams.get("numberItems")) {
      newSearchParams.set("numberItems", searchParams.get("numberItems") as string);
    }
    newSearchParams.set("groupact", value.toString());
    setSearchParams(newSearchParams);
  };

  const { isLoading: isLoadingConfig } = useQuery(["configuration", token], () => GetConfiguration(), {
    onSuccess({ successData }) {
      setConfig(successData);
    },
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
  });

  /** End authentication */

  const switchList = (e: ChangeEvent<HTMLInputElement>) => {
    setGroupByAct(e.target.checked);
    setMassAction([]);
  };

  // const { mutateAsync: updateActs, isLoading: isLoadingActs } = useMutation(findDocumentsByacts, {
  //   onSuccess({ successData }) {
  //     setDocumentsByAct(successData);
  //   },
  // });

  function refreshDocumentApp() {
    // reset pagination to page 1
    setSearchParams({ ...Object.fromEntries(searchParams), page: "1" });
    if (groupByAct) {
      queryClient.refetchQueries(["findact"]);
      // updateActs({ ...docFilters, actOpened: openedActs?.toString() });
    } else {
      queryClient.refetchQueries(["finddoc"]);
    }
  }

  return (
    <Loader mode={isLoadingConfig ? "get" : "none"} text="Chargement en cours">
      <div data-testid="container-app">
        <GlobalAlert />
        <div className="af-layout__wapper">
          <HeaderApp />
          <Title title="Résultat de la recherche" />
          <div className="container">
            <div className="app-toolbar">
              <SwitchToggle onChange={switchList} value={groupByAct} />
              <RefreshButton onClick={refreshDocumentApp} />
              <MassActionResolver />
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-12 no-space-in-mobile">
                <FilterApp actIsDisabled={groupByAct} />
              </div>
              <div className="col-lg-9 col-md-12 full-space-in-mobile">
                {groupByAct ? <ActsApp /> : <DocumentsApp />}
              </div>
            </div>
          </div>
          <FooterApp />
        </div>
      </div>
    </Loader>
  );
};

export default ContainerApp;
