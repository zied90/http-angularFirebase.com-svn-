package fr.axa.pfel.console.mapper;
import fr.axa.pfel.console.Log;
import fr.axa.pfel.console.LogDetailDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;
@Mapper
public interface LogDetailMapper {
    LogDetailMapper INSTANCE = Mappers.getMapper(LogDetailMapper.class);
    @Mapping(source = "id", target = "id", defaultValue = "0")
    @Mapping(source = "request", target = "request", defaultValue = "N/A")
    @Mapping(source = "information", target = "information", defaultValue = "N/A")
    @Mapping(source = "numClient", target = "numClient", defaultValue = "N/A")
    @Mapping(source = "numSubscriber", target = "numSubscriber", defaultValue = "N/A")
    @Mapping(source = "numClaim", target = "numClaim", defaultValue = "N/A")
    @Mapping(source = "clientName", target = "clientName", defaultValue = "N/A")
    @Mapping(source = "time", target = "time", defaultValue = "0")
    @Mapping(source = "numPages", target = "numPages", defaultValue = "0")
    @Mapping(source = "numDoc", target = "numDoc", defaultValue = "0")
    @Mapping(source = "web", target = "web")
    @Mapping(source = "massPrinting", target = "massPrinting", defaultValue = "false")
    @Mapping(source = "isGed", target = "isGed", defaultValue = "false")
    @Mapping(source = "isEmail", target = "isEmail", defaultValue = "false")
    @Mapping(source = "isStored", target = "isStored", defaultValue = "false")
    @Mapping(source = "isLive", target = "isLive", defaultValue = "false")
    @Mapping(source = "isLocalPrinting", target = "isLocalPrinting", defaultValue = "false")
    @Mapping(source = "error", target = "error", defaultValue = "N/A")
    LogDetailDTO toDto(Log log);
    List<LogDetailDTO> toDtoList(List<Log> logs);
}
package fr.axa.pfel.console.mapper;

import fr.axa.pfel.console.Log;
import fr.axa.pfel.console.LogDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;
@Mapper
public interface LogMapper {
    LogMapper INSTANCE = Mappers.getMapper(LogMapper.class);
    @Mapping(source = "id", target = "id")
    @Mapping(source = "action", target = "action")
    @Mapping(source = "clientRequest", target = "clientRequest")
    @Mapping(source = "time", target = "time")
    @Mapping(source = "userName", target = "userName")
    @Mapping(source = "logApplication.nameApp", target = "appName")
    @Mapping(source = "numContract", target = "numContract")
    @Mapping(source = "portfolio", target = "portfolio")
    @Mapping(source = "server", target = "server")
    @Mapping(source = "isError", target = "isError")
    @Mapping(source = "logTemplate.template", target = "template")
    @Mapping(source = "dateCreated", target = "dateCreated")
    LogDTO toDto(Log log);
    List<LogDTO> toDtoList(List<Log> logs);
}

package fr.axa.pfel.console.logs.impl;

import fr.axa.pfel.console.*;
import fr.axa.pfel.console.criteria.log.*;
import fr.axa.pfel.console.logs.ILogService;
import fr.axa.pfel.console.mapper.LogDetailMapper;
import fr.axa.pfel.console.mapper.LogMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LogService implements ILogService {

    private final ILogRepository logRepository;


    public LogService(ILogRepository logRepository) {
        this.logRepository = logRepository;
    }

    @Override
    public Optional<Log> findById(Long id) {
        return this.logRepository.findById(id);
    }

    @Override
    public Page<Log> findPaginated(Pageable pageable) {

        return logRepository.findAll(pageable);
    }

    @Override
    public Page<LogDTO> findAllByCriteria(LogSearchSpecificationInfo specificationInfo,Pageable pageable) {
        Page<Log> logPage = logRepository.findAll(buildSpecification(specificationInfo), pageable);
        return logPage.map(log -> LogDTO.builder()
                .id(log.getId())
                .action(log.getAction())
                .clientRequest(log.getClientRequest())
                .time(log.getTime())
                .userName(log.getUserName())
                .appName(log.getLogApplication() != null ? log.getLogApplication().getAppName() : null)
                .numContract(log.getNumContract())
                .portfolio(log.getPortfolio())
                .server(log.getServer())
                .isError(log.isError())
                .template(log.getLogTemplate() != null ? log.getLogTemplate().getTemplate() : null)
                .dateCreated(log.getDateCreated())
                .build()
        );
    }

    @Override
    public Page<LogDTO> findAllSummarized(Pageable pageable) {
        Page<Log> logs = logRepository.findAll(pageable);
        return logs.map(LogMapper.INSTANCE::toDto);
    }

    @Override
    public Optional<LogDetailDTO> findDetailById(Long id) {
        return logRepository.findById(id)
                .map(LogDetailMapper.INSTANCE::toDto);
    }
    /**
     * Generate an specification object according to the Logs search criteria.
     *
     * @param specificationInfo
     * @return Specification<Log>
     */
    public Specification<Log> buildSpecification(LogSearchSpecificationInfo specificationInfo) {

        return new LogActionCriteria(specificationInfo.getAction())
                .and(new LogRequestIdCriteria(specificationInfo.getRequestId()))
                .and(new LogUserNameCriteria(specificationInfo.getUserName()))
                .and(new LogPortfolioCriteria(specificationInfo.getPortfolio()))
                .and(new LogNumContractCriteria(specificationInfo.getNumContract()))
                .and(new LogApplicationNameCriteria(specificationInfo.getApplicationName()))
                .and(new LogTemplateCriteria(specificationInfo.getTemplateId()))
                .and(new LogIsErrorCriteria(specificationInfo.isError()))
                .and(new LogDateCriteria(specificationInfo.getStartDate(), specificationInfo.getEndDate()))
                .and(new LogNumClientCriteria(specificationInfo.getNumClient()))
                .and(new LogNumClaimCriteria(specificationInfo.getNumClaim()));

    }


}

