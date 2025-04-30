
package fr.axa.pfel.client.impl;

import fr.axa.honey.client.rest.feign.ApiClient;
import fr.axa.honey.client.rest.feign.EncodingUtils;
import fr.axa.pfel.client.model.ApiResponse;

import fr.axa.pfel.client.model.BusinessError;
import fr.axa.pfel.client.model.DocumentBinaryContentPost200Response;
import fr.axa.pfel.client.model.GetDocumentContentRequest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import feign.*;

@jakarta.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2025-04-30T17:44:57.257536+02:00[Europe/Paris]", comments = "Generator version: 7.9.0")
public interface GetDocumentApi extends ApiClient.Api {


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

  /**
   * GetDocumentContent / multi part response
   * Similar to <code>documentBinaryContentPost</code> but it also returns the http response headers .
   * 
   * @param getDocumentContentRequest GetDocumentContent Request (required)
   * @return A ApiResponse that wraps the response boyd and the http headers.
   */
  @RequestLine("POST /document/binary/content")
  @Headers({
    "Content-Type: application/json",
    "Accept: application/json,multipart/form-data",
  })
  ApiResponse<DocumentBinaryContentPost200Response> documentBinaryContentPostWithHttpInfo(GetDocumentContentRequest getDocumentContentRequest);


}
