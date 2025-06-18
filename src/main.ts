package fr.axa.pfel.console;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

package fr.axa.pfel.console.mapper;


import fr.axa.pfel.console.Log;
import fr.axa.pfel.console.LogDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import java.util.List;
@Mapper
public interface LogMapper {
    LogMapper INSTANCE = Mappers.getMapper(LogMapper.class);
    @Mapping(source = "logApplication.appName", target = "appName")
    @Mapping(source = "logTemplate.template", target = "template")
    @Mapping(source = "id", target = "id")
    @Mapping(source = "action", target = "action")
    @Mapping(source = "clientRequest", target = "clientRequest")
    @Mapping(source = "time", target = "time")
    @Mapping(source = "userName", target = "userName")
    @Mapping(source = "numContract", target = "numContract")
    @Mapping(source = "portfolio", target = "portfolio")
    @Mapping(source = "server", target = "server")
    @Mapping(source = "isError", target = "isError")
    @Mapping(source = "dateCreated", target = "dateCreated")
    LogDTO toDto(Log log);
    List<LogDTO> toDtoList(List<Log> logs);
}

    @Override
    public Page<LogDTO> findAllSummarized(Pageable pageable) {
        Page<Log> logs = logRepository.findAll(pageable);
        return logs.map(LogMapper.INSTANCE::toDto);
    }

[INFO] consolepfelrefonte-service ......................... SKIPPED
[INFO] consolepfelrefonte-controller ...................... SKIPPED
[INFO] consolepfelrefonte-main ............................ SKIPPED
[INFO] ------------------------------------------------------------------------
[INFO] BUILD FAILURE
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  01:07 min
[INFO] Finished at: 2025-06-18T16:31:25+02:00
[INFO] ------------------------------------------------------------------------
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.13.0:compile (default-compile) on project consolepfel-model: Compilation failure
[ERROR] /C:/dev/Backend/consolepfelrefonte/consolepfel-model/src/main/java/fr/axa/pfel/console/mapper/LogMapper.java:[25,12] No property named "isError" exists in source parameter(s). Did you mean "error"?
[ERROR]
[ERROR] -> [Help 1]
[ERROR]
[ERROR] To see the full stack trace of the errors, re-run Maven with the -e switch.
[ERROR] Re-run Maven using the -X switch to enable full debug logging.
[ERROR]
[ERROR] For more information about the errors and possible solutions, please read the following articles:
[ERROR] [Help 1] http://cwiki.apache.org/confluence/display/MAVEN/MojoFailureException
[ERROR]
[ERROR] After correcting the problems, you can resume the build with the command
[ERROR]   mvn <args> -rf :consolepfel-model
