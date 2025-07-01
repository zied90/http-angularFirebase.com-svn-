const formatEsignUrl = (config: IConfiguration, contextId: string) => {

 if (!contextId) {
   throw new Error("contextId is required");
 }
  return getDomainForUrl(config.urls.esign, config) + contextId;
};
