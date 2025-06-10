package fr.axa.pfel.console.criteria.log;

import fr.axa.pfel.console.Log;
import fr.axa.pfel.console.LogTemplate_;
import fr.axa.pfel.console.Log_;
import fr.axa.pfel.console.criteria.CaseMode;
import fr.axa.pfel.console.criteria.Criteria;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class LogTemplateCriteria extends Criteria<Log> {
    
    
    private final String template;

    public LogTemplateCriteria(String template) {
        this.template = template;
    }

    @Override
    public Predicate toPredicate(Root<Log> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        if (template != null && !template.isBlank()) {
            return like(criteriaBuilder, root.get(Log_.logTemplate).get(LogTemplate_.template), template, CaseMode.UPPER);
        }
        return query.getRestriction();
    }
}
