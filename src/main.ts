   Page<LogDTO> findAllSummarized(Pageable pageable);

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

   @Override
    public Page<LogDTO> findAllSummarized(Pageable pageable) {
        return logRepository.findAllSummarized(pageable);
    }


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
	Page<LogDTO> findAllSummarized(Pageable pageable);package fr.axa.pfel.console.mapper;

import fr.axa.pfel.consolepfel.client.model.PaginationParameters;
import fr.axa.pfel.consolepfel.client.model.PaginationParameters.OrderEnum;
import java.util.Objects;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class PageableMapper {

    public Pageable from(PaginationParameters paginationParameters) {
        Integer page = Objects.requireNonNullElseGet(paginationParameters.getPage(), () -> 0);
        Integer pageSize = Objects.requireNonNullElseGet(paginationParameters.getSize(), () -> 10);
        String sortColumn = Objects.requireNonNullElse(paginationParameters.getSortBy(), "id");
        boolean isAscending = Objects.requireNonNullElse(paginationParameters.getOrder(), OrderEnum.DESC).getValue().equals("ASC");

        Sort sort = isAscending
            ? Sort.by(sortColumn).ascending()
            : Sort.by(sortColumn).descending();
        return PageRequest.of(page, pageSize, sort);
    }

}
  @Override
    public ResponseEntity<Iterable<LogDTO>> findSummarized(PaginationParameters pagination) {
        Pageable pageable = pageableMapper.from(pagination);
        return ResponseEntity.ok(iLogService.findAllSummarized(pageable));
    }
