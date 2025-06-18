package fr.axa.pfel.console;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITemplateRepository extends JpaRepository<LogTemplate, Long> {

    List<LogTemplate> findByTemplate(String template);
}

package fr.axa.pfel.console.logs.impl;

import fr.axa.pfel.console.ITemplateRepository;
import fr.axa.pfel.console.LogTemplate;
import fr.axa.pfel.console.logs.ITemplateService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemplateService implements ITemplateService {

    private final ITemplateRepository templateRepository;

    public TemplateService(ITemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public List<LogTemplate> searchLogTemplates(String term) {

        return templateRepository.findByTemplate(term);
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOGS_APPLICATION_ID", referencedColumnName = "ID", nullable = false)
    private LogApplication logApplication;

    @Column(name = "TEMPLATE")
    private String template;

}



