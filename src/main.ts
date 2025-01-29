import { putInfosUserRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import { useOidcUser } from "../useOidc";
import { FC, useEffect, useState } from "react";
import "./SendUserInfos.scss";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const SendUserInfos: FC<Props> = ({ children }) => {
  const { oidcUser,  } = useOidcUser();
  const { email, axa_uid_racf, name, axa_uid_rdu, axa_type } = (oidcUser as any) || {};
  const { call, loaded,data } = useDelayApi(putInfosUserRoute);
  const [userAllowed, setUserAllowed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
      const e=await call({ email, userNumber: axa_uid_racf, name, axaUiRdu: axa_uid_rdu, axaType: axa_type });
      console.log(e,"ooooo")
      console.log(oidcUser,"kkkkkkkkkkkk")
        setUserAllowed(true);
      } catch (error) {
        console.error("Error while sending user infos to Maam", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, axa_uid_racf, name, axa_type]);
  return (
    <>
      {loaded ? (
        userAllowed ? (
          children
        ) : (
          <div className="bigCenteredMessage">Vous n'avez pas accès à Ellipse, veuillez contacter votre administrateur.</div>
        )
      ) : (
        <div className="bigCenteredMessage">Chargement de Ellipse en cours</div>
      )}
    </>
  );
};

export default SendUserInfos;     voic limplementation et que je ne pas la main cest just pour tu commprenne import { OidcClient, type OidcUserInfo } from '@axa-fr/oidc-client';
import { useEffect, useState } from 'react';

export enum OidcUserStatus {
  Unauthenticated = 'Unauthenticated',
  Loading = 'Loading user',
  Loaded = 'User loaded',
  LoadingError = 'Error loading user',
}

export type OidcUser<T extends OidcUserInfo = OidcUserInfo> = {
  user: T | null;
  status: OidcUserStatus;
};

export const useOidcUser = <T extends OidcUserInfo = OidcUserInfo>(
  configurationName = 'default',
  demonstrating_proof_of_possession = false,
) => {
  const oidc = OidcClient.get(configurationName);
  const user = oidc.userInfo<T>();
  const [oidcUser, setOidcUser] = useState<OidcUser<T>>({
    user: user,
    status: user ? OidcUserStatus.Loaded : OidcUserStatus.Unauthenticated,
  });
  const [oidcUserId, setOidcUserId] = useState<number>(user ? 1 : 0);
  const [oidcPreviousUserId, setPreviousOidcUserId] = useState<number>(user ? 1 : 0);

  useEffect(() => {
    const oidc = OidcClient.get(configurationName);
    let isMounted = true;
    if (oidc && oidc.tokens) {
      const isCache = oidcUserId === oidcPreviousUserId;
      if (isCache && oidc.userInfo<T>()) {
        return;
      }
      setOidcUser({ ...oidcUser, status: OidcUserStatus.Loading });
      oidc
        .userInfoAsync(!isCache, demonstrating_proof_of_possession)
        .then(info => {
          if (isMounted) {
            // @ts-ignore
            setOidcUser({ user: info, status: OidcUserStatus.Loaded });
          }
        })
        .catch(() => setOidcUser({ ...oidcUser, status: OidcUserStatus.LoadingError }));
      setPreviousOidcUserId(oidcUserId);
    } else {
      setOidcUser({ user: null, status: OidcUserStatus.Unauthenticated });
    }
    const newSubscriptionId = oidc.subscribeEvents((name: string) => {
      if (
        name === OidcClient.eventNames.logout_from_another_tab ||
        name === OidcClient.eventNames.logout_from_same_tab
      ) {
        if (isMounted) {
          setOidcUser({ user: null, status: OidcUserStatus.Unauthenticated });
        }
      }
    });
    return () => {
      isMounted = false;
      oidc.removeEventSubscription(newSubscriptionId);
    };
  }, [oidcUserId]);

  const reloadOidcUser = () => {
    setOidcUserId(oidcUserId + 1);
  };

  return { oidcUser: oidcUser.user, oidcUserLoadingState: oidcUser.status, reloadOidcUser };
};
 et voila le  console.log(e,"ooooo"):{
    "authority": [
        "ADMIN"
    ],
    "id": 263,
    "email": "zied.miladi.intm@axa.fr",
    "userNumber": "S875170",
    "axaType": "2",
    "name": "MILADI Zied",
    "portfolios": []
} et ca cest console.log(oidcUser,"kkkkkkkkkkkk"){
    "sub": "B609EN",
    "name": "MILADI Zied",
    "axa_type": "2",
    "given_name": "Zied",
    "family_name": "MILADI",
    "email": "zied.miladi.intm@axa.fr",
    "axa_uid_racf": "S875170"
}   ma demande cest de ajouter  la valeur  ADMIN dans  oidcUser  
