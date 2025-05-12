package fr.axa.pfel.wspfelv3.services.orchestration.impl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import fr.axa.apidoc.services.ConvertAndConcatDocFault;
import fr.axa.pfel.wspfelv3.aspose.AsposeConverter;
import fr.axa.pfel.wspfelv3.aspose.AsposeService;
import fr.axa.pfel.wspfelv3.constants.Output;
import fr.axa.pfel.wspfelv3.controller.configuration.GenerateProperties;
import fr.axa.pfel.wspfelv3.domain.document.Document;
import fr.axa.pfel.wspfelv3.factory.DocumentDTOFactory;
import fr.axa.pfel.wspfelv3.factory.GetDocumentResponseTypeFactory;
import fr.axa.pfel.wspfelv3.factory.SearchDocumentFactory;
import fr.axa.pfel.wspfelv3.ged.api.GedService;
import fr.axa.pfel.wspfelv3.savedocnas.api.SaveDocumentNasService;
import fr.axa.pfel.wspfelv3.services.orchestration.SearchAndConcatService;
import fr.axa.pfel.wspfelv3.storage.api.StorageService;
import fr.axa.schemas.eip.gedald._4.BinaryContent;
import fr.axa.schemas.eip.gedald._4.DocumentType;
import fr.axa.schemas.eip.gedald._4.GetDocumentResponseType;
import fr.axa.schemas.eip.gedald._4.SearchDocumentsResponseType;
import fr.axa.schemas.eip.gedald._4.SearchDocumentsResponseType.Documents;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

class SearchAndConcatServiceImplTest {
    private ConverterFactory converterFactory = Mockito.mock(ConverterFactory.class);;
    private StorageService storageService = Mockito.mock(StorageService.class);
    private AsposeService asposeService = Mockito.mock(AsposeService.class);
    private GedService gedService = Mockito.mock(GedService.class);
    private final SaveDocumentNasService saveDocumentNasService= Mockito.mock(SaveDocumentNasService.class);
    private final GenerateProperties generateProperties = Mockito.mock(GenerateProperties.class);
    private SearchAndConcatService searchAndConcatService;

    private final AsposeConverter asposeConverter = Mockito.mock(AsposeConverter.class);

    private Resource pdfContent;


    @BeforeEach
    public void setup() {
        pdfContent = new ClassPathResource("file/prod-dependance-sed.PDF");
        searchAndConcatService = new SearchAndConcatServiceImpl(storageService, asposeService,
            converterFactory, gedService,generateProperties, saveDocumentNasService);
    }


    //TODO path final
    //@Test
    void convertAndConcatEcmDocs() throws Exception {
        initTestSearchAndConcat();
        final List<String> ecmRefDocs = List.of("XXXX");
        final Document document = DocumentDTOFactory.getDocument("XXXX", "XXXX", Output.STORE);
        document.getTechnicalData().setUser("test");

        final SearchDocumentsResponseType searchDocumentsResponseType = getSearchDocumentsResponseType();
        when(gedService.searchDocumentsFromGed("test", "XXXX")).thenReturn(searchDocumentsResponseType);

        final GetDocumentResponseType getDocumentResponseType = getGetDocumentResponseType("pdf");
        when(gedService.getDocumentGed(anyString(), anyList())).thenReturn(getDocumentResponseType);

        when(storageService.writeFileToUapInputDirectory(anyString(), any())).thenReturn("path");
        final List<File> fileToConvert = List.of(pdfContent.getFile());
        when(storageService.retrieveUapFilesOnNas(ecmRefDocs)).thenReturn(fileToConvert);
        when(asposeService.concatAllConvertedFile(fileToConvert)).thenReturn(
            new ByteArrayOutputStream());

        when(storageService.saveDocumentInStorage(any())).thenReturn(
            "pathfinal");

        final String path = searchAndConcatService.convertAndConcatEcmDocs(document,
            ecmRefDocs);

        assertEquals("pathfinal", path );
    }

    private GetDocumentResponseType getGetDocumentResponseType(String extension) throws IOException {
        final GetDocumentResponseType getDocumentResponseType = new GetDocumentResponseType();
        final DocumentType documentType = new DocumentType();
        documentType.setExtension(extension);
        documentType.setName("test");
        documentType.setMimeType("application/" + extension);
        final BinaryContent binaryContent = new BinaryContent();
        binaryContent.setValue(pdfContent.getInputStream().readAllBytes());
        documentType.setContent(binaryContent);
        getDocumentResponseType.setDocument(documentType);
        getDocumentResponseType.setStatus("200");

        return getDocumentResponseType;
    }

