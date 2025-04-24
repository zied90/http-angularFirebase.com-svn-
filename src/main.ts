    public ExportDocumentResponse exportDocument(ExportDocument exportDocument)
        throws Exception {
        LOGGER.info("Start export with id request {}",
            exportDocument.getExportDocument().getIdRequest());

        fr.axa.pfel.wspfelv3.domain.document.ExportDocument exportDocumentDTO = exportDocumentMapper.toDto(
            exportDocument.getExportDocument());
        final var attachmentDomain = exportDocumentService.exportDocument(exportDocumentDTO);
        final var exportDocumentResponse = new ExportDocumentResponse();
        exportDocumentResponse.setAttachment(
            attachmentResponseMapper.attDomainToAttResponse(attachmentDomain));

        return exportDocumentResponse;


    }
  estce que cette fonction a chaque fois quon lappel elle retourne excption ?
