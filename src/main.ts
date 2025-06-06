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
        var s=buildSpecification(specificationInfo);
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
package fr.axa.pfel.console.criteria.log;

import fr.axa.pfel.console.Log;
import fr.axa.pfel.console.Log_;
import fr.axa.pfel.console.criteria.Criteria;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class LogNumContractCriteria extends Criteria<Log> {
    
    
    private final String numContract;


    public LogNumContractCriteria(String numContract) {
        this.numContract = numContract;
    }

    @Override
    public Predicate toPredicate(Root<Log> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (numContract != null && !numContract.isBlank()) {
            return likeLower(criteriaBuilder, root.get(Log_.numContract), numContract);
        }
        return query.getRestriction();
    }
}


    protected Predicate likeLower(CriteriaBuilder criteriaBuilder, Path<String> attribute,
                             String value) {
        return criteriaBuilder.like(criteriaBuilder.lower(attribute), getLikeValue(value));
    }

package fr.axa.pfel.console.criteria;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public abstract class Criteria<T> implements Specification<T> {

    protected String getLikeValue(String value) {
        return "%" + value.toUpperCase() + "%";
    }


    protected Predicate like(CriteriaBuilder criteriaBuilder, Path<String> attribute,
        String value) {
        return criteriaBuilder.like(criteriaBuilder.upper(attribute), getLikeValue(value));
    }

    protected Predicate likeLower(CriteriaBuilder criteriaBuilder, Path<String> attribute,
                             String value) {
        return criteriaBuilder.like(criteriaBuilder.lower(attribute), getLikeValue(value));
    }

    protected Predicate likeIn(CriteriaBuilder criteriaBuilder, Path<String> attribute, List<String> value) {
        return criteriaBuilder.upper(attribute).in(value.stream().map(String::toUpperCase).toList());
    }

    protected Predicate equalsIgnoreCase(CriteriaBuilder criteriaBuilder, Path<String> attribute,
        String value) {
        return criteriaBuilder.equal(criteriaBuilder.upper(attribute), value.toUpperCase());
    }

}

