package fr.axa.pfel.wspfelv3.ged.impl.service;

import feign.form.FormData;
import fr.axa.pfel.client.impl.GetDocumentApi;
import fr.axa.pfel.client.impl.SearchApi;
import fr.axa.pfel.client.impl.UploadApi;
import fr.axa.pfel.client.model.*;
import fr.axa.pfel.wspfelv3.constant.Constants;
import fr.axa.pfel.wspfelv3.ged.api.GedGenericService;
import fr.axa.pfel.wspfelv3.ged.api.GedService;
import fr.axa.pfel.wspfelv3.ged.domain.DocumentMetadata;
import fr.axa.pfel.wspfelv3.ged.domain.UploadDocument;
import fr.axa.pfel.wspfelv3.utils.ReportFileUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class GedServiceImpl implements GedService, GedGenericService {

    private static final String projectSante = "SANTE";
    private final SearchApi searchDocApi;
    private final GetDocumentApi getDocApi;
    private final UploadApi uploadApi;


    public GedServiceImpl(UploadApi uploadApi,
                          SearchApi searchDocApi, fr.axa.pfel.client.impl.GetDocumentApi getDocApi) {
        this.uploadApi = uploadApi;
        this.searchDocApi = searchDocApi;
        this.getDocApi = getDocApi;
    }

    private static GetDocumentContentRequest initGetDocumentRequest(String userId, String docId, String... projects) {
        return new GetDocumentContentRequest().docId(docId)
                .commonParameters(new fr.axa.pfel.client.model.CommonParameters()
                        .endUserId(userId).locale(fr.axa.pfel.client.model.Locale.FR_FR)
                        .applicationCaller(getApplicationCaller(projects))
                );
    }

    /**
     * Call SearchDocuments from GED to retrieve IDs from corresponding documents
     */
    @Override
    public SearchDocumentsMetadatasResponse searchDocumentsFromGed(String user, String ecmRefDoc,
                                                                   String... projects) {

        SearchDocumentsMetadatasRequest documentsMetadatasRequest = new SearchDocumentsMetadatasRequest()
                .commonParameters(buildCommonParameters(user, projects))
                .predicate(Constants.PREDICATE_STRING + "('" + ecmRefDoc + "')");
        return searchDocApi.documentMetadatasSearchPost(documentsMetadatasRequest);
    }

    private fr.axa.pfel.client.model.CommonParameters buildCommonParameters(String user, String... projects) {
        return new CommonParameters()
                .locale(fr.axa.pfel.client.model.Locale.FR_FR)
                .applicationCaller(getApplicationCaller(projects))
                .endUserId(user);
    }
    

    private static String getApplicationCaller(String[] projects) {
        String project = (projects != null && projects.length > 0) ? projects[0] : "";
        return StringUtils.equals(project, projectSante) ? "KIOSK" : "SOLARIS_UAP";
    }

    public DocumentBinaryContentPost200Response getDocumentGed(String user, List<SearchDocumentsMetadatasResponseDocumentsInner> documents,
                                                               String... projects) {
        for (SearchDocumentsMetadatasResponseDocumentsInner document : documents) {
            GetDocumentContentRequest input = initGetDocumentRequest(user, document.getDocId(), projects);
            return getDocApi.documentBinaryContentPost(input);
        }

        return null;
    }

    @Override
    public String uploadDocument(DocumentMetadata documentMetadata, UploadDocument document) throws XMLStreamException, IOException {

        UploadRequest uploadRequest = buildUpload(documentMetadata, document);
        String filename = document.getFilename() != null ? document.getFilename() : UUID.randomUUID().toString();
        FormData formData = new FormData("application/pdf", filename, document.getBinaryData());
        UploadDocumentResponse response = uploadApi.documentUploadPost(
                uploadRequest, formData);
        return response.getDocId();


    }


    private UploadRequest buildUpload(DocumentMetadata documentMetadata, UploadDocument document) throws XMLStreamException, IOException {
        CommonParameters commonParameters = new CommonParameters()
                .locale(Locale.FR_FR)
                .applicationCaller("SDJ")
                .endUserId(documentMetadata.getEndUserId());
        DocumentProperties documentProperties = new DocumentProperties();
        documentProperties.setExtension(document.getTypeDocument());
        documentProperties.setUrl(Strings.EMPTY);
        documentProperties.setName(document.getFilename());
        documentProperties.setProperties(buildProperty(documentMetadata.getReportFile()));
        documentProperties.setProperties(buildMetadata());
        return new UploadRequest()
                .commonParameters(commonParameters)
                .interaction(Interaction.SYNC)
                .documentProperties(documentProperties);


    }

    public List<Property> buildMetadata() {
        List<Property> metadata = new ArrayList<>();
        Property p1 = new Property();
        p1.setKey("ecm_SensFlux");
        p1.setValue("Sortant");
        metadata.add(p1);
        Property p2 = new Property();
        p2.setKey("ecm_NbPage");
        p2.setValue("2");
        metadata.add(p2);
        Property p3 = new Property();
        p3.setKey("ecm_Extension");
        p3.setValue(".pdf");
        metadata.add(p3);
        // ... et ainsi de suite pour tous les éléments
        Property p4 = new Property();
        p4.setKey("ecm_SAOrigine");
        p4.setValue("EADAPTALIA");
        metadata.add(p4);
        Property p5 = new Property();
        p5.setKey("ecm_Visibilite");
        p5.setValue("Client");
        metadata.add(p5);
        Property p6 = new Property();
        p6.setKey("ecm_NomClient");
        p6.setValue("ORANGE");
        metadata.add(p6);
        Property p7 = new Property();
        p7.setKey("ecm_NumContratAutre");
        p7.setValue("2524756612000");
        metadata.add(p7);
        Property p8 = new Property();
        p8.setKey("ecm_NumDemande");
        p8.setValue("246b87f3-9599-4746-b52c-494577b9a5e2");
        metadata.add(p8);
        Property p9 = new Property();
        p9.setKey("ecm_NomDoc");
        p9.setValue("Testup");
        metadata.add(p9);
        Property p10 = new Property();
        p10.setKey("ecm_Societe");
        p10.setValue("AXA France");
        metadata.add(p10);
        Property p11 = new Property();
        p11.setKey("ecm_Branche");
        p11.setValue("Vie collective santé");
        metadata.add(p11);
        Property p12 = new Property();
        p12.setKey("ecm_TypeDocument");
        p12.setValue("DIPA");
        metadata.add(p12);
        Property p13 = new Property();
        p13.setKey("ecm_TopMedical");
        p13.setValue("Oui");
        metadata.add(p13);
        Property p14 = new Property();
        p14.setKey("ecm_TopBanque");
        p14.setValue("Oui");
        metadata.add(p14);
        Property p15 = new Property();
        p15.setKey("ecm_TopRH");
        p15.setValue("Oui");
        metadata.add(p15);
        Property p16 = new Property();
        p16.setKey("ecm_TopVIP");
        p16.setValue("Oui");
        metadata.add(p16);
        return metadata;
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

}   ca cest dupliquer est que on  avoir une seul mais le probleme cest le type objet   commonParameters  ilya 2  comment faire
