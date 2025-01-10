donne moi le fichiezr .csv  correspond a cette fonction : private List<UserModel> parseCsv(MultipartFile file) throws IOException {
        List<UserModel> users = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] columns = line.split(";"); // Assuming CSV is comma-separated
                if (columns.length >= 5) { // Ensure there are at least 4 columns
                    UserModel user = new UserModel();
                    String firstName = columns[0].trim();
                    String lastName = columns[1].trim();
                    String name =(StringUtils.isNoneBlank(firstName)?firstName.toUpperCase():
                        "")+" "+(StringUtils.isNoneBlank(lastName)?lastName.toUpperCase():"");
                    user.setName(name);
                    user.setUserNumber(columns[2].trim());
                    user.setEmail(columns[3].trim());
                    String axaType = columns[4].trim();
                    List<AuthoritiesEnum> authorities = Collections.singletonList(AuthoritiesEnum.fromValue(axaType));
                    user.setAuthorities(createAuthorities(authorities));
                    users.add(user);
                }
            }
        }
        return users;
    }package fr.axa.pfel.ellipse.model.user;

import fr.axa.pfel.ellipse.constant.WorkspaceEnum;
import fr.axa.pfel.ellipse.storage.domain.Container;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

@Data
public class UserModel {

    private Long id;
    private String name;

    private String email;
    private String userNumber;
    private String groupId;
    private String axaType;
    private List<PortfolioModel> portfolioModels = new ArrayList<>();
    private List<AuthorityModel> authorities;
    private List<WorkspaceModel> workspaceModelList;


    public Long getWorkspaceId() {
        if (workspaceModelList != null) {
            return workspaceModelList.stream()
                .filter(workspaceModel -> email.compareToIgnoreCase(
                    workspaceModel.getName()) == 0
                    && workspaceModel.getWorkspaceTypeModel() != null
                    && workspaceModel.getWorkspaceTypeModel().getName().equals("WORKSPACE"))
                .map(WorkspaceModel::getId).findFirst()
                .orElse(null);
        }

        return null;
    }


    public String getDocumentPath(boolean isFs) {
        return Container.DOCUMENT.getName() + (isFs ? ":/" : "/") + email;

    }

    public String getWorkspacePath(boolean isFs) {
        return Container.WORKSPACE.getName() + (isFs ? ":/" : "/") + email;
    }


    public Set<String> getDefaultWorkspaces() {
        if (this.authorities != null) {
            return this.authorities.stream().map(authorityModel -> {
                switch (authorityModel.getAuthority()) {
                    case "ADMIN":
                    case "AXA_PART":
                        return Set.of(WorkspaceEnum.AXA_PART.getCode(),
                            WorkspaceEnum.NATIONALE.getCode());
                    case "AGT":
                        return Set.of(WorkspaceEnum.NATIONALE.getCode());
                    default:
                        return new HashSet<String>();
                }
            }).reduce(new HashSet<>(), (l, l1) -> {
                l.addAll(l1);
                return l;
            });
        }

        return Set.of(WorkspaceEnum.NATIONALE.getCode());

    }

    public boolean hasRole(String role) {
        if (authorities != null) {
            return authorities.stream()
                .anyMatch(authorityModel -> authorityModel.getAuthority().equals(role));
        }

        return false;
    }

    public boolean hasWorkspace(Long id, String code) {
        if (workspaceModelList != null && !workspaceModelList.isEmpty()) {
            final var b = workspaceModelList.stream()
                .anyMatch(workspaceModel -> workspaceModel.getId().equals(id));
            var check = false;
            if (!"PERSO".equals(code)) {
                check = getDefaultWorkspaces().stream().anyMatch(s -> s.equals(code));
            }

            return b || check;
        }
        return false;
    }

    public boolean isAgent() {
        if (StringUtils.isNotBlank(axaType)) {
            return axaType.equals(AxaTypeEnum.AGENTS_A2P.getValue()) || axaType.equals(
                AxaTypeEnum.AGENTS_A2P_ASSISTANTS.getValue()) || axaType.equals(
                AxaTypeEnum.AGENTS_GENERAUX.getValue()) || axaType.equals(
                AxaTypeEnum.AGENTS_COLLABORATEURS.getValue()) || axaType.equals(
                AxaTypeEnum.AGENTS_MANDATAIRES.getValue());
        }

        return false;
    }

    public boolean isAdmin() {
        return this.authorities != null && this.authorities.stream()
            .anyMatch(authorityModel -> "ADMIN".equals(authorityModel.getAuthority()));
    }
}
