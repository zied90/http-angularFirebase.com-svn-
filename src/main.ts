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



}

package fr.axa.pfel.console;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
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
