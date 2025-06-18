package fr.axa.pfel.console;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITemplateRepository extends JpaRepository<LogTemplate, Long> {

    List<LogTemplate> findByTemplateContainingIgnoreCase(String template);
}
package fr.axa.pfel.console;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "T_LOGS_TEMPLATE")
@NamedEntityGraph(name="template",attributeNodes = {@NamedAttributeNode("id"),@NamedAttributeNode("template")})
public class LogTemplate {
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LOGS_APPLICATION_ID", referencedColumnName = "ID", nullable = false)
    private LogApplication logApplication;

    @Column(name = "TEMPLATE")
    private String template;

}


@Service
public class TemplateService implements ITemplateService {

    private final ITemplateRepository templateRepository;

    public TemplateService(ITemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    @Override
    public List<TemplateDTO> searchLogTemplates(String template) {
        List<TemplateDTO> templates=new ArrayList<>();

        var result= templateRepository.findByTemplateContainingIgnoreCase(template);
        for (var r:result){
          templates.add(TemplateDTO.builder().id(r.getId()).template(r.getTemplate()).build())  ;
        }
        return templates;
    }
}

package fr.axa.pfel.console;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TemplateDTO {
    private Long id;
    private String template;
}


package fr.axa.pfel.console.mapper;

import fr.axa.pfel.console.Application;
import fr.axa.pfel.consolepfel.spoolnet.client.model.ApplicationUpdate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ApplicationMapper {

    ApplicationMapper INSTANCE = Mappers.getMapper(ApplicationMapper.class);

    @Mapping(source = "name", target = "nameApp")
    @Mapping(source = "spool", target = "isSpool")
    @Mapping(target = "password", defaultValue = "N/A")
    Application toEntity(ApplicationUpdate dto);
}
