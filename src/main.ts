package fr.axa.pfel.console;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

}


package fr.axa.pfel.console;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogDetailDTO {
    private Long id;
    private String request;
    private String information;
    private String numClient;
    private String numSubscriber;
    private String numClaim;
    private String clientName;
    private Double time;
    private Long numPages;
    private Long numDoc;
    private boolean isWeb;
    private boolean isMassPrinting;
    private boolean isGed;
    private boolean isEmail;
    private boolean isStored;
    private boolean isLive;
    private boolean isLocalPrinting;
    private String error;
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
