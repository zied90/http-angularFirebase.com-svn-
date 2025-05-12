package fr.axa.pfel.wspfelv3.ged.impl.service;

import feign.form.FormData;
import fr.axa.pfel.client.impl.GetDocumentApi;
import fr.axa.pfel.client.impl.SearchApi;
import fr.axa.pfel.client.impl.UploadApi;
import fr.axa.pfel.client.model.*;


/*import fr.axa.pfel.client.model.UploadDocumentResponse;
import fr.axa.pfel.mng.model.UploadDocumentRequest;*/
import fr.axa.pfel.client.model.CommonParameters;
import fr.axa.pfel.client.model.SearchDocumentsMetadatasRequest;
import fr.axa.pfel.client.model.SearchDocumentsMetadatasResponse;


import fr.axa.pfel.wspfelv3.constant.Constants;
import fr.axa.pfel.wspfelv3.ged.api.GedGenericService;
import fr.axa.pfel.wspfelv3.ged.api.GedService;
import fr.axa.pfel.wspfelv3.ged.domain.DocumentMetadata;
import fr.axa.pfel.wspfelv3.ged.domain.UploadDocument;
import fr.axa.pfel.wspfelv3.utils.ReportFileUtil;


/*import fr.axa.schemas.eip.gedald._4.UploadDocumentRequest.Properties;
import fr.axa.schemas.eip.gedald._4.UploadDocumentRequest.Properties.DynamicProperties;
import fr.axa.services.eip.gedald._4.GedBusinessFaultMessage;
import fr.axa.services.eip.gedald._4.ManageDocument;*/
import intraxa.corp.aems.eip._2012._03.schemas.envelope.ContextHeader;
import intraxa.corp.aems.eip._2012._03.schemas.envelope.Interaction;
import intraxa.corp.aems.eip._2012._03.schemas.envelope.MessageMetadata;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import javax.xml.stream.XMLStreamException;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class GedServiceImpl implements GedService, GedGenericService {

    private static final Logger LOGGER = LoggerFactory.getLogger(GedServiceImpl.class);
    private static final String ECM_NUM_DEMAND = "ecm_NumDemande";
    private static final String ECM_STATUT = "ecm_Statut";
    private static final String ECM_STATUT_BROUILLON_VALUE = "Brouillon";
    private static final String ECM_DATE_PURGE = "ecm_DatePurge";
    private final String projectSante = "SANTE";
    //private final ManageDocument gedMngClient;

    private final SearchApi searchDocApi;
    private final GetDocumentApi getDocApi;
    private final UploadApi uploadApi;


    public GedServiceImpl(UploadApi uploadApi,
                          SearchApi searchDocApi, fr.axa.pfel.client.impl.GetDocumentApi getDocApi) {
        this.uploadApi = uploadApi;
        this.searchDocApi = searchDocApi;
        this.getDocApi = getDocApi;
    }

    private static ContextHeader createContextHeader() {
        // set interaction to sync to get the docGedID in uploadDocument response
        ContextHeader ctxHeader = new ContextHeader();
        MessageMetadata msgMetadata = new MessageMetadata();
        msgMetadata.setInteraction(Interaction.SYNC);
        ctxHeader.setMessageMetadata(msgMetadata);
        return ctxHeader;
    }

    /*private static DocumentType createDocumentType(UploadDocument document) {
        DocumentType documentType = new DocumentType();
        documentType.setExtension(document.getTypeDocument());
        documentType.setName(document.getFilename());
        BinaryContent binaryContent = createBinaryContent(document.getBinaryData());
        documentType.setContent(binaryContent);
        return documentType;
    }*/

   /* private static BinaryContent createBinaryContent(byte[] document) {
        BinaryContent binaryContent = new BinaryContent();
        binaryContent.setContentType("PDF");
        binaryContent.setValue(document);
        return binaryContent;
    }*/

 /*   private static DynamicProperties createDynamicProperties(byte[] attReport)
        throws XMLStreamException, IOException {
        Map<String, String> dataMap = ReportFileUtil.retrieveDataFromReport(attReport);
        DynamicProperties dynamicProperties = new DynamicProperties();

        if (!dataMap.isEmpty()) {
            for (Map.Entry<String, String> entry : dataMap.entrySet()) {
                CriteriaType criteriaType = buildCriteriaType(entry.getKey(), entry.getValue());
                dynamicProperties.getDynamicProperties().add(criteriaType);
            }
        }
        return dynamicProperties;
    }*/

   /* private static CriteriaType buildCriteriaType(String key, String value) {
        CriteriaType criteriaType = new CriteriaType();
        criteriaType.setCle(key);
        criteriaType.setValeur(value);
        return criteriaType;
    }
*/
    private static GetDocumentContentRequest initGetDocumentRequest(String userId, String docId,String... projects) {
    /*    fr.axa.pfel.client.model.CommonParameters commonParameters = new fr.axa.pfel.client.model.CommonParameters()
                .endUserId(userId)
                .locale(fr.axa.pfel.client.model.CommonParameters.LocaleEnum.FR_FR)
                .applicationCaller(StringUtils.equals(getProject(projects), "SANTE") ? "KIOSK" : "SOLARIS_UAP");*/

        return new GetDocumentContentRequest().docId(docId)
                .commonParameters(new fr.axa.pfel.client.model.CommonParameters()
                        .endUserId(userId).locale(fr.axa.pfel.client.model.Locale.FR_FR)
                        .applicationCaller(StringUtils.equals(getProject(projects), "SANTE") ? "KIOSK" : "SOLARIS_UAP")
                );

    }

/*    @Override
    public String uploadDocument(DocumentMetadata documentMetadata, UploadDocument document)
        throws XMLStreamException, IOException, GedBusinessFaultMessage {
        UploadDocumentRequest uploadDocumentRequest = createUploadDocumentRequestType(
            documentMetadata, document);
        LOGGER.info("Start call uploadDocument web service");

        UploadDocumentResponse uploadDocumentResponse;
        uploadDocumentResponse = gedMngClient.uploadDocument(uploadDocumentRequest, null);
        LOGGER.info("End call uploadDocument web service {}", uploadDocumentResponse.getDocId());
        return uploadDocumentResponse.getDocId();

    }*/

    /**
     * Call SearchDocuments from GED to retrieve IDs from corresponding documents
     */
    @Override
    public SearchDocumentsMetadatasResponse searchDocumentsFromGed(String user, String ecmRefDoc,
                                                                   String... projects) {

        SearchDocumentsMetadatasRequest documentsMetadatasRequest=new SearchDocumentsMetadatasRequest()
                .commonParameters(buildCommonParameters(user,projects))
                .predicate(Constants.PREDICATE_STRING + "('" + ecmRefDoc + "')");
         return   searchDocApi.documentMetadatasSearchPost(documentsMetadatasRequest);
    }
    private fr.axa.pfel.client.model.CommonParameters buildCommonParameters(String user, String... projects ) {
        return new CommonParameters()
                .locale(fr.axa.pfel.client.model.Locale.FR_FR)
                .applicationCaller(StringUtils.equals(getProject(projects), projectSante) ? "KIOSK" : "SOLARIS_UAP")
                .endUserId(user);
    }


    private static String getProject(String[] projects) {
        return projects != null && projects.length > 0 ? projects[0] : "";
    }

    public DocumentBinaryContentPost200Response getDocumentGed(String user, List<SearchDocumentsMetadatasResponseDocumentsInner> documents,
                                                               String... projects) {

        for (SearchDocumentsMetadatasResponseDocumentsInner document : documents) {
            GetDocumentContentRequest input = initGetDocumentRequest(user, document.getDocId(),projects);
               return getDocApi.documentBinaryContentPost(input);
        }

        return null ;
    }


  /*  private UploadDocumentRequest createUploadDocumentRequestType(DocumentMetadata documentMetadata,
        UploadDocument document) throws XMLStreamException, IOException {
        UploadDocumentRequest uploadDocumentRequest = new UploadDocumentRequest();
        ContextHeader contextHeader = createContextHeader();
        uploadDocumentRequest.setContextHeader(contextHeader);
        uploadDocumentRequest.setEndUserId(documentMetadata.getEndUserId());
        DocumentType documentType = createDocumentType(document);
        uploadDocumentRequest.setDocument(documentType);
        Properties properties = createProperties(documentMetadata);
        uploadDocumentRequest.setProperties(properties);
        return uploadDocumentRequest;
    }*/

/*    private Properties createProperties(DocumentMetadata documentMetadata)
        throws XMLStreamException, IOException {
        Properties properties = new Properties();

        PropertiesType staticProperties = new PropertiesType();
        properties.setStaticProperties(staticProperties);
        DynamicProperties dynamicProperties = createDynamicProperties(
            documentMetadata.getReportFile());
        // Add numDemand
        dynamicProperties.getDynamicProperties()
            .add(buildCriteriaType(ECM_STATUT, ECM_STATUT_BROUILLON_VALUE));
        dynamicProperties.getDynamicProperties().add(buildCriteriaType(ECM_DATE_PURGE,
            documentMetadata.computePurgeDateTime()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))));
        dynamicProperties.getDynamicProperties()
            .add(buildCriteriaType(ECM_NUM_DEMAND, documentMetadata.getNumDemand()));

        properties.setDynamicProperties(dynamicProperties);

        return properties;
    }*/
   @Override
   public String uploadDocument(DocumentMetadata documentMetadata, UploadDocument document) throws XMLStreamException, IOException {

       UploadRequest uploadRequest=buildUpload(documentMetadata,document);
        String filename=document.getFilename()!=null?document.getFilename():UUID.randomUUID().toString();
        FormData formData = new FormData("application/pdf", filename, document.getBinaryData());
        UploadDocumentResponse response =uploadApi.documentUploadPost(
                uploadRequest, formData);
        return response.getDocId();


    }


    private UploadRequest buildUpload(DocumentMetadata documentMetadata,UploadDocument document) throws XMLStreamException, IOException {
      CommonParameters commonParameters=new CommonParameters()
                .locale(Locale.FR_FR)
              .applicationCaller("SOLARIS_UAP")
                .endUserId(documentMetadata.getEndUserId());
        DocumentProperties documentProperties=new DocumentProperties();
        documentProperties.setExtension(document.getTypeDocument());
        documentProperties.setUrl(Strings.EMPTY);
        documentProperties.setName(document.getFilename());
        documentProperties.setProperties(buildProperty(documentMetadata.getReportFile()));
       return new UploadRequest()
               .commonParameters(commonParameters)
               .interaction(fr.axa.pfel.client.model.Interaction.ASYNC)
               .callbackAddress("")
               .documentProperties(documentProperties);


    }

    private List<Property> buildProperty(byte[] attReport) throws XMLStreamException, IOException {
        Map<String, String> dataMap = ReportFileUtil.retrieveDataFromReport(attReport);
        List<Property> properties = new ArrayList<>();

        if (!dataMap.isEmpty()) {
            for (Map.Entry<String, String> entry : dataMap.entrySet()) {
                Property property = buildType(entry.getKey(), entry.getValue());
                properties.add(property);
            }
        }
        return properties;
    }
    private static Property buildType(String key, String value) {
        Property property = new Property();
        property.setKey(key);
        property.setValue(value);
        return property;
    }

}  doone le test unitaire et pour info voici lancien test avant ma migration  :
package fr.axa.pfel.wspfelv3.ged.impl.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import fr.axa.pfel.client.model.DocumentBinaryContentPost200Response;
import fr.axa.pfel.wspfelv3.ged.api.GedService;
import fr.axa.pfel.wspfelv3.ged.domain.DocumentMetadata;
import fr.axa.pfel.wspfelv3.ged.domain.UploadDocument;
import fr.axa.pfel.wspfelv3.ged.impl.service.factory.GedObjectFactory;
import fr.axa.schemas.eip.gedald._4.GetDocumentRequestType;
import fr.axa.schemas.eip.gedald._4.GetDocumentResponseType;
import fr.axa.schemas.eip.gedald._4.SearchDocumentsRequestType;
import fr.axa.schemas.eip.gedald._4.SearchDocumentsResponseType;
import fr.axa.schemas.eip.gedald._4.SearchDocumentsResponseType.Documents.Document;
import fr.axa.schemas.eip.gedald._4.UploadDocumentRequest;
import fr.axa.services.eip.gedald._4.GedBusinessFaultMessage;
import fr.axa.services.eip.gedald._4.GetDocument;
import fr.axa.services.eip.gedald._4.ManageDocument;
import fr.axa.services.eip.gedald._4.SearchDocuments;
import java.io.IOException;
import java.util.List;
import javax.xml.stream.XMLStreamException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

