Unexpected character ('-' (code 45)) in numeric value: expected digit (0-9) to follow minus sign, for valid numeric value
 at [Source: REDACTED (`StreamReadFeature.INCLUDE_SOURCE_IN_LOCATION` disabled); line: 1, column: 2] reading POST https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/document/binary/content


openapi: 3.0.0
info:
  version: "1.0"
  title: "GED - GetDocumentContent"
paths:
  /document/binary/content:
    post:
      tags:
        - getDocument
      summary: "Get document content"
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/GetDocumentContentRequest"
      responses:
        "200":
          description: "Document content info"
          content:
            multipart/form-data:
              schema:
                $ref: "#/components/schemas/GetDocumentContentResponse"
        "500":
          description: "Error"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: [urn:axa:france:ged:cst]
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
        - CommonParameters
        - DocId
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
