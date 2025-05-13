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
