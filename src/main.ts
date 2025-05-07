
LOGIN+B609EN@WIN-73NS0MRGEO4 MINGW64 ~/Downloads
$ curl -X POST https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/document/upload HTTP/1.1
Accept: application/json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imlrbml0RUVIMHNTa0c3SGF2WlVPN18tUmJPMF9SUzI1NiIsInBpLmF0bSI6IjRldG4ifQ.eyJzY29wZSI6InVybjpheGE6ZnJhbmNlOmdlZDpjc3QgdXJuOmF4YTpmcmFuY2U6Z2VkOm1uZyB1cm46YXhhOmZyYW5jZTpnZWQ6c3JjIiwiYXV0aG9yaXphdGlvbl9kZXRhaWxzIjpbXSwiY2xpZW50X2lkIjoiNTEzODg4OTgiLCJpc3MiOiJodHRwczovL29uZWxvZ2luLmRldi5heGEuY29tIiwianRpIjoiS0JSV3hncUZKYm1XMjV2MmZERWFiWUJ0U2RqUzFQRm8iLCJleHAiOjE3NDY2MzY3OTEsImlhdCI6MTc0NjYzMzE5MX0.FW2CA4QvxtPJ31qK5EJiaLLK_gMYEXDWuolp_-l66jYLlnNfMFJGKwZgAwifuGFawqWXffo5vMP45hj0oDPpe4gpzbOEhrlocDiJiIssS30pNCX3NpweCPf0dTUE6eauXGy-GwucSWOAQOyMlkkFc-lD9crhmzFGSn3u7o_2tFY-sqXBc-UJDMNCckJ5UXboe348cYAwLTAQocFHATxbWaOHPvmj-jI1qT-n4d282nPjfk2ww83GWDZcW2ZOgoglOWm_RDLfzTWNP6miKIjgGi614-2CKKxCGyfMlXGax5xHnZX29UJImbdnrVGrclrHOpaw7YUSxOMLhyrlGF5sQA
axa-correlation-id: 6d2726e5-b7a6-4d7c-9fec-edd89644ca7b
Content-Length: 1170
Content-Type: multipart/form-data

{"UploadRequest":{"CommonParameters":{"Locale":"fr-fr","EndUserId":"S836110","EndUserType":null,"ApplicationCaller":"SOLARIS_UAP","ObjectStore":null},"Interaction":"async","CallbackAddress":"","DocumentProperties":{"Url":"","Name":"COMMUN","Extension":"PDF","Properties":[{"Key":"ecm_DatePurge","Value":"2020-08-23T13:40:58+00:00"},{"Key":"ecm_Produit","Value":"Avizen Pro"},{"Key":"ecm_SensFlux","Value":"Sortant"},{"Key":"ecm_Societe","Value":"AXA France"},{"Key":"ecm_TopMedical","Value":"Oui"},{"Key":"ecm_Origine","Value":"Siège"},{"Key":"ecm_SAOrigine","Value":"Salesforce"},{"Key":"ecm_TopRH","Value":"Non"},{"Key":"ecm_TopVIP","Value":"Non"},{"Key":"ecm_Branche","Value":"Vie individuelle prévoyance"},{"Key":"ecm_CanalFrom","Value":"HPD"},{"Key":"ecm_NumContratFCA","Value":"326215"},{"Key":"ecm_TypeDocument","Value":"Réponse AXA"},{"Key":"ecm_NbPage","Value":"2"},{"Key":"ecm_TopBanque","Value":"Non"},{"Key":"ecm_TypeDemat","Value":"Editique"},{"Key":"ecm_ReseauDistrib","Value":"AGA"},{"Key":"ecm_SousBranche","Value":"Prévoyance"}]}},"Content":{"contentType":"application/pdf","fileName":"COMMUN","data":"JVBERi0xLjQKJeKApiAoY29udGVudSBQREYgaWNpKQ=="}}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   149  100   149    0     0    826      0 --:--:-- --:--:-- --:--:--   846{"Exception":"API Gateway encountered an error. Error Message: AIFMediator validation rejected [401/Null or empty jwt sent] Null or empty jwt sent."}
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0curl: (6) Could not resolve host: HTTP
bash: Accept:: command not found
bash: Authorization:: command not found
bash: axa-correlation-id:: command not found
bash: Content-Length:: command not found
bash: Content-Type:: command not found
bash: UploadRequest:CommonParameters:Locale:fr-fr: command not found

