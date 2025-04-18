import { documentShow } from "@/api/apifunctions/documentShow";
import configEnv from "@/config/config-env";

interface PropsView {
  idFile: string;
}

const View = ({ idFile }: PropsView) => {
  const viewFile = async () => {
    try {
      const { successData } = await documentShow(idFile);
      if (successData) {
        window.open(`${configEnv.api_url}/documents/show?token=${successData}`, "_blank");
      } else {
        throw new Error("Erreur lors de la récupération du document");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button className={"af-btn--circle  af-btn--circle-reverse"} title="Voir" onClick={viewFile}>
      <i className="glyphicon glyphicon-eye-open"></i>
    </button>
  );
};
export default View;
package fr.axa.pfel.spoolnetng.api.controllers;

import fr.axa.pfel.spoolnetng.api.DocumentApi;
import fr.axa.pfel.spoolnetng.components.AESMessage;
import fr.axa.pfel.spoolnetng.configuration.Permission;
import fr.axa.pfel.spoolnetng.criterias.DocumentCriteria;
import fr.axa.pfel.spoolnetng.criterias.GlobalCriteria;
import fr.axa.pfel.spoolnetng.criterias.PaginationCriteria;
import fr.axa.pfel.spoolnetng.exceptions.DocumentNotFoundException;
import fr.axa.pfel.spoolnetng.exceptions.EncryptJwtException;
import fr.axa.pfel.spoolnetng.exceptions.IdMissingException;
import fr.axa.pfel.spoolnetng.exceptions.MissingArgumentException;
import fr.axa.pfel.spoolnetng.exceptions.PermissionsDeniedException;
import fr.axa.pfel.spoolnetng.mapper.DocumentsMapper;
import fr.axa.pfel.spoolnetng.model.DocumentDTO;
import fr.axa.pfel.spoolnetng.model.DocumentGedDTO;
import fr.axa.pfel.spoolnetng.models.DocumentUpdate;
import fr.axa.pfel.spoolnetng.models.action.UserAction;
import fr.axa.pfel.spoolnetng.models.action.UserActionType;
import fr.axa.pfel.spoolnetng.models.api.PaginationResponse;
import fr.axa.pfel.spoolnetng.models.api.ResponseAPI;
import fr.axa.pfel.spoolnetng.models.dto.Document;
import fr.axa.pfel.spoolnetng.models.dto.PrePrinted;
import fr.axa.pfel.spoolnetng.models.mail.AttachmentDTO;
import fr.axa.pfel.spoolnetng.models.mail.Email;
import fr.axa.pfel.spoolnetng.models.mail.EmailInformation;
import fr.axa.pfel.spoolnetng.services.JWTService;
import fr.axa.pfel.spoolnetng.services.SubscriberService;
import fr.axa.pfel.spoolnetng.services.UserService;
import fr.axa.pfel.spoolnetng.services.impl.EmailServiceImpl;
import fr.axa.pfel.spoolnetng.services.impl.documents.DocumentServiceManager;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import org.apache.logging.log4j.util.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DocumentsController implements DocumentApi {

    private static final String DOCUMENT_CLAIM = "document";
    private static final String PORTFOLIOS_CLAIM = "portfolios";
    private static final String TPAG = "tpag";
    private static final String USER_NO_PERMISSION_FORMAT = "User %s has no permissions to access document %s documentId";

    private static final Logger LOGGER = LoggerFactory.getLogger(DocumentsController.class);


    private final DocumentServiceManager documentServicesManager;
    private final EmailServiceImpl emailService;
    private final SubscriberService subscriberService;
    protected final UserService userService;
    private final JWTService jwtService;
    private final AESMessage aesMessage;

    public DocumentsController(DocumentServiceManager documentServicesManager,
        EmailServiceImpl emailService, SubscriberService subscriberService,
        UserService userService, JWTService jwtService, AESMessage aesMessage) {
        this.documentServicesManager = documentServicesManager;
        this.emailService = emailService;
        this.subscriberService = subscriberService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.aesMessage = aesMessage;
    }

    /**
     * Get the document service corresponding to the user
     *
     * @return the document service
     */
    @Override
    public ResponseAPI<PaginationResponse<DocumentDTO>> get(
        GlobalCriteria globalCriteria) {
        GlobalCriteria criteria = Optional.ofNullable(globalCriteria).orElseGet(GlobalCriteria::new);
        DocumentCriteria documentCriteria = new DocumentCriteria(criteria);

        if (documentCriteria.noFilterApplied()) {
            return ResponseAPI.good(
                PaginationResponse.of(Page.empty()));
        }

        Page<Document> documents = documentServicesManager.documentsService()
            .findAll(documentCriteria, PaginationCriteria.from(documentCriteria));
        return ResponseAPI.good(
            PaginationResponse.of(documents.map(DocumentsMapper.MAPPER::toDTO)));
    }


    /**
     * Get a document
     *
     * @param id document id
     * @return an api response with the document
     * @throws DocumentNotFoundException  if the document is not found
     * @throws PermissionsDeniedException if the user has no permissions to access the document
     */
    @Override
    public ResponseAPI<DocumentDTO> get(Long id)
        throws DocumentNotFoundException, PermissionsDeniedException {

        var doc = documentServicesManager.documentsService().findOneById(id);

        if (doc.isEmpty()) {
            throw new DocumentNotFoundException(id);
        }

        var document = doc.get();

        return ResponseAPI.good(DocumentsMapper.MAPPER.toDTO(
            document));
    }


    @Override
    public ResponseAPI<PaginationResponse<DocumentDTO>> getAxapac(
        GlobalCriteria globalCriteria) {
        GlobalCriteria criteria = Optional.ofNullable(globalCriteria).orElseGet(GlobalCriteria::new);
        DocumentCriteria documentCriteria = new DocumentCriteria(criteria);
        Page<Document> documents = documentServicesManager.documentsService()
            .findlAllAxapac(documentCriteria);
        return ResponseAPI.good(
            PaginationResponse.of(documents.map(DocumentsMapper.MAPPER::toDTO)));
    }


    @Override
    public ResponseAPI<String> showToken(Long id) throws DocumentNotFoundException {
        var user = userService.getUserDetailsCustom();
        var doc = documentServicesManager.documentsService().findOneById(id);
        if (doc.isEmpty()) {
            throw new DocumentNotFoundException(id);
        }

        var document = doc.get();

        String username = user.getUser().getUsername();
        String tpag = user.getUser().getTpag();

        Map<String, Object> additionalInfo = new HashMap<>();
        additionalInfo.put(DOCUMENT_CLAIM, document.getId());
        additionalInfo.put(PORTFOLIOS_CLAIM,
            user.getPortfolios() != null ? Strings.join(user.getPortfolios(), ',') : "");
        additionalInfo.put(TPAG, tpag);

        try {
            String encryptedToken = aesMessage.encrypt(
                jwtService.generateToken(username, additionalInfo));
            return ResponseAPI.good(encryptedToken);

        } catch (Exception e) {
            throw new EncryptJwtException("Error when generating token " + e.getMessage());
        }


    }

    @Override
    @UserAction(UserActionType.PRINT)
    public ResponseEntity<byte[]> print(Long id) {
        return download(id);
    }


    /**
     * Get document binary
     *
     * @return an api response with the document binary
     * @throws DocumentNotFoundException if the document is not found
     */
    @Override
    @UserAction(UserActionType.DOWNLOAD)
    public ResponseEntity<byte[]> download(Long id) {

        var userDetail = userService.getUserDetailsCustom();
        Jwt token = userDetail.getToken();

        Integer documentId = token.<Integer>getClaim(DOCUMENT_CLAIM);

        if (documentId == null || id != documentId.longValue()) {
            throw new PermissionsDeniedException(
                String.format(USER_NO_PERMISSION_FORMAT, userDetail.getUser().getUsername(), id));
        }

        try {
            byte[] binary = documentServicesManager.documentsService().getDocumentFile(id);
            HttpHeaders httpHeaders = new HttpHeaders();

            if (Boolean.TRUE.equals(userDetail.hasPermission(Permission.PDF))) {
                httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=a.pdf");
            } else {
                httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION,
                    "inline; filename=" + id + ".pdfi");
            }

            httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM_VALUE);
            return ResponseAPI.good(binary, httpHeaders).toResponseEntity();
        } catch (IOException e) {
            throw new DocumentNotFoundException("Document " + id + " not found");
        }

    }

    @Override
    public ResponseEntity<byte[]> show() {
        var userDetail = userService.getUserDetailsCustom();
        Jwt token = userDetail.getToken();

        Integer id = token.<Integer>getClaim(DOCUMENT_CLAIM);

        if (id == null) {
            throw new PermissionsDeniedException(
                String.format(USER_NO_PERMISSION_FORMAT, userDetail.getUser().getUsername(), null));
        }

        try {
            byte[] binary = documentServicesManager.documentsService()
                .getDocumentFile(id.longValue());
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);
            httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"mon-document.pdf\"");
            return ResponseAPI.good(binary, httpHeaders).toResponseEntity();
        } catch (IOException e) {
            throw new DocumentNotFoundException("Document " + id + " not found");
        }
    }

    @Override
    public ResponseAPI<List<String>> getSubscriber(List<Long> ids) throws MissingArgumentException {
        if (ids == null || ids.isEmpty()) {
            throw new IdMissingException();
        }

        String subscribers = subscriberService.findByIdDocumentList(ids);

        if (subscribers == null) {
            return ResponseAPI.good(new ArrayList<>());
        }

        return ResponseAPI.good(List.of(subscribers.split(";")));
    }


    @Override
    public ResponseAPI<List<DocumentGedDTO>> getGed(List<Long> ids)
        throws MissingArgumentException {
        if (ids == null || ids.isEmpty()) {
            throw new IdMissingException();
        }
        return ResponseAPI.good(
            documentServicesManager.documentsService().getDocumentGedInformations(ids));
    }

    /**
     * Delete all documents. Pass a list of ids separated by commas
     *
     * @param ids list of ids
     * @return a api response
     * @throws DocumentNotFoundException if one of the ids is not found
     * @throws IdMissingException        if ids is null or empty
     */
    @Override
    @UserAction(UserActionType.DELETE)
    public ResponseAPI<Boolean> delete(List<Long> ids) throws IdMissingException {
        if (ids == null || ids.isEmpty()) {
            throw new IdMissingException();
        }
        try {
            documentServicesManager.documentsService().deleteAll(ids);
            return ResponseAPI.good(true);
        } catch (Exception e) {
            return ResponseAPI.bad(false);
        }
    }

    @Override
    @UserAction(value = UserActionType.UPDATE, id = 1)
    public ResponseAPI<List<DocumentDTO>> updateDocuments(
        @RequestBody DocumentUpdate documentUpdate, List<Long> ids)
        throws DocumentNotFoundException {
        if (documentUpdate == null) {
            throw new MissingArgumentException("body is required");
        }

        if (ids.stream().anyMatch(i -> i <= 0)) {
            throw new IllegalArgumentException("id must be greater than 0");
        }

        var documents = documentServicesManager.documentsService()
            .updateDocuments(documentUpdate, ids);

        return ResponseAPI.good(DocumentsMapper.MAPPER.toDTOs(documents));
    }


    @Override
    @UserAction(UserActionType.MAIL)
    public ResponseAPI<Boolean> sendEmail(List<Long> id, EmailInformation emailInformation)
        throws DocumentNotFoundException {
        DocumentCriteria documentCriteria = new DocumentCriteria();
        documentCriteria.setIds(id);

        var documents = documentServicesManager.documentsService()
            .findAllByIds(documentCriteria);

        if (documents.isEmpty()) {
            throw new DocumentNotFoundException("No documents found");
        }

        var email = Email.from(emailInformation);

        try {
            for (var doc : documents) {
                var binary = documentServicesManager.documentsService()
                    .getDocumentFile(doc.getId());
                var attachment = new AttachmentDTO(doc.getBeautifyFilename(), binary);
                email.addAttachment(attachment);
            }
        } catch (IOException e) {
            LOGGER.error("Cannot send email : {}", e.getMessage());
            throw new IllegalArgumentException(e.getMessage());
        }

        DocumentUpdate documentUpdate = new DocumentUpdate();
        documentUpdate.setSent(true);

        updateDocuments(documentUpdate, documents.stream().map(Document::getId).toList());

        if (emailService.sendEmail(email)) {
            return ResponseAPI.good(true);
        }

        return ResponseAPI.bad(false);
    }


    @Override
    public ResponseAPI<List<Set<PrePrinted>>> getPrePrinted(List<Long> ids)
        throws MissingArgumentException {
        if (ids == null || ids.isEmpty()) {
            throw new IdMissingException();
        }
        Set<PrePrinted> preprintedFromDocuments = documentServicesManager.documentsService()
            .getPreprintedFromDocuments(ids);
        return ResponseAPI.good(List.of(preprintedFromDocuments));
    }


    @Override
    public ResponseAPI<Boolean> esign(GlobalCriteria criteria)
        throws MissingArgumentException {
        GlobalCriteria globalCriteria = Optional.ofNullable(criteria).orElseThrow(
            () -> new MissingArgumentException("criteria is required"));

        DocumentCriteria documentCriteria = new DocumentCriteria(globalCriteria);

        if (Objects.isNull(documentCriteria.getIds()) || documentCriteria.getIds().isEmpty()) {
            throw new IdMissingException();
        }

        List<Document> documents = documentServicesManager.documentsService()
            .findAll(documentCriteria, PaginationCriteria.from(documentCriteria.getIds().size()))
            .getContent();

        return ResponseAPI.good(
            documentServicesManager.documentsService().isEsignDocuments(documents));
    }


    @Override
    public ResponseAPI<Boolean> reference(GlobalCriteria criteria)
        throws MissingArgumentException {
        GlobalCriteria globalCriteria = Optional.ofNullable(criteria).orElseThrow(
            () -> new MissingArgumentException("criteria is required"));

        DocumentCriteria documentCriteria = new DocumentCriteria(globalCriteria);

        if (documentCriteria.getIds().isEmpty()) {
            throw new IdMissingException();
        }

        List<Document> documents = documentServicesManager.documentsService()
            .findAll(documentCriteria, PaginationCriteria.from(documentCriteria.getIds().size()))
            .getContent();

        return ResponseAPI.good(
            documentServicesManager.documentsService().hasSameReference(documents));
    }

}
