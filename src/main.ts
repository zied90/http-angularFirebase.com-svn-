package fr.axa.pfel.wspfelv3.storage.api;

import fr.axa.pfel.wspfelv3.storage.domain.IStorage;
import fr.axa.pfel.wspfelv3.storage.domain.StorageTmpInfo;
import java.io.File;
import java.io.IOException;
import java.util.List;

public interface StorageService {

    String saveDocumentInStorage(IStorage storage) throws IOException;

    byte[] getDocumentFromStorage(IStorage storage) throws IOException;

    List<File> retrieveUapFilesOnNas(List<String> ecmRefDoc);

    List<File> retrievBatchFilesInLot(StorageTmpInfo storageTmpInfo) throws IOException;

    void deleteTmpFile(StorageTmpInfo storage) throws IOException;

    void initDirectories();

    String writeFileToUapInputDirectory(String id, byte[] bytes) throws IOException;

    void deleteBatchLot(StorageTmpInfo storageTmpInfo) throws IOException;
}