package fr.axa.pfel.console;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Builder
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "T_LOGS")
public class Log {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ACTION", nullable = false)
    private String action;

    @Column(name = "NUM_CLAIM")
    private String numClaim;

    @Column(name = "CLIENT_NAME")
    private String clientName;

    @Column(name = "NUM_CLIENT")
    private String numClient;

    @Column(name = "NUM_CONTRACT")
    private String numContract;

    @Column(name = "STATE_DOC")
    private String stateDoc;

    @Column(name = "ERROR")
    private String error;

    @Column(name = "DATE_CREATED")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateCreated;

    @Column(name = "REQUEST")
    private String request;

    @JsonProperty("isEmail")
    @Column(name = "IS_EMAIL", nullable = false)
    private boolean isEmail;

    @JsonProperty("isFax")
    @Column(name = "IS_FAX", nullable = false)
    private boolean isFax;

    @JsonProperty("isGed")
    @Column(name = "IS_GED", nullable = false)
    private boolean isGed;

    @JsonProperty("isLive")
    @Column(name = "IS_LIVE", nullable = false)
    private boolean isLive;

    @JsonProperty("isMassPrinting")
    @Column(name = "IS_MASS_PRINTING", nullable = false)
    private boolean isMassPrinting;

    @JsonProperty("isStored")
    @Column(name = "IS_STORED", nullable = false)
    private boolean isStored;

    @JsonProperty("isWeb")
    @Column(name = "IS_WEB", nullable = false)
    private boolean isWeb;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "LOGS_APPLICATION_ID")
    private LogApplication logApplication;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "LOGS_TEMPLATE_ID")
    private LogTemplate logTemplate;

    @Column(name = "NUM_DOC", nullable = false)
    private Long numDoc;

    @Column(name = "NUM_PAGES", nullable = false)
    private Long numPages;

    @Column(name = "PORTFOLIO")
    private String portfolio;

    @Column(name = "TIME", nullable = false)
    private Double time;

    @Column(name = "NAME_USER")
    private String userName;

    @Column(name = "SERVER")
    private String server;

    @Column(name = "TIME_GENERATION")
    private Double timeGeneration;

    @Column(name = "CLIENT_REQUEST")
    private String clientRequest;

    @Column(name = "INFORMATION")
    private String information;

    @Column(name = "NUM_SUBSCRIBER")
    private String numSubscriber;

    @JsonProperty("isError")
    @Column(name = "IS_ERROR", nullable = false)
    private boolean isError;

    @Column(name = "SIZE_REQUEST")
    private Long sizeRequest;

    @Column(name = "SORTIE")
    private String sortie;

    @JsonProperty("isLocalPrinting")
    @Column(name = "IS_LOCAL_PRINTING", nullable = false, columnDefinition = "BIT DEFAULT 0")
    private boolean isLocalPrinting;


    public Boolean isError() {
        return Boolean.TRUE.equals(isError);
    }

}
package fr.axa.pfel.console;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "T_LOGS_TEMPLATE")
@NamedEntityGraph(name="template",attributeNodes = {@NamedAttributeNode("id"),@NamedAttributeNode("template")})
public class LogTemplate {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOGS_APPLICATION_ID", referencedColumnName = "ID", nullable = false)
    private LogApplication logApplication;

    @Column(name = "TEMPLATE")
    private String template;

}

package fr.axa.pfel.console;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "T_LOGS_APPLICATION")
public class LogApplication {

    @Id
    private Long id;

    @Column(name = "APP_NAME")
    private String appName;

}

