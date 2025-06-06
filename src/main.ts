package fr.axa.pfel.console;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LogSearchSpecificationInfo {
    private String action;
    private String requestId;
    private String userName;
    private String portfolio;
    private String numContract;
    private String applicationName;
    private String template;
    private LocalDateTime endDate;
    private LocalDateTime startDate;
    private String numClient;
    private String numClaim;
    @JsonProperty("isError")
    private Boolean isError;


    public Boolean isError() {
        return isError;
    }

}
