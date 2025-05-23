
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

 @Override
    public ResponseEntity<Iterable<Log>> findPaginated(PaginationParameters pagination) {
        Pageable pageable = pageableMapper.from(pagination);
        return ResponseEntity.ok(iLogService.findPaginated(pageable));
    }


    @Override
    public Page<Log> findPaginated(Pageable pageable) {

        return logRepository.findAll(pageable);
    }


   @GetMapping(value = "/logs")
    ResponseEntity<Iterable<Log>> findPaginated(PaginationParameters pagination);

    @Operation(summary = "Recherche de logs", tags = {"Logs"})
    @ApiResponses(value = {
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Récherche de logs réussie"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Erreur de validation de la requête"),
        @ApiResponse(responseCode = "500", description = "Erreur interne")}
    ) moi au chargement jai besoin que de action ,clientRequest,time,userName ,logApplication.appName,numContract,portfolio,server,isError  mais lorsque je cllique  doggle deytatl je recupere  les autre information  <>
      <div className="expanded-row">
        <div className="expanded-row__column">
          <label className="fontLabel">Id :</label> <span>{item.id}</span>
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">IdRequest :</label>
          <span>{item.request}</span>
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">IdReference :</label> {item.information}
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Num Client : </label>
          {item.numClient}
        </div>
      </div>
      <div className="expanded-row">
        <div className="expanded-row__column">
          <label className="fontLabel">Num subscriber :</label>{" "}
          <span>{item.numSubscriber}</span>
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Num sinistre :</label>
          {item.numClaim}
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Nom Client : </label>
          <span> {item.clientName}</span>
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Time HP (s) :</label>
          <span>
            {isNaN(item.time)
              ? "0"
              : item.time === 0
              ? "0"
              : item.time.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="expanded-row">
        <div className="expanded-row__column">
          <label className="fontLabel">Nombre de page :</label>
          <span>{item.numPages}</span>
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Nombre de doc :</label>
          <span>{item.numDoc}</span>
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Web :</label> {item.isWeb.toString()}
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Masspiritting :</label>{" "}
          {item.isMassPrinting.toString()}
        </div>
      </div>
      <div className="expanded-row">
        <div className="expanded-row__column">
          <label className="fontLabel">Ged :</label> {item.isGed.toString()}
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Email :</label> {item.isEmail.toString()}
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Stored :</label>{" "}
          {item.isStored.toString()}
        </div>
        <div className="expanded-row__column">
          <label className="fontLabel">Live:</label> {item.isLive.toString()}
        </div>
      </div>
      <div className="expanded-row">
        <div className="expanded-row__column">
          <label className="fontLabel">LocalPrinting :</label>{" "}
          {item.isLocalPrinting.toString()}
        </div>
        <div className="expanded-row__column"></div>
        <div className="expanded-row__column"></div>
        <div className="expanded-row__column"></div>
      </div>
      {item.isError ? (
        <div className="row p-1 ">
          <div className="alert alert-danger" role="alert">
          {item.error || "Pas d'erreur remontée par l'API"}
          </div>
        </div>
      ) : null}
    </> moi je veux recuperer que ce que jai besoin car jai problemen lenteur 
