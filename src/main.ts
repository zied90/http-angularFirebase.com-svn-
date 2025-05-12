la rponse de lapi avec postman =>---OjNmoVvJSCVdyjOHKJc_RlTdocfTwf_zvxhG
Content-Disposition: form-data; name="file"
Content-Type: application/octet-stream
Content-Length: 56194

GIF89a��3f���++3+f+�+�+�UU3UfU�U�U���3�f��������3�f��������3�fՙ������3�f������33333�3�33�f3ՙ3��3��3�3�33�f3��3��3��ff3fff�+f�+
  �5y�,�Y�����W&�#��q�Bw=���{c�h[
���[	y���*£s���t�Z��-r�����{�=7�8Ʈ�ƞa]�b�k�ٰ��a��j���1���ݺ}����3�$w%ۙ
<ƂP���>H��V�C���7�ha�k�>�9���GZ�Ɩ���
>���}�,�Q�rgkZ�p�<��}�Z\Ag0�
��T��N�˥�Q�`�7�bEKi��c����W܊��ε.\)�W�l���m��3c󎤰5�zWtL׼�?���!;
---OjNmoVvJSCVdyjOHKJc_RlTdocfTwf_zvxhG
Content-Disposition: form-data; name="getDocumentContentResponse"
Content-Type: text/plain;charset=UTF-8
Content-Length: 71

{"status":"OK","name":"doc10","extension":"gif","mimeType":"image/gif"}
---OjNmoVvJSCVdyjOHKJc_RlTdocfTwf_zvxhG--


mon code existant 

  @Bean
    public GetDocumentApi frGetApiDocumentsV2Vs(RestClientBuilderFactory restClientBuilderFactory){

        return restClientBuilderFactory
                .configureFromEnvironment(GED_REST_SERVICE)
                .withCodec(new FormEncoder(new JacksonEncoder()), feignDecoder())
                .createClient(GetDocumentApi.class);
    }
 @Bean
    public Decoder feignDecoder() {
        return new JacksonDecoder();
    }

       public DocumentBinaryContentPost200Response getDocumentGed(String user, List<SearchDocumentsMetadatasResponseDocumentsInner> documents,
                                                               String... projects) {
        DocumentBinaryContentPost200Response response=new DocumentBinaryContentPost200Response();

        for (SearchDocumentsMetadatasResponseDocumentsInner document : documents) {
            GetDocumentContentRequest input = initGetDocumentRequest(user, document.getDocId(),projects);
               return getDocApi.documentBinaryContentPost(input);
        }

        return null ;
    }


    getDocApi.documentBinaryContentPost(input); retourn status 200 mais avec erreur :Unexpected character ('-' (code 45)) in numeric value: expected digit (0-9) to follow minus sign, for valid numeric value
 at [Source: REDACTED (`StreamReadFeature.INCLUDE_SOURCE_IN_LOCATION` disabled); line: 1, column: 2] reading POST https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/document/binary/content
ca est geneter pa ler swagger 

  /**
   * GetDocumentContent / multi part response
   * 
   * @param getDocumentContentRequest GetDocumentContent Request (required)
   * @return DocumentBinaryContentPost200Response
   */
  @RequestLine("POST /document/binary/content")
  @Headers({
    "Content-Type: application/json",
    "Accept: application/json,multipart/form-data",
  })
  DocumentBinaryContentPost200Response documentBinaryContentPost(GetDocumentContentRequest getDocumentContentRequest);


  et  DocumentBinaryContentPost200Response contient  private GetDocumentContentResponse getDocumentContentResponse;

  public static final String JSON_PROPERTY_FILE = "file";
  private feign.form.FormData file;  et lautre dociumentcontent response contient  public static final String JSON_PROPERTY_STATUS = "Status";
  private String status;

  public static final String JSON_PROPERTY_NAME = "Name";
  private String name;

  public static final String JSON_PROPERTY_EXTENSION = "Extension";
  private String extension;

  public static final String JSON_PROPERTY_MIME_TYPE = "MimeType";
  private String mimeType;  comment faire pouir resoudree pb 
