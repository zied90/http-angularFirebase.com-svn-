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
            application/octet-stream: # <-- Content-Type of the response
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
