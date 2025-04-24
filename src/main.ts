
openapi: 3.0.0

info:

  version: "1.0"

  title: "Service GED SAM v2"

  description: "Opération UploadDocument de GED SAM V2"

paths:

  /uploadDocument:

    post:

      summary: "UploadDocument"

      requestBody:

        required: true

        content:

          multipart/form-data:

            schema:

              type: object

              required:

                - UploadRequest

                - Content

              properties:

                UploadRequest:

                  $ref: '#/components/schemas/UploadDocumentRequest'

                Content:

                  type: string

                  format: binary

      responses:

        "200":

          description: "OK"

          content:

            application/json:

              schema:

                $ref: "#/components/schemas/UploadDocumentResponse"

        "500":

          description: "KO"

          content:

            application/json:

              schema:

                $ref: "#/components/schemas/BusinessError"

      security:

        - OAuth2:

            - urn:axa:france:ged:mng

components:

  securitySchemes:

    OAuth2:

      type: oauth2

      flows:

        clientCredentials:

          tokenUrl: https://maam-dev.axa.com/maam/v2/token

          scopes:

            urn:axa:france:ged:cst: Consult

            urn:axa:france:ged:mng: Manage

            urn:axa:france:ged:src: Search

            urn:axa:france:ged:saveas: SaveAs

  schemas:

    UploadDocumentRequest:

      type: object

      properties:

        CommonParameters:

          $ref: "#/components/schemas/CommonParameters"

        Interaction:

          type: string

          enum: [ 'sync','async' ]

        CallbackAddress:

          type: string

        DocumentProperties:

          $ref: "#/components/schemas/DocumentProperties"

      required:

        - CommonParameters

        - DocumentProperties

    UploadDocumentResponse:

      type: object

      properties:

        Status:

          type: string

        DocId:

          type: string

        ObjectStore:

          type: string

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

    DocumentProperties:

      type: object

      properties:

        Url:

          type: string

        Name:

          type: string

        Extension:

          type: string

        Properties:

          type: array

          items:

            $ref: "#/components/schemas/Property"

          minItems: 1

      required:

        - Name

        - Extension

        - Properties

    Property:

      type: object

      properties:

        Key:

          type: string

        Value:

          type: string

    CommonParameters:

      type: object

      properties:

        Locale:

          type: string

          enum: [ 'fr-fr', 'en-us' ]

        EndUserId:

          type: string

        EndUserType:

          type: string

          enum: [ 'A2P','ADF','AEP','AGA','AMA','AWS','AXA_ASSISTANCE','AXB','CLI','CLP','COU','JURIDICA','SIEGE','SIEGE_AXAPART','SIEGE_IARDENT','SIEGE_REGLEURS','SOG' ]

        ApplicationCaller:

          type: string

        ObjectStore:

          type: string

          description: "ObjectStore correspond au PM"

      required:

        - Locale*
et voici ce qui marche :
          openapi: 3.0.0
info:
  title: API empower
  version: '1.0'
  description: Empower api

servers:
  - url: https://api-empower-2-dev.axa-fr.intraxa/mpw/resource


paths:
  /documents/import:
    post:
      tags:
        - import
      summary: "import"
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              $ref: "#/components/schemas/ImportRequest"

      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ImportResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2:
            - urn:axa:france:ged:mng

  /documents/{docId}/export:
    post:
      operationId: export
      tags:
        - export
      parameters:
        - name: docId
          required: true
          in: path
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/x-www-form-urlencoded:
            schema:
              $ref: '#/components/schemas/ExportRequest'
      responses:
        200:
          description: OK
          content:
            application/octet-stream:
              schema:
                type: string
                format: byte

        500:
          description: Internal Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BusinessError'
  /GetToken:
    get:
      operationId: getToken
      tags:
        - token

      responses:
        200:
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TokenResponse'

        500:
          description: Internal Server Error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BusinessError'
components:

  schemas:
    ImportRequest:
      type: object
      properties:
        busDocId:
          type: string
        docTag:
          type: string
        appId:
          type: string
        file:
          type: string
          format: binary


    ImportResponse:
      type: object
      properties:
        header:
          $ref: "#/components/schemas/Header"
        body:
          $ref: "#/components/schemas/BodyExport"

    ExportRequest:
      type: object
      properties:
        preserveDoc:
          type: boolean

    TokenResponse:
      type: object
      properties:
        status:
          $ref: "#/components/schemas/Status"
        body:
          $ref: "#/components/schemas/BodyToken"

    ExportResponse:
      type: object
      properties:
        fileName:
          type: string
        docId:
          type: string
        binaryData:
          type: string
          format: binary


    Header:
      type: object
      properties:
       status:
         $ref: "#/components/schemas/Status"

    Status:
      type: object
      properties:
        code:
          type: string

    BodyExport:
      type: object
      properties:
        document:
          $ref: "#/components/schemas/Document"

    BodyToken:
      type: object
      properties:
        csrfHeader:
          type: string
        csrfParameter:
          type: string
        csrfToken:
          type: string



    Document:
      type: object
      properties:
        appId:
          type: string
        applicationName:
          type: string
        busDocId:
          type: string
        creationDate:
          type: string
        deleted:
          type: boolean
        docId:
          type: string
        docTags:
          type: array
          items:
            type: string
        documentVersion:
          type: string
        editorVersion:
          type: string
        engineVersion:
          type: string
        exportDate:
          type: string
        fileName:
          type: string
        importDate:
          type: string
        lastEditDate:
          type: string
        lastSaveDate:
          type: string
        ownerIds:
          type: array
          items:
            type: string
        packageFileName:
          type: string
        packageVersion:
          type: string
        previewPubFile:
          type: string
        roleNames:
          type: array
          items:
            type: string
        userId:
          type: string


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
