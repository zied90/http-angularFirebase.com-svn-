package fr.axa.pfel.wspfelv3.services.orchestration;


import fr.axa.apidoc.services.ConvertAndConcatDocFault;

import fr.axa.pfel.wspfelv3.domain.document.Document;
import fr.axa.pfel.wspfelv3.savedocnas.UploadException;
import java.io.IOException;
import java.util.List;

public interface SearchAndConcatService {

    String convertAndConcatEcmDocs(Document document, List<String> ecmRefDocs)
        throws IOException, ConvertAndConcatDocFault, UploadException;

    String executeSearchAndConvertDocument(String user, String ecmRefDoc, String project);
}
package fr.axa.pfel.wspfelv3.services.orchestration.impl;

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
package fr.axa.pfel.wspfelv3.services.orchestration.impl;

import fr.axa.pfel.wspfelv3.converter.ICallConverter;
import fr.axa.pfel.wspfelv3.aspose.AsposeConverter;
import fr.axa.pfel.wspfelv3.sharepoint.SharePointConverter;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConverterFactory {

    private static final String SHAREPOINT = "SHAREPOINT";
    private static final String ASPOSE = "ASPOSE";
    private static final Map<String, String> EXTENSION = new HashMap<>();
    private static final Map<String, ICallConverter> converterHandlers = new HashMap<>();


    @Autowired
    public ConverterFactory(SharePointConverter sharePointConverter, AsposeConverter asposeConverter) {
        EXTENSION.put("TIFF", ASPOSE);
        EXTENSION.put("TIF", ASPOSE);
        EXTENSION.put("JPG", ASPOSE);
        EXTENSION.put("JPEG", ASPOSE);
        EXTENSION.put("PNG", ASPOSE);
        EXTENSION.put("GIF", ASPOSE);
        EXTENSION.put("PDF", ASPOSE);
        EXTENSION.put("DOC", SHAREPOINT);
        EXTENSION.put("DOCX", SHAREPOINT);
        EXTENSION.put("MSWORD", SHAREPOINT);

        converterHandlers.put(SHAREPOINT, sharePointConverter);
        converterHandlers.put(ASPOSE, asposeConverter);
    }


    public ICallConverter getConverter(String extension) {
        return converterHandlers.get(EXTENSION.get(extension));
    }

}
package fr.axa.pfel.wspfelv3.storage.api;

import fr.axa.pfel.wspfelv3.storage.domain.IStorage;
import fr.axa.pfel.wspfelv3.storage.domain.StorageTmpInfo;
import java.io.File;
import java.io.IOException;
import java.util.List;

public interface StorageService {

    String saveDocumentInStorage(IStorage storage) throws IOException;

    byte[] getDocumentFromStorage(IStorage storage) throws IOException;

    List<File> retrieveUapFilesOnNas(List<String> ecmRefDoc);

    List<File> retrievBatchFilesInLot(StorageTmpInfo storageTmpInfo) throws IOException;

    void deleteTmpFile(StorageTmpInfo storage) throws IOException;

    void initDirectories();

    String writeFileToUapInputDirectory(String id, byte[] bytes) throws IOException;

    void deleteBatchLot(StorageTmpInfo storageTmpInfo) throws IOException;
}
package fr.axa.pfel.wspfelv3.aspose;

import fr.axa.apidoc.services.ConvertAndConcatDocFault;
import fr.axa.pfel.wspfelv3.domain.DocumentToConvert;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.List;


public interface AsposeService {

    ByteArrayOutputStream concatAllConvertedFile(List<File> filesToConvert)
        throws IOException, ConvertAndConcatDocFault;

    ByteArrayOutputStream convertFile(List<DocumentToConvert> documentsToConvert)
        throws IOException, ConvertAndConcatDocFault;
}
public interface GedService{
 SearchDocumentsMetadatasResponse searchDocumentsFromGed(String user, String ecmRefDoc, String... projects);

    DocumentBinaryContentPost200Response getDocumentGed(String user, List<SearchDocumentsMetadatasResponseDocumentsInner> documents, String... projects);}
package fr.axa.pfel.wspfelv3.controller.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
@ConfigurationProperties(prefix = "pfel.generate")
@Getter
@Setter
public class GenerateProperties {

    private Long attachmentMaxSize;
    private String nasAttachmentPathUrl;
    private List<String> projectsToIgnoreMtom;
}
package fr.axa.pfel.wspfelv3.savedocnas.api;


import fr.axa.pfel.wspfelv3.savedocnas.UploadException;
import fr.axa.pfel.wspfelv3.savedocnas.domain.UploadData;
import fr.axa.pfel.wspfelv3.savedocnas.domain.UploadResponse;

public interface SaveDocumentNasService {

    UploadResponse upload(UploadData uploadData) throws UploadException;
}
package fr.axa.pfel.wspfelv3.savedocnas.domain;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UploadResponse {
    private String status;

}
 fait moi les test unitaires de SearchAndConcatServiceImpl et mock si necessaire 
