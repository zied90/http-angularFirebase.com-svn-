const mockSetSearchParams = vi.fn();
let mockSearchParamCallArgument: any = null;
vi.mock("react-router-dom", async (importOriginal) => {
  const mod: object = await importOriginal();
  return {
    ...mod,
    useSearchParams: (mockSearchParam: any) => {
      const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
      return [
        params,
        (newParams: string) => {
          mockSearchParam = newParams;
          mockSearchParamCallArgument = newParams;
          mockSetSearchParams(newParams);
          setParams(new URLSearchParams(newParams));
        },
      ];
    },
  };
});

 it("should switch to groupAct", async () => {
    const node = (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ContainerApp />
        </QueryClientProvider>
      </BrowserRouter>
    );
    const { getByTestId } = render(node);
    const switchToggle = getByTestId("switch-act-doc") as HTMLInputElement;
    expect(switchToggle.checked).toBe(true);
    await act(() => fireEvent.click(switchToggle));
    expect(mockSetSearchParams).toHaveBeenCalledWith(mockSearchParamCallArgument);
  });

 FAIL  src/pages/Container/containerApp.test.tsx > ContainerApp > should switch to groupAct
AssertionError: expected "spy" to be called with arguments: [ null ]

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
import { useState, useEffect } from "react";
import { getGroupByActFromLocalStorage, setGroupByActInLocalStorage } from "@/utils/localStorage";

const ContainerApp: React.FC = () => {
  const { setMassAction } = massActionStore();
  const { token } = userStore();
  const { getParamsKeys: getPaginationParamKeys } = usePagination();
  const { getParamsKeys: getSortParamKeys } = useSort();
  const { setConfig } = configStore();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // State for groupByAct with default value
  const [groupByAct, setGroupByActState] = useState<boolean>(getGroupByActFromLocalStorage);

  // Update localStorage whenever groupByAct changes
  useEffect(() => {
    setGroupByActInLocalStorage(groupByAct);
  }, [groupByAct]);

  const setGroupByAct = (value: boolean) => {
    const paramsKeys = [...getPaginationParamKeys(), ...getSortParamKeys()];
    const newSearchParams = new URLSearchParams(searchParams);
    paramsKeys.forEach((key) => newSearchParams.delete(key));
    setGroupByActState(value); // Update state
    setSearchParams(newSearchParams);
  };

  const { isLoading: isLoadingConfig } = useQuery(["configuration", token], () => GetConfiguration(), {
    onSuccess({ successData }) {
      setConfig(successData);
    },
    enabled: Boolean(token),
    refetchOnWindowFocus: false,
  });

  const switchList = (checked: boolean) => {
    setGroupByAct(checked);
    setMassAction([]);
  };

  function refreshDocumentApp() {
    setSearchParams({ ...Object.fromEntries(searchParams), page: "1" });
    if (groupByAct) {
      queryClient.refetchQueries(["findact"]);
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
          <Title title="" />
          <div className="container">
            <div className="app-toolbar">
              <SwitchToggle onChange={switchList} value={groupByAct} />
              |
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
 comment corriger ca ilrecupere maintenat data de local storage par de pparametre 
