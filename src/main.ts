import { useQuery } from "react-query";
import Loader from "@axa-fr/react-toolkit-loader";
import ListActs from "@/components/documents/listActs";
import filtersStore from "@/stores/documents/filtersStore";
import documentStore from "@/stores/documents/documentStore";
import userStore from "@/stores/userStore";
import { findDocumentsByacts } from "@/api/apifunctions/findDocumentsByAct";
import useFilters from "../Filters/useFilters";
import useDocFilters from "@/hooks/useDocFilters";
import EdiSubcribe from "@/components/EdiSubcribe";
import { IUser } from "@/types/user";

const ActsApp: React.FC = () => {
  const { openedActs } = filtersStore();
  const { filters } = useFilters();

  const { docFilters } = useDocFilters();

  const { documentsByAct, setDocumentsByAct } = documentStore();
  const { token, user } = userStore();
  const {
    profile: { subscribeEdi },
    ediSubscriptionUrl,
  } = user as IUser;

  const { isError, isFetching } = useQuery(
    ["findact", docFilters, token],
    () =>
      findDocumentsByacts({
        ...docFilters,
        actOpened: openedActs?.toString(),
      }),
    {
      onSuccess({ successData }) {
        setDocumentsByAct(successData);
      },
      enabled: !!(filters && token),
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  return (
    <>
      {isError && <div>TODO message errors </div>}
      <Loader mode={isFetching ? "get" : "none"} text="Chargement en cours">
        {documentsByAct && (
          <>
            <EdiSubcribe subscribeEdi={subscribeEdi} subscriptionUrl={ediSubscriptionUrl} />
            <ListActs />
          </>
        )}
      </Loader>
    </>
  );
};

export default ActsApp;


j ai une question  si ilya isError  le mesaage cava affichjer  <div>TODO message errors </div>} est ce que si par exemple dans un autre  appel ca marche est ce que le message reste toujours afficher ?
