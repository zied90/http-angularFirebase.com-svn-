package fr.axa.pfel.spoolnetng.api.repositories;


import fr.axa.pfel.spoolnetng.api.models.database.TemplateInfo;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemplateInfoRepository extends JpaRepository<TemplateInfo, Long> {

    @EntityGraph(attributePaths = {"productLabel", "businessPerimeter", "groupKey",
        "productFamily"})
    Optional<TemplateInfo> findByTemplate(String template);


}


package fr.axa.pfel.spoolnetng.api.models.database;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CacheConcurrencyStrategy;


@Entity
@Table(name = "T_TEMPLATE_INFO")
@Getter
@Setter
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class TemplateInfo {
    @Id
    @Column(name = "TEMPLATE_INFO_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name ="TEMPLATE")
    private String template;
    @Column(name = "LABEL")
    private String label;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PRODUCT_LABEL_ID")
    private ProductLabel productLabel;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "BUSINESS_PERIMETER_ID")
    private BusinessPerimeter businessPerimeter;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "GROUP_KEY_ID")
    private GroupKey groupKey;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PRODUCT_FAMILY_ID")
    private ProductFamily productFamily;
    @Column(name = "GROUP_TYPE")
    private Long groupType;


}
