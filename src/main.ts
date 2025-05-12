package fr.axa.pfel.wspfelv3.ged.impl.configuration;

import com.fasterxml.jackson.databind.MapperFeature;
import feign.Response;

import feign.codec.Decoder;

import feign.FeignException;

import fr.axa.pfel.client.model.DocumentBinaryContentPost200Response;
import fr.axa.pfel.client.model.GetDocumentContentResponse;
import org.apache.commons.fileupload.MultipartStream;

import org.apache.commons.fileupload.util.Streams;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.*;

import java.lang.reflect.Type;

import java.nio.charset.StandardCharsets;

import java.util.Collection;
import java.util.Set;
public class MultipartResponseDecoder implements Decoder {
    private final Decoder defaultDecoder;
    private final ObjectMapper objectMapper;
    public MultipartResponseDecoder(Decoder defaultDecoder) {
        this.defaultDecoder = defaultDecoder;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.configure(MapperFeature.ACCEPT_CASE_INSENSITIVE_PROPERTIES, true);
    }
    @Override
    public Object decode(Response response, Type type) throws IOException, FeignException {
        String contentType = response.headers().getOrDefault("Content-Type", Set.of())
                .stream().findFirst().orElse("");
        if (!contentType.contains("multipart/form-data")) {
            return defaultDecoder.decode(response, type);
        }
        String boundary = extractBoundary(contentType);
        if (boundary == null) {
            throw new IOException("Impossible de trouver la boundary dans Content-Type");
        }
        InputStream input = response.body().asInputStream();
        MultipartStream multipartStream = new MultipartStream(input, boundary.getBytes(StandardCharsets.UTF_8), 4096, null);
        boolean nextPart = multipartStream.skipPreamble();
        ByteArrayOutputStream fileContent = null;
        String jsonPart = null;
        while (nextPart) {
            String headers = multipartStream.readHeaders();
            if (headers.contains("name=\"file\"")) {
                fileContent = new ByteArrayOutputStream();
                multipartStream.readBodyData(fileContent);
            } else if (headers.contains("name=\"getDocumentContentResponse\"")) {
                ByteArrayOutputStream baos = new ByteArrayOutputStream();
                multipartStream.readBodyData(baos);
                jsonPart = baos.toString(StandardCharsets.UTF_8);
            }
            nextPart = multipartStream.readBoundary();
        }
        DocumentBinaryContentPost200Response result = new DocumentBinaryContentPost200Response();
        if (jsonPart != null) {
            GetDocumentContentResponse contentResponse = objectMapper.readValue(jsonPart, GetDocumentContentResponse.class);
            result.setGetDocumentContentResponse(contentResponse);
        }
        if (fileContent != null) {
            feign.form.FormData file = new feign.form.FormData();
            file.setData(fileContent.toByteArray());
            file.setFileName("document"); // ou récupéré dynamiquement depuis les headers
            file.setContentType("application/octet-stream"); // ou extraire des headers aussi
            result.setFile(file);
        }
        return result;
    }
    private String extractBoundary(String contentType) {
        for (String param : contentType.split(";")) {
            String trimmed = param.trim();
            if (trimmed.startsWith("boundary=")) {
                return trimmed.substring("boundary=".length());
            }
        }
        return null;
    }
} 


 file.setFileName("document"); // ou récupéré dynamiquement depuis les headers
            file.setContentType("application/octet-stream"); // ou extraire des headers aussi pk onrecupere pas ce qui deja envoyer 
