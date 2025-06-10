package fr.axa.pfel.console.logs.impl;

import fr.axa.pfel.console.*;
import fr.axa.pfel.console.criteria.log.*;
import fr.axa.pfel.console.logs.ILogService;
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
    public Page<Log> findAllByCriteria(LogSearchSpecificationInfo specificationInfo,Pageable pageable) {
        return logRepository.findAll(buildSpecification(specificationInfo), pageable);
    }

    @Override
    public Page<LogDTO> findAllSummarized(Pageable pageable) {
        return logRepository.findAllSummarized(pageable);
    }

    @Override
    public Optional<LogDetailDTO> findDetailById(Long id) {
        return logRepository.findDetailById(id);
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
                .and(new LogTemplateCriteria(specificationInfo.getTemplate()))
                .and(new LogIsErrorCriteria(specificationInfo.isError()))
                .and(new LogDateCriteria(specificationInfo.getStartDate(), specificationInfo.getEndDate()))
                .and(new LogNumClientCriteria(specificationInfo.getNumClient()))
                .and(new LogNumClaimCriteria(specificationInfo.getNumClaim()));

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