    private SearchDocumentsResponseType getSearchDocumentsResponseType() {
        final SearchDocumentsResponseType searchDocumentsResponseType = new SearchDocumentsResponseType();
        final Documents documents = new Documents();
        final Documents.Document documentGed = new Documents.Document();
        documentGed.setDocId("id");
        documentGed.setPm("003");
        documents.getDocuments().add(documentGed);
        searchDocumentsResponseType.setDocuments(documents);
        return searchDocumentsResponseType;
    }

    @Test
    void convertAndConcatEcmDocsNotGenerated() throws Exception {
        initTestSearchAndConcat();
        final Document document = DocumentDTOFactory.getDocument("XXXX", "XXXX", Output.STORE);
        document.getTechnicalData().setUser("test");
        final String doc = searchAndConcatService.convertAndConcatEcmDocs(document,
            List.of("XXXX"));
        assertNull( doc);
    }

    @Test
    void executeSearchAndConvertDocument() throws IOException, ConvertAndConcatDocFault {
        initTestSearchAndConcat();
        when(storageService.writeFileToUapInputDirectory(any(), any())).thenReturn("test");
        final Document document = DocumentDTOFactory.getDocument("XXXX", "XXXX", Output.STORE);
        document.getTechnicalData().setUser("test");

        final String name = searchAndConcatService.executeSearchAndConvertDocument("test", "XXXX", "");
        assertEquals("test", name);
    }



    @Test
    void searchAndConcatContainsErrorExtension() throws Exception {
        String user = "test";
        String ecmRefDoc = "XXXX";
        SearchDocumentsResponseType searchDocResponseType = SearchDocumentFactory
            .getSearchDocumentResponseType();
        when(gedService.searchDocumentsFromGed(user, ecmRefDoc)).thenReturn(searchDocResponseType);
        final byte[] bytes = pdfContent.getInputStream().readAllBytes();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(bytes.length);
        byteArrayOutputStream.write(bytes, 0, bytes.length);
        when(asposeConverter.getConvertedDocument(any())).thenReturn(
            byteArrayOutputStream);
        when(converterFactory.getConverter("PDF")).thenReturn(asposeConverter);

        GetDocumentResponseType getDocResp = GetDocumentResponseTypeFactory.getGetDocumentResponseType(
            "REPORT");

        when(gedService.getDocumentGed(user,
            searchDocResponseType.getDocuments().getDocuments())).thenReturn(getDocResp);
        final Document document = DocumentDTOFactory.getDocument("XXXX", "XXXX", Output.STORE);
        document.getTechnicalData().setUser("test");
        final String doc = searchAndConcatService.executeSearchAndConvertDocument("test", "XXXX", "");
        assertNull( doc);
    }

    @Test
    void searchAndConcatErrorUser() throws Exception {
        initTestSearchAndConcat();
        final Document document = DocumentDTOFactory.getDocument("XXXX", "XXXX", Output.STORE);
        document.getTechnicalData().setUser("test");
        final String doc = searchAndConcatService.convertAndConcatEcmDocs(document,
            List.of("XXXX"));
        assertNull( doc);
    }

    private void initTestSearchAndConcat() throws IOException, ConvertAndConcatDocFault {
        String user = "test";
        String ecmRefDoc = "XXXX";
        SearchDocumentsResponseType searchDocResponseType = SearchDocumentFactory
            .getSearchDocumentResponseType();
        when(gedService.searchDocumentsFromGed(user, ecmRefDoc, "")).thenReturn(searchDocResponseType);
        final byte[] bytes = pdfContent.getInputStream().readAllBytes();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream(bytes.length);
        byteArrayOutputStream.write(bytes, 0, bytes.length);
        when(asposeConverter.getConvertedDocument(any())).thenReturn(
            byteArrayOutputStream);
        when(converterFactory.getConverter("PDF")).thenReturn(asposeConverter);

        GetDocumentResponseType getDocResp = GetDocumentResponseTypeFactory
            .getGetDocumentResponseType("pdf");

        when(gedService.getDocumentGed(user,
            searchDocResponseType.getDocuments().getDocuments(), "")).thenReturn(getDocResp);



    }
}

ci dessus le test untiare  avant migartion et apres migaration voici nv implmentation  donc corrige le test  et voi nv implementation :package fr.axa.pfel.wspfelv3.services.orchestration.impl;

import static fr.axa.pfel.wspfelv3.constant.Constants.CONCAT_UAP_LOG_PREFIX;
import static fr.axa.pfel.wspfelv3.document.DocumentUtils.getExtension;

