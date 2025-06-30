
const formatEsignUrl = (config: IConfiguration, params: any) => {
  // remove null values
  Object.keys(params).forEach((key) => (params[key] === null || params[key] === undefined ? delete params[key] : null));
  return getDomainForUrl(config.urls.esign, config) + new URLSearchParams(params).toString().replace(/%3B/g, ";");
};
const getEsignUrl = (docsSelected: IDocument[], esignObject: any, config: IConfiguration | null) => {
  if (config === null) throw new Error("Configuration object is null");
  // const ids = getDocumentsIds(docsSelected);

  //const { docPfel, ged } = getGedAttribute(esignObject.ged);
  //const token = esignObject.ged[0]?.token;

  const document = docsSelected[0];

  const baseParams: any = {
    client: document.clientNumber ? addLeadingZeros(document.clientNumber, 10) : null,
    contrat: document.contractNumber ? addLeadingZeros(document.contractNumber, 16) : null,
    // abonne: esignObject?.identifiantAbonne?.join(";") || "",
    //token: token,
    // docPfel: docPfel,
    //ged: ged,
  };

  /*  let paramsList = [...baseParamsList];
  let perimeter = getPerimeter(docsSelected, templatesPerimetres);
  baseParams.perimetre = perimeter?.name || undefined;

  if (perimeter?.add) paramsList = [...paramsList, ...perimeter.add];
  if (perimeter?.use) paramsList = [...perimeter.use];
  let params: any = {};

  paramsList.forEach((key) => {
    if (baseParams[key] === undefined || baseParams[key] === null) return;
    params[key] = baseParams[key];
  }); */

  // if no perimeters found, return url with the base parameters
  return formatEsignUrl(config, esignObject.contextId);
};

jai ca https://e-signature-recprj.localhost/?contexteId=6c48c7bc-0934-4494-97fb-b7bce8889dba=  mais mo je veux ca  https://e-signature-recprj.axa-fr.intraxa/identiteNumerique/contexteId/6c48c7bc-0934-4494-97fb-b7bce8889dba
