const formatEsignUrl = (config: IConfiguration, params: any) => {
  // remove null values
  Object.keys(params).forEach((key) => (params[key] === null || params[key] === undefined ? delete params[key] : null));
  return getDomainForUrl(config.urls.esign, config) + new URLSearchParams(params).toString().replace(/%3B/g, ";");
};
