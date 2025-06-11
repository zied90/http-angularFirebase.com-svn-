package fr.axa.pfel.console.controllers;

import fr.axa.pfel.console.TemplateDTO;
import fr.axa.pfel.console.logs.ITemplateService;
import fr.axa.pfel.console.swaggers.ITemplateApi;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class TemplateController implements ITemplateApi {

    private final ITemplateService templateService;

    public TemplateController(ITemplateService templateService) {
        this.templateService = templateService;
    }


    @Override
    public List<TemplateDTO> getTemplates(String term) {
        return templateService.searchLogTemplates(term);
    }



    public Optional<TemplateDTO> getTemplateById(Long id) {
        return templateService.getTemplateById(id);
    }
}

package fr.axa.pfel.console.swaggers;

import fr.axa.pfel.console.TemplateDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Tag(name = "Template", description = "Récupère les Template ")
public interface ITemplateApi extends ApiV1 {

    @Operation(summary = "Récupère la liste des templates", tags = {"Actions"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Récupération des templates réussie"),
            @ApiResponse(responseCode = "400", description = "Erreur de validation de la requête"),
            @ApiResponse(responseCode = "500", description = "Erreur interne")}
    )
    @GetMapping("/templates")
    List<TemplateDTO> getTemplates(@RequestParam String term);


    @Operation(summary = "Récupère la templates", tags = {"Template_Logs"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Récupération de la template réussie"),
            @ApiResponse(responseCode = "400", description = "Erreur de validation de la requête"),
            @ApiResponse(responseCode = "500", description = "Erreur interne")}
    )
    @GetMapping("/template/{id}")
    Optional<TemplateDTO> getTemplateById(@PathVariable Long id);

}


package fr.axa.pfel.console.logs;


import fr.axa.pfel.console.TemplateDTO;

import java.util.List;
import java.util.Optional;

public interface ITemplateService {

    List<TemplateDTO> searchLogTemplates(String term);
    Optional<TemplateDTO> getTemplateById(Long id);

}

package fr.axa.pfel.console.logs.impl;

import fr.axa.pfel.console.ITemplateRepository;
import fr.axa.pfel.console.TemplateDTO;
import fr.axa.pfel.console.logs.ITemplateService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateService implements ITemplateService {

    private final ITemplateRepository templateRepository;

    public TemplateService(ITemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public List<TemplateDTO> searchLogTemplates(String term) {
        return templateRepository.findTemplates(term);
    }

    @Override
    public Optional<TemplateDTO> getTemplateById(Long id) {
        var t= templateRepository.findById(id);
        return t.map(log -> TemplateDTO.builder()
                .template(log.getTemplate())
                .id(log.getId()).build());

    }
}
package fr.axa.pfel.console;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ITemplateRepository extends JpaRepository<LogTemplate, Long> {
    @Query("SELECT new fr.axa.pfel.console.TemplateDTO(l.id, l.template) " +
            "FROM LogTemplate l WHERE LOWER(l.template) LIKE LOWER(CONCAT('%', :term, '%'))")
    List<TemplateDTO> findTemplates(@Param("term") String term);
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

voci url 
http://localhost:8082/consolepfel/api/v1/template/test?id=55


retour {
  "type": "about:blank",
  "title": "Not Found",
  "status": 404,
  "detail": "No static resource api/v1/template/test.",
  "instance": "/consolepfel/api/v1/template/test",
  "properties": null
}
