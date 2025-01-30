// import { putInfosUserRoute } from "Api/ApiRoutes";
// import { useDelayApi } from "hooks/useApi";
import { useOidcAccessToken, useOidcUser } from "../useOidc";
import React, { FC, useEffect } from "react";
import "./SendUserInfos.scss";
import { useMutation } from "react-query";
import { getUserInfos } from "@/api/apifunctions/user";
//import { HTTP } from "@/api/config/apiHandler";
import userStore from "@/stores/userStore";
import { setApiToken } from "@/api/config/apiHandler";
import useFilters from "@/pages/Filters/useFilters";

interface Props {
  className?: string;
  children?: React.ReactNode;
  //onSuccess: (successData: any) => void;
}

const SendUserInfos: FC<Props> = ({ children }) => {
  const { setUser, setAuthToken } = userStore();
  const { filtersInUrl, setFilters } = useFilters();


  const { oidcUser } = useOidcUser();
  const { email, axa_uid_racf, name, axa_type, axa_uid_rdu } = (oidcUser as any) || {};
  const [userAllowed, setUserAllowed] = React.useState(false);
  const { accessToken } = useOidcAccessToken();

  const {
    mutate: getUser,
    isLoading,
    isError,
    
  } = useMutation(
    async () => {
      return await getUserInfos({
        idRacf: axa_uid_racf,
        email,
        name,
        idRdu: axa_uid_rdu,
        axaType: axa_type,
      });
    },
    {
      onSuccess({ successData, authToken }) {
        setUserAllowed(true);
        setUser({
          ...successData
        });

        if (!filtersInUrl) {
          delete successData.defaultRequest.pagination;
          setFilters(successData.defaultRequest);
        }
      },
    }
  );

  useEffect(() => {
    (async () => {
      try {
        if (!name || !accessToken) return;
        if (accessToken) {
          setAuthToken(accessToken);
          setApiToken(accessToken);
        }
        await getUser();
      } catch (error) {
        console.error("Error while sending user infos to api", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, axa_uid_racf, name, axa_type, accessToken]);
  return (
    <>
      {isLoading ? (
        <div className="bigCenteredMessage">Chargement de Spoolnet en cours</div>
      ) : !userAllowed || isError ? (
        <div className="bigCenteredMessage">
          Vous n'avez pas accès à Spoolnet, veuillez contacter votre administrateur.
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default SendUserInfos;
import React, { FC, useEffect } from "react";
import { OidcProvider, OidcSecure, useOidc, useOidcAccessToken } from "@axa-fr/react-oidc";
import { OIDC_CONFIGURATION } from "@/config/config-env";
import SendUserInfos from "./SendUserInfos";

type Props = {
  children?: React.ReactNode;
};

const Oidc: FC<Props> = ({ children }) => {

/*   if (document.location.search.includes("error=access_denied")) {

    return (
      <div className="bigCenteredMessage">
        Vous n'avez pas accès à Spoolnet, veuillez contacter votre administrateur.
      </div>
    );
  } */
  console.log('yy', OIDC_CONFIGURATION);
  return (
    <OidcProvider configuration={OIDC_CONFIGURATION}>
      <OidcSecure>
        <SendUserInfos>{children}</SendUserInfos>
      </OidcSecure>
    </OidcProvider>
  );
};

export default Oidc;
/**
 *  This class decorate oidc hooks from react-oidc and return mocked hooks if oidc is disabled
 *  Use only in development mode
 */
export { useOidc, useOidcAccessToken, useOidcUser, OidcSecure } from "@axa-fr/react-oidc";

import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "./App.scss";
import "./theme.scss";
import ContainerApp from "@/pages/Container/containerApp";
// import configEnv from "@/config/config-env";
import AppWithProviders from "./Providers";
import ModalContainer from "react-modal-promise";

// !Mocking api calls in development mode
// if (configEnv.useMSW) {
//   const { worker } = await import("./mocks/mswWorker");
//   await worker.start({
//     onUnhandledRequest: "bypass",
//   });
// }

const App = () => {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppWithProviders>
          <ContainerApp />
          <ModalContainer />
        </AppWithProviders>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
import { useChainProviders } from "react-flat-providers";
import Oidc from "./oidc/Oidc";
import GlobalAlertProvider from "./components/GlobalAlert/GlobalAlertContext";
/** provide all the providers and flatten them. */
import { ReactNode } from "react";


type AppWithProvidersProps = {
  children: ReactNode;
};

const AppWithProviders = ({ children }: AppWithProvidersProps) => {
  const FlatChainedProviders = useChainProviders().add(GlobalAlertProvider).add(Oidc).make();
/*   const a = useOidc();
  console.log(a);
  console.log('FlatChainedProviders', FlatChainedProviders); */
 // return <p> bienvenue</p>
 return  <FlatChainedProviders>{children}</FlatChainedProviders>;
};

export default AppWithProviders;
import { TokenAutomaticRenewMode, TokenRenewMode } from "@axa-fr/react-oidc";
import devConfig from "./env-dev.json";
import stageConfig from "./env.json";

const configEnv: any =
  import.meta.env.MODE === "development" || import.meta.env.MODE === "test" ? devConfig : stageConfig;
configEnv.api_url = window.CY_API_URL || import.meta.env.VITE_API_URL || "/api/v1/";
configEnv.api_url = configEnv.api_url.replace(/\/+$/, "");

configEnv.useMSW = import.meta.env.VITE_API_MOCK && !window.CY_API_URL;

/* OIDC */
export const OIDC_MOCK_ENABLED = import.meta.env.VITE_OIDC_MOCK_ENABLED === "true";

const OIDC_SERVER_CONFIG = configEnv.OIDC_CONFIGURATION;

OIDC_SERVER_CONFIG.redirect_uri = window.location.origin + OIDC_SERVER_CONFIG.redirect_uri;
OIDC_SERVER_CONFIG.token_renew_mode = TokenRenewMode.access_token_invalid;
OIDC_SERVER_CONFIG.token_automatic_renew_mode = TokenAutomaticRenewMode.AutomaticOnlyWhenFetchExecuted;

if (import.meta.env.VITE_LOCAL_ENV) {
  OIDC_SERVER_CONFIG.authority = "/maam/v2";
}

export const OIDC_CONFIGURATION = OIDC_SERVER_CONFIG;
export default configEnv;
{
  "api_url": "http://localhost:3000",
  "OIDC_CONFIGURATION": {
    "client_id": "9fe8b203",
    "redirect_uri": "/authentication/callback",
    "scope": "email openid profile urn:axa:france:SpoolnetNG urn:axa:france:distribution urn:axa:france:tpag urn:axa:france:wac",
    "authority": "https://onelogin.dev.axa.com",
    "service_worker_only": false
  }
}

lorsque je le correct avec quelqun inconnu  jai ca dans url et  qui se boucle dan infini http://localhost:3000/authentication/callback?error_description=Not+authorized+-+User+not+known&iss=https%3A%2F%2Fonelogin.dev.axa.com&state=BB3TRzf3tNhDC0Cl&error=access_denied#.  mais moi je veux que se sois message comme si vous navze pas acces a spoolnet  car je nai pas amimer la facon comme ca 
  if (document.location.search.includes("error=access_denied")) {

    return (
      <div className="bigCenteredMessage">
        Vous n'avez pas accès à Spoolnet, veuillez contacter votre administrateur.
      </div>
    );
  
