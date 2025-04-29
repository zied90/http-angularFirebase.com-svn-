
    /**
     * Call SearchDocuments from GED to retrieve IDs from corresponding documents
     */
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
