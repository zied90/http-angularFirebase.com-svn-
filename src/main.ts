  @Override
    public Page<LogDTO> findAllSummarized(Pageable pageable) {
        return logRepository.findAll(pageable);
    }

    @Override
    public Optional<LogDetailDTO> findDetailById(Long id) {
        return logRepository.findById(id);
    }

	@EntityGraph(attributePaths = {"logApplication", "logTemplate"})
	Page<Log> findAll(Pageable pageable);
