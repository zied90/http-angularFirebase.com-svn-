
openapi: 3.0.0

info:
  version: "1.0"
  title: "Service GED SAM v2"
  description: "GED SAM V2 Operations: ControlMetas, DeleteDocument, GetAvailability, GetDictionary, GetDocumentContent, GetDocumentsUrl, GetDocumentsVignette, SearchDocuments(Deprecated), SearchDocumentsMetadatas, UpdateDocument, UploadBinaryDocument(Deprecated), UploadDocument, GetDocument(Deprecated), GetDocumentTicket"

paths:
  /document/ticket:
    post:
      summary: "GetDocumentTicket"
      requestBody:
        description: "GetDocumentTicket Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/GetDocumentTicketRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/GetDocumentTicketResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2:
            - urn:axa:france:ged:saveas
  /document/url:
    post:
      summary: "GetDocumentsUrl"
      requestBody:
        description: "GetDocumentsUrl Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/GetDocumentsUrlRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/GetDocumentsUrlResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:cst
            
  /document/vignette:
    post:
      summary: "GetDocumentsVignette"
      requestBody:
        description: "GetDocumentsVignette Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/GetDocumentsVignetteRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/GetDocumentsVignetteResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:cst
            
  /document/content:
    post:
      summary: "GetDocument / Deprecated"
      requestBody:
        description: "GetDocument Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/GetDocumentContentRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/octet-stream:
              schema:
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
            
  /document/binary/content:
    post:
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
            
  /document/metadatas:
    post:
      summary: "SearchDocuments / Deprecated"
      requestBody:
        description: "SearchDocuments Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SearchDocumentsRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SearchDocumentsResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:src
            
  /document/metadatas/search:
    post:
      summary: "SearchDocumentsMetadatas"
      requestBody:
        description: "SearchDocumentsMetadatas Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/SearchDocumentsMetadatasRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SearchDocumentsMetadatasResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:src
            
  /document/binary:
    post:
      summary: "UploadBinaryDocument / Deprecated"
      requestBody:
        description: "UploadBinaryDocument Request"
        content:
          multipart/form-data:
            schema:
              $ref: "#/components/schemas/UploadBinaryDocumentRequest"
        required: true
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
            
  /document/upload:
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
            
  /document/delete:
    post:
      summary: "DeleteDocument"
      requestBody:
        description: "DeleteDocument Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/DeleteDocumentRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                 $ref: "#/components/schemas/DeleteDocumentResponse" 
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:mng 
            
  /document/metadatas/update:
    put:
      summary: "UpdateDocumentMetadatas"
      requestBody:
        description: "UpdateDocumentMetadatas Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UpdateDocumentRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                 $ref: "#/components/schemas/UpdateDocumentResponse" 
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:mng 
            
  /availability:
    get:
      summary: "GetAvailability"
      parameters:
        - in: query
          name: locale
          schema: 
            $ref: "#/components/schemas/Locale"           
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/GetAvailabilityResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:mng 
            
  /dictionary:
    get:
      summary: "GetDictionary"
      parameters:
        - in: query
          name: locale
          schema: 
            $ref: "#/components/schemas/Locale"
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/GetDictionaryResponse"
        "500":
          description: "KO"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BusinessError"
      security:
        - OAuth2: 
            - urn:axa:france:ged:cst
            
  /document/metadatas/control:
    post:
      summary: "ControlMetadatas"
      requestBody:
        description: "ControlMetadatas Request"
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ControlMetasRequest"
        required: true
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ControlMetasResponse"
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
          
    Property:
      type: object
      properties:
        Key:
          type: string
        Value:
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
        
    GetDocumentsUrlRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        DocIds:
          type: array
          items:
            type: string
          uniqueItems: true
          minItems: 1
        ViewerLinkOption:
          type: object
          properties:
            ViewerType:
              type: string
              enum: ['Intern','Extern']
            Profil:
              type: string
          required:
            - ViewerType
      required:
        - DocIds
        - CommonParameters
        
    GetDocumentsUrlResponse:
      type: object
      properties:
        Status:
          type: string
        Links:
          type: array
          items:
            type: object
            properties:
              Url:
                type: string
              DocId:
                type: string
              ObjectStore:
                type: string
        
    GetDocumentsVignetteRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        DocIds:
          type: array
          items:
            type: string
          uniqueItems: true
          minItems: 1
        ImageLinkOption:
          type: object
          properties:
            Size:
              type: integer
            PageNumber:
              type: integer
              minimum: 1
      required:
        - DocIds
        - CommonParameters
        
    GetDocumentsVignetteResponse:
      type: object
      properties:
        Status:
          type: string
        Links:
          type: array
          items:
            type: object
            properties:
              Url:
                type: string
              DocId:
                type: string
              ObjectStore:
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
          
    SearchDocumentsRequest:
      type: object
      properties:
        Locale:
          $ref: "#/components/schemas/Locale"
        EndUserId:
          type: string
        EndUserType: 
          $ref: "#/components/schemas/EndUserType"
        ApplicationCaller:
          type: string
        Predicate:
          type: string
        PropertiesToReturn:
          type: array
          items:
            type: string
          uniqueItems: true
          minItems: 1
        MaxResults:
          type: integer
        CreationDateOrdering:
          type: string
          enum: ['ASC','DESC']
        PaginationCode:
          type: string
        ObjectStoreList:
          type: array
          items:
            type: string
          uniqueItems: true
          minItems: 1
      required:
        - Locale
        - Predicate
        
    SearchDocumentsMetadatasRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        Predicate:
          type: string
        PropertiesToReturn:
          type: array
          items:
            type: string
          uniqueItems: true
          minItems: 1
        MaxResults:
          type: integer
        CreationDateOrdering:
          type: string
          enum: ['ASC','DESC']
        PaginationCode:
          type: string
        ObjectStoreList:
          type: array
          items:
            type: string
          uniqueItems: true
          minItems: 1
      required:
        - CommonParameters
        - Predicate
        
    SearchDocumentsResponse:
      type: object
      properties:
        Status:
          type: string
        PaginationCode:
          type: string
        ResultNumber:
          type: integer
        Documents:
          type: array
          items:
            type: object
            properties:
              ObjectStore:
                type: string
              DocId:
                type: string
              Properties:
                type: array
                items:
                  $ref: "#/components/schemas/Property"       
        
    SearchDocumentsMetadatasResponse:
      type: object
      properties:
        Status:
          type: string
        PaginationCode:
          type: string
        ResultNumber:
          type: integer
        Documents:
          type: array
          items:
            type: object
            properties:
              ObjectStore:
                type: string
              DocId:
                type: string
              Properties:
                type: array
                items:
                  $ref: "#/components/schemas/Property"                 
        
    UploadBinaryDocumentRequest:
      type: object
      properties:
        Locale:
          $ref: "#/components/schemas/Locale"
        EndUserId:
          type: string
        EndUserType: 
          $ref: "#/components/schemas/EndUserType"
        ApplicationCaller:
          type: string
        Interaction:
          $ref: "#/components/schemas/Interaction"
        CallbackAddress:
          type: string
        Content:
          type: string
          format: binary
        DocumentProperties:
          $ref: "#/components/schemas/DocumentProperties"
      required:
        - Locale
        - Content
        - DocumentProperties
        
    UploadDocumentRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        Interaction:
          $ref: "#/components/schemas/Interaction"
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
          
    GetAvailabilityResponse: 
      type: object
      properties:
        Status:
          type: string
        AvailabilityState: 
          type: integer
        AvailabilityStateDescription: 
          type: string 
        
    GetDictionaryResponse: 
       type: object
       properties:
        Status:
          type: string
        Properties:
          type: array
          items:
            $ref: "#/components/schemas/PropertyDefinition"
        
    PropertyDefinition: 
      type: object
      properties:
        Name:
          type: string
        Code: 
          type: string
        Type: 
          type: string
        Category:
          type: string
        Length:
          type: integer
        Searchable:
          type: boolean
        IsRequired: 
          type: boolean
        ListId:
          type: string
        ListMembers:
          type: array
          items:
            $ref: "#/components/schemas/ListMember" 
      required:
        - IsRequired 
        - Searchable 
        - Length
        
    ListMember: 
      type: object
      properties:
        Id:
          type: integer
        Value: 
          type: string
        mimeType: 
          type: string
      required:
        - Id 
        - Value
        
    DeleteDocumentRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        DocId:
          type: string  
        DatePurge:
          type: string
        Interaction:
          $ref: "#/components/schemas/Interaction"
        CallbackAddress:
          type: string
      required:
        - DocId
        - DatePurge
        - CommonParameters
        
    DeleteDocumentResponse:
      type: object
      properties:
        Status:
          type: string      
        DocId:
          type: string
        DatePurge:
          type: string
        
    UpdateDocumentRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        DocId:
          type: string
        Properties:
          type: array
          items:
            $ref: "#/components/schemas/Property"
        Interaction:
          $ref: "#/components/schemas/Interaction"
        CallbackAddress:
          type: string
      required:
        - DocId
        - Properties
        - CommonParameters
        
    UpdateDocumentResponse:
      type: object
      properties:
        Status:
          type: string
        UpdatedPropertiesCount:
         type: string
        
    ControlMetasRequest:
      type: object
      properties:
        CommonParameters:
          $ref: "#/components/schemas/CommonParameters"
        Properties:
              type: array
              items:
                $ref: "#/components/schemas/Property"
              minItems: 1
        Document:
          type: object
          properties:
            Name:
              type: string
            Extension:
              type: string
            MimeType:
              type: string
            Size:
              type: integer
          required:
            - Name
            - Extension
      required:
        - CommonParameters
        - Properties
            
    ControlMetasResponse:
      type: object
      properties:
        Status:
          type: string

    GetDocumentTicketRequest:
      type: object
      properties:
        DocId:
          type: string
        EndUserId:
          type: string
        EndUserType:
          $ref: "#/components/schemas/EndUserType"

    GetDocumentTicketResponse:
      type: object
      properties:
        TicketIdApp:
          type: string


    CommonParameters:
      type: object
      properties:
        Locale:
          $ref: "#/components/schemas/Locale"
        EndUserId:
          type: string
        EndUserType:
          $ref: "#/components/schemas/EndUserType"
        ApplicationCaller:
          type: string
        ObjectStore:
          type: string
          description: "ObjectStore correspond au PM"
      required:
        - Locale
        
    Locale:
      type: string
      enum: ['fr-fr', 'en-us']
      
    Interaction:
      type: string
      enum: ['sync','async']
      
    EndUserType:
      type: string
      enum: ['A2P','ADF','AEP','AGA','AMA','AWS','AXA_ASSISTANCE','AXB','CLI','CLP','COU','JURIDICA','SIEGE','SIEGE_AXAPART','SIEGE_IARDENT','SIEGE_REGLEURS','SOG'] donne moi  le sowagger que avec UploadDocument car jai besoin que nde ca
