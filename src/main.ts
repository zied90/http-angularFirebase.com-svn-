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

            HttpHeaders httpHeaders = new HttpHeaders();

            byte[] binary = documentServicesManager.documentsService()
                .getDocumentFile(id.longValue());

            documentServicesManager.documentsService()
                .findOneById(id.longValue()).ifPresentOrElse(d -> httpHeaders.setContentDisposition(
                    ContentDisposition.inline()
                        .filename("yyyyyyy" + ".pdf")
                        .build()
                ), () -> httpHeaders.setContentDisposition(
                    ContentDisposition.attachment()
                        .filename( "rrrrrrr.pdf")
                        .build()
                ));


            httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE);
            return ResponseAPI.good(binary, httpHeaders).toResponseEntity();
        } catch (IOException e) {
            throw new DocumentNotFoundException("Document " + id + " not found");
        }
    }