class GedServiceImplTest {

    private final ManageDocument gedMngClient = Mockito.mock(ManageDocument.class);
    private final SearchDocuments searchDocuments = Mockito.mock(SearchDocuments.class);
    private final GetDocument getDocument = Mockito.mock(GetDocument.class);
    private GedService gedService;
    private GedClientSelector gedClientSelector;
    private Resource pdfContent;
    private Resource reportContent;

    @BeforeEach

  public void setup() {

        gedClientSelector = new GedClientSelector(getDocument, searchDocuments, getDocument,
            searchDocuments);

        gedService = new GedServiceImpl(gedMngClient, gedClientSelector);
        pdfContent = new ClassPathResource("file/prod-dependance-sed.PDF");
        reportContent = new ClassPathResource("file/report.xml");
    }



    @Test
    void uploadDocument() throws IOException, XMLStreamException, GedBusinessFaultMessage {
        final UploadDocument uploadDocument = GedObjectFactory.getUploadDocument("pdf", "test",
            pdfContent);
        final DocumentMetadata documentMetadata = GedObjectFactory.getDocumentMetadata(
            reportContent.getInputStream().readAllBytes());

        when(gedMngClient.uploadDocument(any(UploadDocumentRequest.class), any())).thenReturn(
            GedObjectFactory.getUploadDocumentResponse("test"));

        final String s = gedService.uploadDocument(documentMetadata, uploadDocument);
        assertNotNull(s);
        assertEquals("test", s);
    }


    @Test
    void searchDocumentsFromGed() throws GedBusinessFaultMessage {
        when(searchDocuments.searchDocuments(any(SearchDocumentsRequestType.class))).thenReturn(
            GedObjectFactory.getSearchDocumentsResponseType());
        final SearchDocumentsResponseType searchDocumentsResponseType = gedService.searchDocumentsFromGed(
            "test", "test");
        assertNotNull(searchDocumentsResponseType);
    }


    @Test
    void getDocumentGed() throws GedBusinessFaultMessage {
        final Document document = new Document();
        document.setDocId("test");
        final GetDocumentResponseType getDocumentResponseType = new GetDocumentResponseType();
        when(getDocument.getDocument(any(GetDocumentRequestType.class), any())).thenReturn(
            getDocumentResponseType);

        final GetDocumentResponseType result = gedService.getDocumentGed("test",
            List.of(document));

        assertNotNull(document);
    }
}


