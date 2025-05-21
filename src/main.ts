    private static GetDocumentContentRequest initGetDocumentRequest(String userId, String docId,String... projects) {
        return new GetDocumentContentRequest().docId(docId)
                .commonParameters(new fr.axa.pfel.client.model.CommonParameters()
                        .endUserId(userId).locale(fr.axa.pfel.client.model.Locale.FR_FR)
                        .applicationCaller(StringUtils.equals(getProject(projects), projectSante) ? "KIOSK" : "SOLARIS_UAP")
                );
    }
 private static String getProject(String[] projects) {
        return projects != null && projects.length > 0 ? projects[0] : "";
    }

je veux que retourne direct la valeur  et pas utiliser  ? "KIOSK" : "SOLARIS_UAP" mais peut etre deplacer dans get project
