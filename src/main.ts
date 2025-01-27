import { useAxios } from "@/hooks/useAxios";
import { useOidcAccessToken } from "@/oidc/useOidc";
import { useContext } from "react";
import { AlertTypeEnum } from "@/toolkit/Components/Alert/Alert.type";
import { GlobalAlertContext } from "@/toolkit/Components/GlobalAlert/GlobalAlertContext";
import ApiRoute from "@/types/ApiRoute.type";
import AxiosOptions from "@/types/AxiosOptions.type";
import { DEFAULT_API_ERROR_MESSAGE, getAlertMessage, simplifyParams } from "@/Utils/ApiUtils";

export const useApi = (route: ApiRoute, localParams: any = null, axiosOptions: AxiosOptions = {}) => {
  const { accessToken } = useOidcAccessToken();
  const { addAlert } = useContext(GlobalAlertContext);

  const accessTokenHeader = accessToken
    ? {
        Authorization: `Bearer ${accessToken}`,
      }
    : {};
  const config = {
    headers: {
      ...accessTokenHeader,
    },
  };

  let { currentRoute, axiosParams } = simplifyParams(route, localParams, localParams);

  const newAxiosOptions = { ...axiosOptions, ...currentRoute.axiosOptions };
  newAxiosOptions.routeId = currentRoute.id;
  newAxiosOptions.data = axiosParams.datas;
  newAxiosOptions.params = axiosParams.params;
  newAxiosOptions.method = currentRoute.method;
  newAxiosOptions.cache = currentRoute.cache || false;
  newAxiosOptions.cacheMethods = currentRoute.method ? [currentRoute.method] : ["GET"];
  newAxiosOptions.ttl = currentRoute.ttl || 0;
  newAxiosOptions.headers = config.headers;

  const updateLocalDataFn = (data: any) => {
    updateLocalData(data);
  };

  const {
    cancel,
    data,
    error,
    loaded,
    loadedOnce,
    call: callAxios,
    clearError,
    updateLocalData,
  } = useAxios(currentRoute.path, newAxiosOptions as AxiosOptions);

  const call = async (params?: any): Promise<any> => {
    let { currentRoute, axiosParams } = simplifyParams(route, params, localParams);

    try {
      const result = await callAxios(axiosParams, currentRoute);

      if (route.alertSuccess) {
        addAlert({
          // @ts-ignore
          message: route.alertSuccess.message,
          type: AlertTypeEnum.success,
        });
      }
      return route.responseConverter ? route.responseConverter(result) : result;
    } catch (e: any) {
      route.alertError
        ? addAlert({
            message: getAlertMessage(route.alertError, e.response?.data),
            // @ts-ignore
            type: route.alertError.type || AlertTypeEnum.error,
          })
        : addAlert({
            message: e.response?.data?.message || DEFAULT_API_ERROR_MESSAGE,
            type: AlertTypeEnum.error,
          });

      console.error(e);
      throw e;
    }
  };

  return { cancel, data, error, loaded, loadedOnce, call, clearError, updateLocalData: updateLocalDataFn };
};

export const useDelayApi = (route: ApiRoute, params: any = null, axiosOptions: AxiosOptions = {}) => {
  return useApi(route, params, { ...axiosOptions, atStart: false });
};
