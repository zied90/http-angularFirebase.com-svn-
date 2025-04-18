    @Override
    public ResponseEntity<byte[]> show() {

        var userDetail = userService.getUserDetailsCustom();
        Jwt token = userDetail.getToken();

        Integer id = token.<Integer>getClaim(DOCUMENT_CLAIM);

        if (id == null) {
            throw new PermissionsDeniedException(
                String.format(USER_NO_PERMISSION_FORMAT, userDetail.getUser().getUsername(), null));
        }

        try {
            byte[] binary = documentServicesManager.documentsService()
                .getDocumentFile(id.longValue());
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);
            httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=a.pdf");
            System.out.println("httpHeaders"+httpHeaders);
            return ResponseAPI.good(binary, httpHeaders).toResponseEntity();
        } catch (IOException e) {
            throw new DocumentNotFoundException("Document " + id + " not found");
        }
    }
