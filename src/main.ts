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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.repository.query.Param;
import java.util.Optional;

@Repository
public interface ILogRepository extends
    PagingAndSortingRepository<Log, Long>,JpaRepository<Log, Long>, JpaSpecificationExecutor<Log>
{

	@Query("SELECT new Action(l.action) FROM Log l GROUP BY l.action")
	Iterable<Action> findAllDistinctActions();

	@Query("""
  SELECT new fr.axa.pfel.console.LogDTO(
      l.id,
      l.action,
      l.clientRequest,
      l.time,
      l.userName,
      l.logApplication.appName,
      l.numContract,
      l.portfolio,
      l.server,
      l.isError,
      l.logTemplate.template,
      l.dateCreated
  )
  FROM Log l
""")

	Page<LogDTO> findAllSummarized(Pageable pageable);

	@Query("SELECT new fr.axa.pfel.console.LogDetailDTO(" +
			"l.id, l.request, l.information, l.numClient, l.numSubscriber, l.numClaim, " +
			"l.clientName, l.time, l.numPages, l.numDoc, l.isWeb, l.isMassPrinting, " +
			"l.isGed, l.isEmail, l.isStored, l.isLive, l.isLocalPrinting, l.error) " +
			"FROM Log l WHERE l.id = :id")
	Optional<LogDetailDTO> findDetailById(@Param("id") Long id);


}
fait   @EntityGraph 
