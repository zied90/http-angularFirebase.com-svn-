clients:
  fr-ged-api-documents-v2-vs:
    endpoint: https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs
    compress: false
    auth: oauth
    auth-config:
      grant-type: application
      token-endpoint: https://onelogin.dev.axa.com/as/token.oauth2
      scopes: urn:axa:france:ged:cst urn:axa:france:ged:mng urn:axa:france:ged:src
      client-id: 51388898
      client-secret: exempetscrettttt
      client-assertion: jwt


    @Bean
    public GetDocumentApi frGetApiDocumentsV2Vs(RestClientBuilderFactory restClientBuilderFactory){
        return restClientBuilderFactory
                .configureFromEnvironment(GED_REST_SERVICE)
                //.withInterceptors(template->template.header("Accept", ""))
                //.withCodec(new Encoder.Default(), new Decoder.Default())
                .createClient(GetDocumentApi.class);
    }


openapi: 3.0.0
info:
  version: "1.0"
  title: "GED - GetDocumentContent"
paths:
  /document/binary/content:
    post:
      tags:
        - getDocument
      summary: "GetDocumentContent / multi part response"
      requestBody:
        description: "GetDocumentContent Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/GetDocumentContentRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            multipart/form-data: # <-- Content-Type of the response
              schema:
                type: object
                properties:
                  getDocumentContentResponse:
                    $ref: '#/components/schemas/GetDocumentContentResponse'
                  file:
                    type: string
                    format: binary
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2:
            - urn:axa:france:ged:cst
components:
  securitySchemes:
    OAuth2:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://maam-dev.axa.com/maam/v2/token
          scopes:
            urn:axa:france:ged:cst: Consult
  schemas:
    BusinessError:
      type: object
      properties:
        Status:
          type: string
        Code:
          type: string
        Label:
          type: string
        Message:
          type: string
    GetDocumentContentRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        DocId:
          type: string
      required:
        - DocId
        - CommonParameters
    GetDocumentContentResponse:
      type: object
      properties:
        Status:
          type: string
        Name:
          type: string
        Extension:
          type: string
        MimeType:
          type: string

    CommonParameters:
      type: object
      properties:
        Locale:
          type: string
          enum: [fr-fr, en-us]
        EndUserId:
          type: string
        EndUserType:
          type: string
        ApplicationCaller:
          type: string
        ObjectStore:
          type: string
      required:
        - Locale


apartir de swagger ona generer ca  package fr.axa.pfel.client.impl;

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

@jakarta.annotation.Generated(value = "org.openapitools.codegen.languages.JavaClientCodegen", date = "2025-05-05T13:08:36.846685100+02:00[Europe/Paris]", comments = "Generator version: 7.9.0")
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
  avec des model dans target       <dependency>
      <groupId>fr.axa.honey.framework</groupId>
      <artifactId>honey-restclient-starter</artifactId>
    </dependency>