import fr.axa.apidoc.services.ConvertAndConcatDocFault;
import fr.axa.pfel.client.model.*;
import fr.axa.pfel.wspfelv3.aspose.AsposeService;
import fr.axa.pfel.wspfelv3.constant.Constants;
import fr.axa.pfel.wspfelv3.constants.Output;
import fr.axa.pfel.wspfelv3.controller.configuration.GenerateProperties;
import fr.axa.pfel.wspfelv3.converter.ICallConverter;
import fr.axa.pfel.wspfelv3.domain.DocumentToConvert;
import fr.axa.pfel.wspfelv3.ged.api.GedService;
import fr.axa.pfel.wspfelv3.savedocnas.UploadException;
import fr.axa.pfel.wspfelv3.savedocnas.api.SaveDocumentNasService;
import fr.axa.pfel.wspfelv3.savedocnas.domain.UploadData;
import fr.axa.pfel.wspfelv3.services.orchestration.SearchAndConcatService;
import fr.axa.pfel.wspfelv3.storage.api.StorageService;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SearchAndConcatServiceImpl implements SearchAndConcatService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SearchAndConcatServiceImpl.class);

    private final ConverterFactory converterFactory;
    private final StorageService storageService;
    private final AsposeService asposeService;
    private final GedService gedService;
    private final GenerateProperties generateProperties;

    private final SaveDocumentNasService saveDocumentNasService;


    public SearchAndConcatServiceImpl(StorageService storageService, AsposeService asposeService,
        ConverterFactory converterFactory, GedService gedService,
        GenerateProperties generateProperties,
        SaveDocumentNasService saveDocumentNasService) {
        this.storageService = storageService;
        this.asposeService = asposeService;
        this.converterFactory = converterFactory;
        this.gedService = gedService;
        this.generateProperties = generateProperties;

        this.saveDocumentNasService = saveDocumentNasService;
    }

    private static boolean isDocumentNotEmpty(
            SearchDocumentsMetadatasResponse searchDocumentsResponseType) {
        return searchDocumentsResponseType != null && searchDocumentsResponseType.getDocuments() != null
            && !searchDocumentsResponseType.getDocuments().isEmpty();
    }

    private static List<SearchDocumentsMetadatasResponseDocumentsInner> filterAndRemoveRedundantDocs(
            SearchDocumentsMetadatasResponse searchDocumentsResponseType) {
        List<SearchDocumentsMetadatasResponseDocumentsInner> docList = searchDocumentsResponseType.getDocuments();

        Map<String, Integer> docsIdsRefMap = computeIdRefByDocuments(searchDocumentsResponseType);
        if (docList != null && !docList.isEmpty()) {
            Iterator<SearchDocumentsMetadatasResponseDocumentsInner> it = docList.iterator();
            while (it.hasNext()) {
                SearchDocumentsMetadatasResponseDocumentsInner currentDoc = it.next();
                String curentEcmRefDoc = extractPropertyValueByKey(currentDoc);
                if (curentEcmRefDoc != null && docsIdsRefMap.get(curentEcmRefDoc) != 1) {
                    String error = CONCAT_UAP_LOG_PREFIX + "EcmRefDoc : " + curentEcmRefDoc
                        + " contains several DocIds !!!";
                    LOGGER.info(error);
                    it.remove();
                }
            }
        }

        return docList;
    }

    private static Map<String, Integer> computeIdRefByDocuments(
            SearchDocumentsMetadatasResponse searchDocumentsResponseType) {
        int docRec;
        Map<String, Integer> docsIdsRefMap = new HashMap<>();
        for (SearchDocumentsMetadatasResponseDocumentsInner document : searchDocumentsResponseType.getDocuments()
            ) {
            String ecmRefDoc = extractPropertyValueByKey(document);
            if (ecmRefDoc != null) {
                docRec =
                    docsIdsRefMap.get(ecmRefDoc) == null ? 1 : (docsIdsRefMap.get(ecmRefDoc) + 1);
                docsIdsRefMap.put(ecmRefDoc, docRec);
            }
        }
        return docsIdsRefMap;
    }

    private static String extractPropertyValueByKey(
            SearchDocumentsMetadatasResponseDocumentsInner document) {
        if (document != null && document.getProperties() != null) {
            return document.getProperties().stream().filter(
                    property -> property.getKey().toUpperCase(Locale.FRENCH).trim()
                        .equals(Constants.ECM_REF_DOC.toUpperCase(Locale.FRENCH).trim())).findFirst()
                .map(Property::getValue).orElse(null);
        }
        return null;
    }

    private static void manageExtensionNotFound(List<SearchDocumentsMetadatasResponseDocumentsInner> documents,
                                                GetDocumentContentResponse getDocumentResponseType) {
        if (documents != null && !documents.isEmpty()) {
            String error =
                CONCAT_UAP_LOG_PREFIX + "[DOC : " + documents.getFirst().getDocId() + "]" + "Extension "
                    + getDocumentResponseType.getExtension() + " unsupported !!!!";
            LOGGER.error(error);
        }
    }


    @Override
    public String convertAndConcatEcmDocs(fr.axa.pfel.wspfelv3.domain.document.Document document,
        List<String> ecmRefDocs) throws IOException, ConvertAndConcatDocFault, UploadException {
        LOGGER.info(CONCAT_UAP_LOG_PREFIX + "Start service");
        var technicalData =
            (document != null && document.getTechnicalData() != null) ? document.getTechnicalData()
                : null;
        var idRequest = (technicalData != null) ? technicalData.getIdRequest() : null;
        var user = (technicalData != null) ? technicalData.getUser() : null;
        if (user != null && ecmRefDocs != null && !ecmRefDocs.isEmpty()) {
            final long count = ecmRefDocs.stream()
                .map(ecmRefDoc -> executeSearchAndConvertDocument(user, ecmRefDoc, document.getTechnicalData().getProject()))
                .filter(Objects::nonNull).count();

            if (ecmRefDocs.size() == count) {
                return concatFileForComposition(idRequest, ecmRefDocs);

            } else {
                LOGGER.error("{} The final document {}.pdf was not generated",
                    CONCAT_UAP_LOG_PREFIX, idRequest);
            }

        }
        LOGGER.info(CONCAT_UAP_LOG_PREFIX + "End service");
        return null;
    }

    private String concatFileForComposition(String idRequest, List<String> ecmRefDocs)
        throws IOException, ConvertAndConcatDocFault {

        if (ecmRefDocs != null) {
            final var files = storageService.retrieveUapFilesOnNas(ecmRefDocs);
            if (files != null && files.size() == ecmRefDocs.size()) {
                final ByteArrayOutputStream byteArrayOutputStream = asposeService.concatAllConvertedFile(
                    files);

                //save Document NAS .path()
                UploadData uploadData = UploadData.builder()
                    .output(String.valueOf(Output.LOCALPRINTING))
                    .binaryFile(byteArrayOutputStream.toByteArray())
                    .path(idRequest + ".pdf").build();

                try {
                    saveDocumentNasService.upload(uploadData);
                } catch (UploadException e) {
                    LOGGER.error(e.getMessage());
                }

                return generateProperties.getNasAttachmentPathUrl() + idRequest + ".pdf";
            }
        }

        return null;
    }

    public String executeSearchAndConvertDocument(String user, String ecmRefDoc, String project) {
        String fileNasPath = null;

   if (StringUtils.isNotBlank(ecmRefDoc)) {

            // search document from GED and get the the ID document
            SearchDocumentsMetadatasResponse searchDocumentsResponseType = gedService.searchDocumentsFromGed(
                user, ecmRefDoc, project);
       List<SearchDocumentsMetadatasResponseDocumentsInner> documentList = sanitizeSearchDocumentsResponseValidity(
                searchDocumentsResponseType);
       if (!searchDocumentsResponseType.getDocuments().isEmpty()) {
                // Convert (aspos/sharepoint)
                try {
                    fileNasPath = convertDocument(user, ecmRefDoc, documentList, project);
                } catch (IOException e) {
                    LOGGER.error("Error in convert : {}", ecmRefDoc, e);
                }
            }
        }
        return fileNasPath;
    }

    private String convertDocument(String user, String ecmRefDoc,
        List<SearchDocumentsMetadatasResponseDocumentsInner> documentList, String project) throws IOException {

        DocumentBinaryContentPost200Response getDocumentResponseType = gedService.getDocumentGed(user,
            documentList,  project);
        String fileNasPath = null;
        if (getDocumentResponseType != null) {
            String extension = getExtension(getDocumentResponseType.getGetDocumentContentResponse().getExtension());
            ICallConverter converterHandler = converterFactory.getConverter(extension);
            if (converterHandler != null) {
                final ByteArrayOutputStream convertedDocument = converterHandler.getConvertedDocument(
                    new DocumentToConvert(
                            getDocumentResponseType.getFile().getData(),
                        getDocumentResponseType.getGetDocumentContentResponse().getExtension()));

                fileNasPath = storageService.writeFileToUapInputDirectory(ecmRefDoc,
                    convertedDocument.toByteArray());
                LOGGER.info("{} Document successfully generated : {}", CONCAT_UAP_LOG_PREFIX,
                    fileNasPath);
            } else {
                manageExtensionNotFound(documentList, getDocumentResponseType.getGetDocumentContentResponse());
            }
        }

        return fileNasPath;
    }

    private List<SearchDocumentsMetadatasResponseDocumentsInner> sanitizeSearchDocumentsResponseValidity(
            SearchDocumentsMetadatasResponse searchDocumentsResponseType) {
        List<SearchDocumentsMetadatasResponseDocumentsInner> documentList = null;
        if (isDocumentNotEmpty(searchDocumentsResponseType)) {
            documentList = filterAndRemoveRedundantDocs(searchDocumentsResponseType);
        } else {
            LOGGER.error(CONCAT_UAP_LOG_PREFIX + "No associated documents !!!");
        }

        return documentList != null ? documentList : new ArrayList<>();
    }


}
 
