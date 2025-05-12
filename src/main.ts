class DocumentBinaryContentPost200Response {
    getDocumentContentResponse: class GetDocumentContentResponse {
        status: OK
        name: doc10
        extension: gif
        mimeType: image/gif
    }
    file: FormData(contentType=null, fileName=null, data=null)
} pk  alors que que voci il ya  le file 


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
}  et voic response avec postman :---OjNmoVvJSCVdyjOHKJc_RlTdocfTwf_zvxhG
Content-Disposition: form-data; name="file"
Content-Type: application/octet-stream
Content-Length: 56194

GIF89a��3f���++3+f+�+�+�UU3UfU�U�U���3�f��������3�f��������3�fՙ������3�f������3333f3�3�3�3+3+33+f3+�3+�3+�3U3U33Uf3U�3U�3U�3�3�33�f3��3��3��3�3�33�f3��3��3��3�3�33�f3ՙ3��3��3�3�33�f3��3��3��ff3fff�f�f�f+f+3f+ff+�f+�f+�fUfU3fUffU�fU�fU�f�f�3f�ff��f��f��f�f�3f�ff��f��f��f�f�3f�ffՙf��f��f�f�3f�ff��f��f����3�f���̙��+�+3�+f�+��+̙+��U�U3�Uf�U��U̙U�����3��f�����̙������3��f�����̙������3��f�ՙ��̙������3��f�����̙����3�f�������+�+3�+f�+��+��+��U�U3�Uf�U��U��U�̀̀3̀f̀�̀�̀�̪̪3̪f̪�̪�̪�����3��f�ՙ����������3��f�����������3�f�������+�+3�+f�+��+��+��U�U3�Uf�U��U��U�����3��f�������������3��f�������������3��f�ՙ����������3��f���������!��,��H����*\Ȱ�Ç#J�H��ŋ3j�ȱ�Ǐ C�I��I�,�M�6MZ6i+[���&˚4g��)��4'�2 �(�F�"Uz4�ҦK�2�*��ӫQ�B�JUk׬`�Z
�U�ױfɢ-�v�۳p��MK��\�r��}��޻|��
�0�ÀV,��aƏK��2۴l/1_�l��Μ7�ٳf+�#;F�:�����m�v섶	��[)�ްu����l㵑�.��x��ϗ;�����دk��u���o��\�y���W��x��ᷗ
>���}�,�Q�rgkZ�p�<��}�Z\Ag0�
��T��N�˥�Q�`�7�bEKi��c����W܊��ε.\)�W�l���m��3c󎤰5�zWtL׼�?���!;
---OjNmoVvJSCVdyjOHKJc_RlTdocfTwf_zvxhG
Content-Disposition: form-data; name="getDocumentContentResponse"
Content-Type: text/plain;charset=UTF-8
Content-Length: 71

{"status":"OK","name":"doc10","extension":"gif","mimeType":"image/gif"}
---OjNmoVvJSCVdyjOHKJc_RlTdocfTwf_zvxhG--
