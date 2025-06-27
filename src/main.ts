export function contextManager(documentIds: number[]) {
  return ApiHandler("contexts/esign", documentIds, "POST", {});
}
  lapi cest diutpost et voci le retour {
  "success": true,
  "response": "35ad884b-a736-4838-ad46-02b6977b82bb"
}


  const debranchementEsign = async (docs: IDocument[]) => {
    const documentsIds = getDocumentsIds(docs);

    try {
      const [subscribers, ged] = await Promise.all([await getSubscribers(documentsIds), await getGed(documentsIds)]);
      const docsGed = mergeGedWithDocs(docs, ged.successData);
     //rajoute ci le retour de lapi pour les idContextmanager

      const esignObject = {
        identifiantAbonne: subscribers?.successData || [],
        urlEsign: config ? getDomainForUrl(config.urls.esign, config) : "",
        ged: docsGed,
        token: docsGed[0]?.token,
      };

      let url: any = getEsignUrl(docs, esignObject, config);
      window.open(url, "_blank");
    } catch (error) {
      throw error;
    }
  };
