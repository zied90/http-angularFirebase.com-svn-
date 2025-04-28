
       private final ManageDocument gedMngClient;
    //private final GedClientSelector gedClientSelector;
    private final DefaultApi defaultApi ;
    private final fr.axa.pfel.client.impl.DefaultApi defaultApi2 ;


    public GedServiceImpl(ManageDocument gedMngClient,
                          DefaultApi defaultApi, fr.axa.pfel.client.impl.DefaultApi defaultApi2) {
        this.gedMngClient = gedMngClient;
      //  this.gedClientSelector = gedClientSelector;
        this.defaultApi = defaultApi;
        this.defaultApi2 = defaultApi2;
    }

@Override
    public SearchDocumentsMetadatasResponse searchDocumentsFromGed(String user, String ecmRefDoc,
                                                                   String... projects) {
        SearchDocumentsMetadatasResponse SearchDocumentsMetadatasResponse = null;
        SearchDocumentsMetadatasRequest documentsMetadatasRequest=new SearchDocumentsMetadatasRequest();
        CommonParameters commonParameters= new CommonParameters();
        commonParameters.setLocale(CommonParameters.LocaleEnum.FR_FR);
        commonParameters.endUserType(user);
        documentsMetadatasRequest.setCommonParameters(commonParameters);
        documentsMetadatasRequest.setPredicate(Constants.PREDICATE_STRING + "('" + ecmRefDoc + "')");
        SearchDocumentsMetadatasResponse=  defaultApi.documentMetadatasSearchPost(documentsMetadatasRequest);
        return SearchDocumentsMetadatasResponse;
    }



  @Bean
    public DefaultApi frSearchApiDocumentsV2Vs(RestClientBuilderFactory restClientBuilderFactory){
        return restClientBuilderFactory
                .configureFromEnvironment(GED_REST_SERVICE)
                .withJsonForm()
                .createClient(DefaultApi.class);
    }




clients:
  fr-ged-api-documents-v2-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs
    compress: false
    auth: oauth
    auth-config:
      grant-type: application
      token-endpoint: https://onelogin.dev.axa.com/as/token.oauth2
      scopes: urn:axa:france:ged:cst urn:axa:france:ged:mng urn:axa:france:ged:src

      client-assertion: jwt
