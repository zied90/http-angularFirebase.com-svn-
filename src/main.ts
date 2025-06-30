export default function getDomainForUrl(url: string, config: IConfiguration | null) {
  if (config === null) return url;
  const hostName = window.location.hostname;
  const hostNameSub = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
  return url.replace(config.domainKey, hostNameSub);
}
https://e-signature-recprj.localhost/?contexteId= 


const formatEsignUrl = (config: IConfiguration, contextId: string) => {
  const baseUrl = getDomainForUrl(config.urls.esign, config);
  console.log(baseUrl, "baseUrl");
  return `${baseUrl}identiteNumerique/contexteId/${contextId}`;
  // remove null values
  /*   Object.keys(params).forEach((key) => (params[key] === null || params[key] === undefined ? delete params[key] : null));
  return getDomainForUrl(config.urls.esign, config) + new URLSearchParams(params).toString().replace(/%3B/g, ";"); */
};

https://e-signature-recprj.localhost/?contexteId=identiteNumerique/contexteId/3603f678-bf1c-4d75-af32-6490d51152a9
