@Query("""
			   SELECT new fr.axa.pfel.console.LogDTO(
			       l.id,
			       l.action,
			       l.clientRequest,
			       l.time,
			       l.userName,
			       a.appName,
			       l.numContract,
			       l.portfolio,
			       l.server,
			       l.isError,
			       t.template,
			       l.dateCreated
			   )
			   FROM Log l
			   LEFT JOIN l.logApplication a
			   LEFT JOIN l.logTemplate t
			""")
	Page<LogDTO> findAllSummarized(Pageable pageable);



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
public class LogTemplate {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
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


package fr.axa.pfel.console;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LogDTO {
    private Long id;
    private String action;
    private String clientRequest;
    private Double time;
    private String userName;
    private String appName;
    private String numContract;
    private String portfolio;
    private String server;
    private boolean isError;
    private String template;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateCreated;
    public LogDTO(Long id,String action, String clientRequest, Double time, String userName,
                  String appName, String numContract, String portfolio,
                  String server, boolean isError, String template, LocalDateTime dateCreated) {
        this.id=id;
        this.action = action;
        this.clientRequest = clientRequest;
        this.time = time;
        this.userName = userName;
        this.appName = appName;
        this.numContract = numContract;
        this.portfolio = portfolio;
        this.server = server;
        this.isError = isError;
        this.template = template;
        this.dateCreated = dateCreated;
    }
}
