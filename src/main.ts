
org.mockito.exceptions.misusing.UnfinishedStubbingException: 
Unfinished stubbing detected here:
-> at fr.axa.pfel.wspfelv3.services.exportdocument.impl.ExportDocumentServiceImplTest.exportDocumentWithUploadGedThrowException(ExportDocumentServiceImplTest.java:107)

E.g. thenReturn() may be missing.
Examples of correct stubbing:
    when(mock.isOk()).thenReturn(true);
    when(mock.isOk()).thenThrow(exception);
    doThrow(exception).when(mock).someVoidMethod();
Hints:
 1. missing thenReturn()
 2. you are trying to stub a final method, which is not supported
 3. you are stubbing the behaviour of another mock inside before 'thenReturn' instruction is completed


	at fr.axa.pfel.wspfelv3.services.exportdocument.impl.ExportDocumentServiceImpl.exportDocument(ExportDocumentServiceImpl.java:70)
	at fr.axa.pfel.wspfelv3.services.exportdocument.impl.ExportDocumentServiceImplTest.exportDocumentWithUploadGedThrowException(ExportDocumentServiceImplTest.java:109)
	at java.base/java.lang.reflect.Method.invoke(Method.java:580)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1596)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1596)


  @Test
    void exportDocumentWithUploadGedThrowException() throws Exception {
        final ExportDocument exportDocument = ExportDocumentFactory.getExportDocument("XXXX", true);

        final DocumentLive documentLive = DocumentLiveFactory.getDocumentLive("test", Output.SED);
        mockExportDocument(documentLive);
        when(gedService.uploadDocument(any(DocumentMetadata.class), any(UploadDocument.class))).thenThrow( );

        final Attachment attachment = exportDocumentService.exportDocument(exportDocument);

        assertNull(attachment.getGedDocId());
    }

package fr.axa.pfel.wspfelv3.services.exportdocument;

import fr.axa.pfel.wspfelv3.domain.document.Attachment;
import fr.axa.pfel.wspfelv3.domain.document.ExportDocument;

public interface ExportDocumentService {

    Attachment exportDocument(ExportDocument exportDocumentDTO) throws Exception;
}

   @Override
    public Attachment exportDocument(ExportDocument exportDocument)
        throws Exception {
        final DocumentLive documentLiveByIdRequest = documentLiveService.findDocumentLiveByIdRequest(
            exportDocument.getIdRequest());
        final fr.axa.pfel.wspfelv3.empower.domain.Attachment attachment = empowerService.exportDocumentByDocIdWithPreserveDoc(
            documentLiveByIdRequest.getDocIdEmpower());
        checkMpwSizeLimit(exportDocument, attachment);
        LOGGER.info("convert export document to pdf {}", exportDocument.getIdRequest());
        final Attachments attachments = convertLiveDocumentToDocument(
            documentLiveByIdRequest.getDocument(), attachment);

        Attachment attPdf = attachmentMapper.attEmpowerToDomain(attachments.getAttachmentPDF());
        if (exportDocument.isUploadGed()) {
            Attachment attReport = attachmentMapper.attEmpowerToDomain(
                attachments.getAttachmentReport());
            LOGGER.info("export document upload pdf {}", exportDocument.getIdRequest());
            uploadDocumentInGed(exportDocument, documentLiveByIdRequest.getDocument(), attPdf,
                attReport);
        }

        return attPdf;
    }

package fr.axa.pfel.wspfelv3.ged.api;

import fr.axa.pfel.wspfelv3.ged.domain.DocumentMetadata;
import fr.axa.pfel.wspfelv3.ged.domain.UploadDocument;

import java.io.IOException;
import javax.xml.stream.XMLStreamException;

public interface GedUploadService {
    String uploadDocument(DocumentMetadata documentMetadata, UploadDocument document)
        throws XMLStreamException, IOException;

}

  @Override
   public String uploadDocument(DocumentMetadata documentMetadata, UploadDocument document) throws XMLStreamException, IOException {

       UploadRequest uploadRequest=buildUpload(documentMetadata,document);
        String filename=document.getFilename()!=null?document.getFilename():UUID.randomUUID().toString();
        FormData formData = new FormData("application/pdf", filename, document.getBinaryData());
        UploadDocumentResponse response =uploadApi.documentUploadPost(
                uploadRequest, formData);
        return response.getDocId();


    }  je met quoi pour le test matcrhe

