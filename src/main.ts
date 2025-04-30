--SuprTxSR2TuKVYdC3Z9mo88DCxJcZzEhcLF1WkkK
Content-Disposition: form-data; name="file"
Content-Type: application/octet-stream
Content-Length: 56194

GIF89a��3f���++3+f+�+�+�UU3UfU�U�U���3�f��������3�f��������3�fՙ������3�f������3333f3�3�3�3+3+33+f3+�3+�3+�3U3U33Uf3U�3U�3U�3�3�33�f3��3��3��3�3�33�f3��3��3��3�3�33�f3ՙ3��3��3�3�33�f3��3��3��ff3fff�f�f�f+f+3f+ff+�f+�f+�fUfU3fUffU�fU�fU�f�f�3f�ff��f��f��f�f�3f�ff��f��f��f�f�3f�ffՙf��f��f�f�3f�ff��f��f����3�f���̙��+�+3�+f�+��+̙+��U�U3�Uf�U��U̙U�����3��f�����̙������3��f�����̙������3��f�ՙ��̙������3��f�����̙����3�f�������+�+3�+f�+��+��+��U�U3�Uf�U��U��U�̀̀3̀f̀�̀�̀�̪̪3̪f̪�̪�̪�����3��f�ՙ����������3��f�����������3�f�������+�+3�+f�+��+��+��U�U3�Uf�U��U��U�����3��f�������������3��f�������������3��f�ՙ����������3��f���������!��,��H����*\Ȱ�Ç#J�H��ŋ3j�ȱ�Ǐ C�I��I�,�M�6MZ6i+[���&˚4g��)��4'�2 �(�F�"Uz4�ҦK�2�*��ӫQ�B�JUk׬`�Z
�U�ױfɢ-�v�۳p��MK��\�r��}��޻|��
�0�ÀV,��aƏK��2۴l/1_�l��Μ7�ٳf+�#;F�:�����m�v섶	��[)�ްu����l㵑�.��x��ϗ;�����دk��u���o��\�y���W��x��ᷗ�>��������?����љ4,�����t��	��K+�Uzgay��G\nr�a~��ap!�6�С������/��2�(b�7Ҙ��&�أ�?��C
Yb�;&��H.�d�P)%�T�X%�LNi�X>�e�Q^���dY�h^�f6k�Y�����ʘ_�)&�u��S{�IU���gU��ǧ�������J^��.
���>�(��Fj餍v������駤�Z訦Jzꪪ��)����Z鬚Қ魠��+����k���Zꮲ�k�ª�	2�YL����-���i����,��>w!��_�V�.��;��[
<ƂP���>H��V�C���7�ha�k�>�9���GZ�Ɩ���
>���}�,�Q�rgkZ�p�<��}�Z\Ag0�
��T��N�˥�Q�`�7�bEKi��c����W܊��ε.\)�W�l���m��3c󎤰5�zWtL׼�?���!;
--SuprTxSR2TuKVYdC3Z9mo88DCxJcZzEhcLF1WkkK
Content-Disposition: form-data; name="getDocumentContentResponse"
Content-Type: text/plain;charset=UTF-8
Content-Length: 71

{"status":"OK","name":"doc10","extension":"gif","mimeType":"image/gif"}
--SuprTxSR2TuKVYdC3Z9mo88DCxJcZzEhcLF1WkkK--


Name	Value
date	Wed, 30 Apr 2025 13:33:11 GMT
content-type	multipart/form-data;boundary=SuprTxSR2TuKVYdC3Z9mo88DCxJcZzEhcLF1WkkK
transfer-encoding	chunked
connection	keep-alive
expires	0
vary	Origin,Access-Control-Request-Method,Access-Control-Request-Headers
axa-client-id	51388898
x-frame-options	DENY
pragma	no-cache
strict-transport-security	max-age=31536000 ; includeSubDomains
x-content-type-options	nosniff
x-xss-protection	0
axa-correlation-id	79d64901-2668-17ab-1624-000009336ec8
cache-control	no-cache, no-store, max-age=0, must-revalidate




dit moi le swagger et la response 


et voic lap^pel curl --request POST \
  --url https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/document/binary/content \
  --header 'authorization: Bearer token test
  --data '{
"CommonParameters": {
"Locale": "fr-fr",
"EndUserId": "S875170",
  "ApplicationCaller": "SOLARIS_UAP"
},
"DocId": "{59DF1208-BF2C-422C-B7D1-D2D87BA5931D}"
}'
