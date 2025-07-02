  Scénario: L'appel au service de récupération des documents se fait correctement
    Et mon profil
      | demat |
      | false |
    Et les documents des dossiers suivants
      | actId | docId | index | esign | demat | contractNumber | clientNumber |
      | 1     | 11    | 1     | true  | false | 11111123456    | 22222211123  |
      | 1     | 22    | 2     | true  | false | 11111123456    | 22222211123  |
    Et 1 préimprimé
    Quand j'accède à Spoolnet
    Et je sélectionne le "dossier 1" du "tableau des dossiers"
    Et je sélectionne le "dossier 2" du "tableau des dossiers"
    Et je sélectionne "Signature électronique" dans "menu actions par lots"
    Alors le service "@actsDocuments" est appelé avec le body suivant :
      | pagination                                                     |
      | {"page": 0,"size": 25,"sortBy": "dateCreated","order": "DESC"} |
    Alors les dossiers ont été rechargés
  avec ca    docs = docsFromActs; me retourna taiile 1 array 

[
    {
        "id": "interceptedRequest11168",
        "browserRequestId": "14820.11960",
        "routeId": "1751450240207-2199",
        "request": {
            "headers": {
                "host": "localhost:3000",
                "proxy-connection": "keep-alive",
                "content-length": "391",
                "sec-ch-ua-platform": "\"Windows\"",
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFUMjAxODA0MjMifQ.eyJhdWQiOiJodHRwczovL21hYW0tZGV2LmF4YS5jb20vbWFhbS92MiIsInN1YiI6IlMxMjM0NTYiLCJhY3IiOiIxIiwicmxtIjoiV0FDX1JlY2V0dGVfaW50cmFuZXQiLCJjZWkiOiJlOGNiNGJmZiIsInNjb3BlIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUgdXJuOmF4YTpmcmFuY2U6ZGlzdHJpYnV0aW9uIHVybjpheGE6ZnJhbmNlOnRwYWcgdXJuOmF4YTpmcmFuY2U6d2FjIiwiaXNzIjoiaHR0cHM6Ly9tYWFtLWRldi5heGEuY29tL21hYW0vdjIiLCJleHAiOjIxMTU4NjM5MzgsImlhdCI6MTcxNTg2MDMzOCwianRpIjoiZjcwMDJlZDUtNWM3OS00YjBiLTk4ZGQtMzdkYTUwMzkzY2UwIiwiY2xpZW50X2lkIjoiOWZlOGIyMDMifQ.Te7UEM7Fd407fdZEDWC03cGZDaK811T-79edJwsWdjXwB9mDajW5z7TPGTy91mXUarCbbaLXM9BFyCACDbXiUdoxToc0nNtCtwEu6HgPDdZhMxtWEiRi_BUz1CCmq8bUTic_ufNJHj9vAqbe4d1Ws7g8kUBS33kOmpYmy7B7AKSXYErxOiG3or9QkZ9JTV2GBifaNXIAn5ycv_NNpgDsgu9-sbWMPgBoVCXxSxRWAQ_wngAjEwztgNMITtdlN98nqKoSPdWAbvwO_tBAIPSySvBKmtV-AynZUnpCcLZTypjzV7VeRWiXW2edmqUgHp0yAmXB6NWIPEBnqRpxBrDKVQ",
                "accept-language": "fr-FR,fr;q=0.9",
                "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
                "sec-ch-ua-mobile": "?0",
                "access-control-allow-origin": "*",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "origin": "http://localhost:3000",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                "referer": "http://localhost:3000/?filters=u6mkvtTaaK2nwryqioq0toisZ3ylVomDoIaFfZWdjauYqFarZmdflXOjb2id",
                "accept-encoding": "gzip, deflate, br, zstd"
            },
            "url": "http://localhost:3000/cy-api/acts",
            "method": "POST",
            "httpVersion": "1.1",
            "resourceType": "xhr",
            "query": {},
            "body": {
                "actId": 0,
                "actOpened": "",
                "actsIds": [],
                "app": 0,
                "clientName": "",
                "clientNumber": "",
                "contractNumber": "",
                "deleted": null,
                "endDate": "",
                "evolFilter": null,
                "inProgress": true,
                "notTreated": true,
                "population": null,
                "portfolios": [
                    "76046044",
                    "7622101",
                    "76032044"
                ],
                "printed": null,
                "sent": null,
                "signed": null,
                "startDate": "",
                "treated": null,
                "pagination": {
                    "page": 0,
                    "size": 25,
                    "sortBy": "dateCreated",
                    "order": "DESC"
                }
            },
            "responseTimeout": 30000
        },
        "state": "Complete",
        "requestWaited": false,
        "responseWaited": false,
        "subscriptions": [],
        "response": {
            "headers": {
                "content-type": "application/json",
                "access-control-allow-origin": "http://localhost:3000",
                "access-control-allow-credentials": "true"
            },
            "body": {
                "success": true,
                "response": {
                    "data": [
                        {
                            "id": 402551,
                            "label": "Avizen",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "esignFlag": true,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:02:03",
                            "client": {
                                "id": null,
                                "name": "RABILLER"
                            }
                        },
                        {
                            "id": 402532,
                            "label": "Habitation",
                            "family": "Avenant",
                            "contract": 6140567904,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T08:57:46",
                            "client": {
                                "id": 1339415604,
                                "name": "VALLAT CARINE"
                            },
                            "esignFlag": true
                        },
                        {
                            "id": 402533,
                            "label": "Assurance",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "esignFlag": true,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:05:01",
                            "client": {
                                "id": 1339415605,
                                "name": "DUPONT PIERRE"
                            }
                        },
                        {
                            "id": 402534,
                            "label": "Vie",
                            "family": "Avenant",
                            "contract": 6140567905,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:10:15",
                            "client": {
                                "id": 1339415606,
                                "name": "LEFEBVRE MARIE"
                            }
                        },
                        {
                            "id": 402535,
                            "label": "Santé",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:15:30",
                            "client": {
                                "id": 1339415607,
                                "name": "MARTIN JACQUES"
                            }
                        },
                        {
                            "id": 402536,
                            "label": "Retraite",
                            "family": "Avenant",
                            "contract": 6140567906,
                            "deleted": false,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:20:45",
                            "client": {
                                "id": 1339415608,
                                "name": "GARCIA JUAN"
                            }
                        },
                        {
                            "id": 402537,
                            "label": "Habitation",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:25:00",
                            "client": {
                                "id": 1339415609,
                                "name": "ROUSSEAU FRANÇOISE"
                            }
                        },
                        {
                            "id": 402538,
                            "label": "Vie",
                            "family": "Avenant",
                            "contract": 6140567907,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:30:15",
                            "client": {
                                "id": 1339415610,
                                "name": "DURAND PIERRE"
                            }
                        },
                        {
                            "id": 402539,
                            "label": "Santé",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:35:30",
                            "client": {
                                "id": 1339415611,
                                "name": "LEFEBVRE MARIE"
                            }
                        },
                        {
                            "id": 402540,
                            "label": "Retraite",
                            "family": "Avenant",
                            "contract": 6140567908,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:40:45",
                            "client": {
                                "id": 1339415612,
                                "name": "MARTIN JACQUES"
                            }
                        },
                        {
                            "id": 402541,
                            "label": "Habitation",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:45:00",
                            "client": {
                                "id": 1339415613,
                                "name": "GARCIA JUAN"
                            }
                        }
                    ],
                    "totalPages": 15,
                    "size": 10,
                    "totalElements": 300,
                    "isLast": true,
                    "currentPage": 0
                }
            },
            "url": "http://localhost:3000/cy-api/acts",
            "method": null,
            "httpVersion": null,
            "statusCode": 200,
            "statusMessage": null
        }
    }
]
et avec ca me retour taille 2 taboleau pk
    docs = getDocsEsign(docsFromActs);
export const getDocsEsign = (docs: IDocument[]) => docs.filter((doc: IDocument) => doc.documentOptions.esign);

[
    {
        "id": "interceptedRequest12234",
        "browserRequestId": "14820.13085",
        "routeId": "1751450666007-2352",
        "request": {
            "headers": {
                "host": "localhost:3000",
                "proxy-connection": "keep-alive",
                "content-length": "391",
                "sec-ch-ua-platform": "\"Windows\"",
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFUMjAxODA0MjMifQ.eyJhdWQiOiJodHRwczovL21hYW0tZGV2LmF4YS5jb20vbWFhbS92MiIsInN1YiI6IlMxMjM0NTYiLCJhY3IiOiIxIiwicmxtIjoiV0FDX1JlY2V0dGVfaW50cmFuZXQiLCJjZWkiOiJlOGNiNGJmZiIsInNjb3BlIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUgdXJuOmF4YTpmcmFuY2U6ZGlzdHJpYnV0aW9uIHVybjpheGE6ZnJhbmNlOnRwYWcgdXJuOmF4YTpmcmFuY2U6d2FjIiwiaXNzIjoiaHR0cHM6Ly9tYWFtLWRldi5heGEuY29tL21hYW0vdjIiLCJleHAiOjIxMTU4NjM5MzgsImlhdCI6MTcxNTg2MDMzOCwianRpIjoiZjcwMDJlZDUtNWM3OS00YjBiLTk4ZGQtMzdkYTUwMzkzY2UwIiwiY2xpZW50X2lkIjoiOWZlOGIyMDMifQ.Te7UEM7Fd407fdZEDWC03cGZDaK811T-79edJwsWdjXwB9mDajW5z7TPGTy91mXUarCbbaLXM9BFyCACDbXiUdoxToc0nNtCtwEu6HgPDdZhMxtWEiRi_BUz1CCmq8bUTic_ufNJHj9vAqbe4d1Ws7g8kUBS33kOmpYmy7B7AKSXYErxOiG3or9QkZ9JTV2GBifaNXIAn5ycv_NNpgDsgu9-sbWMPgBoVCXxSxRWAQ_wngAjEwztgNMITtdlN98nqKoSPdWAbvwO_tBAIPSySvBKmtV-AynZUnpCcLZTypjzV7VeRWiXW2edmqUgHp0yAmXB6NWIPEBnqRpxBrDKVQ",
                "accept-language": "fr-FR,fr;q=0.9",
                "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
                "sec-ch-ua-mobile": "?0",
                "access-control-allow-origin": "*",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "origin": "http://localhost:3000",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                "referer": "http://localhost:3000/?filters=u6mkvtTaaK2nwryqioq0toisZ3ylVomDoIaFfZWdjauYqFarZmdflXOjb2id",
                "accept-encoding": "gzip, deflate, br, zstd"
            },
            "url": "http://localhost:3000/cy-api/acts",
            "method": "POST",
            "httpVersion": "1.1",
            "resourceType": "xhr",
            "query": {},
            "body": {
                "actId": 0,
                "actOpened": "",
                "actsIds": [],
                "app": 0,
                "clientName": "",
                "clientNumber": "",
                "contractNumber": "",
                "deleted": null,
                "endDate": "",
                "evolFilter": null,
                "inProgress": true,
                "notTreated": true,
                "population": null,
                "portfolios": [
                    "76046044",
                    "7622101",
                    "76032044"
                ],
                "printed": null,
                "sent": null,
                "signed": null,
                "startDate": "",
                "treated": null,
                "pagination": {
                    "page": 0,
                    "size": 25,
                    "sortBy": "dateCreated",
                    "order": "DESC"
                }
            },
            "responseTimeout": 30000
        },
        "state": "Complete",
        "requestWaited": false,
        "responseWaited": false,
        "subscriptions": [],
        "response": {
            "headers": {
                "content-type": "application/json",
                "access-control-allow-origin": "http://localhost:3000",
                "access-control-allow-credentials": "true"
            },
            "body": {
                "success": true,
                "response": {
                    "data": [
                        {
                            "id": 402551,
                            "label": "Avizen",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "esignFlag": true,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:02:03",
                            "client": {
                                "id": null,
                                "name": "RABILLER"
                            }
                        },
                        {
                            "id": 402532,
                            "label": "Habitation",
                            "family": "Avenant",
                            "contract": 6140567904,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T08:57:46",
                            "client": {
                                "id": 1339415604,
                                "name": "VALLAT CARINE"
                            },
                            "esignFlag": true
                        },
                        {
                            "id": 402533,
                            "label": "Assurance",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "esignFlag": true,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:05:01",
                            "client": {
                                "id": 1339415605,
                                "name": "DUPONT PIERRE"
                            }
                        },
                        {
                            "id": 402534,
                            "label": "Vie",
                            "family": "Avenant",
                            "contract": 6140567905,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:10:15",
                            "client": {
                                "id": 1339415606,
                                "name": "LEFEBVRE MARIE"
                            }
                        },
                        {
                            "id": 402535,
                            "label": "Santé",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:15:30",
                            "client": {
                                "id": 1339415607,
                                "name": "MARTIN JACQUES"
                            }
                        },
                        {
                            "id": 402536,
                            "label": "Retraite",
                            "family": "Avenant",
                            "contract": 6140567906,
                            "deleted": false,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:20:45",
                            "client": {
                                "id": 1339415608,
                                "name": "GARCIA JUAN"
                            }
                        },
                        {
                            "id": 402537,
                            "label": "Habitation",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:25:00",
                            "client": {
                                "id": 1339415609,
                                "name": "ROUSSEAU FRANÇOISE"
                            }
                        },
                        {
                            "id": 402538,
                            "label": "Vie",
                            "family": "Avenant",
                            "contract": 6140567907,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:30:15",
                            "client": {
                                "id": 1339415610,
                                "name": "DURAND PIERRE"
                            }
                        },
                        {
                            "id": 402539,
                            "label": "Santé",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:35:30",
                            "client": {
                                "id": 1339415611,
                                "name": "LEFEBVRE MARIE"
                            }
                        },
                        {
                            "id": 402540,
                            "label": "Retraite",
                            "family": "Avenant",
                            "contract": 6140567908,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:40:45",
                            "client": {
                                "id": 1339415612,
                                "name": "MARTIN JACQUES"
                            }
                        },
                        {
                            "id": 402541,
                            "label": "Habitation",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:45:00",
                            "client": {
                                "id": 1339415613,
                                "name": "GARCIA JUAN"
                            }
                        }
                    ],
                    "totalPages": 15,
                    "size": 10,
                    "totalElements": 300,
                    "isLast": true,
                    "currentPage": 0
                }
            },
            "url": "http://localhost:3000/cy-api/acts",
            "method": null,
            "httpVersion": null,
            "statusCode": 200,
            "statusMessage": null
        }
    },
    {
        "id": "interceptedRequest12285",
        "browserRequestId": "14820.13096",
        "routeId": "1751450666007-2352",
        "request": {
            "headers": {
                "host": "localhost:3000",
                "proxy-connection": "keep-alive",
                "content-length": "391",
                "sec-ch-ua-platform": "\"Windows\"",
                "authorization": "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFUMjAxODA0MjMifQ.eyJhdWQiOiJodHRwczovL21hYW0tZGV2LmF4YS5jb20vbWFhbS92MiIsInN1YiI6IlMxMjM0NTYiLCJhY3IiOiIxIiwicmxtIjoiV0FDX1JlY2V0dGVfaW50cmFuZXQiLCJjZWkiOiJlOGNiNGJmZiIsInNjb3BlIjoiZW1haWwgb3BlbmlkIHByb2ZpbGUgdXJuOmF4YTpmcmFuY2U6ZGlzdHJpYnV0aW9uIHVybjpheGE6ZnJhbmNlOnRwYWcgdXJuOmF4YTpmcmFuY2U6d2FjIiwiaXNzIjoiaHR0cHM6Ly9tYWFtLWRldi5heGEuY29tL21hYW0vdjIiLCJleHAiOjIxMTU4NjM5MzgsImlhdCI6MTcxNTg2MDMzOCwianRpIjoiZjcwMDJlZDUtNWM3OS00YjBiLTk4ZGQtMzdkYTUwMzkzY2UwIiwiY2xpZW50X2lkIjoiOWZlOGIyMDMifQ.Te7UEM7Fd407fdZEDWC03cGZDaK811T-79edJwsWdjXwB9mDajW5z7TPGTy91mXUarCbbaLXM9BFyCACDbXiUdoxToc0nNtCtwEu6HgPDdZhMxtWEiRi_BUz1CCmq8bUTic_ufNJHj9vAqbe4d1Ws7g8kUBS33kOmpYmy7B7AKSXYErxOiG3or9QkZ9JTV2GBifaNXIAn5ycv_NNpgDsgu9-sbWMPgBoVCXxSxRWAQ_wngAjEwztgNMITtdlN98nqKoSPdWAbvwO_tBAIPSySvBKmtV-AynZUnpCcLZTypjzV7VeRWiXW2edmqUgHp0yAmXB6NWIPEBnqRpxBrDKVQ",
                "accept-language": "fr-FR,fr;q=0.9",
                "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
                "sec-ch-ua-mobile": "?0",
                "access-control-allow-origin": "*",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
                "accept": "application/json, text/plain, */*",
                "content-type": "application/json;charset=UTF-8",
                "origin": "http://localhost:3000",
                "sec-fetch-site": "same-origin",
                "sec-fetch-mode": "cors",
                "sec-fetch-dest": "empty",
                "referer": "http://localhost:3000/?filters=u6mkvtTaaK2nwryqioq0toisZ3ylVomDoIaFfZWdjauYqFarZmdflXOjb2id",
                "accept-encoding": "gzip, deflate, br, zstd"
            },
            "url": "http://localhost:3000/cy-api/acts",
            "method": "POST",
            "httpVersion": "1.1",
            "resourceType": "xhr",
            "query": {},
            "body": {
                "actId": 0,
                "actOpened": "",
                "actsIds": [],
                "app": 0,
                "clientName": "",
                "clientNumber": "",
                "contractNumber": "",
                "deleted": null,
                "endDate": "",
                "evolFilter": null,
                "inProgress": true,
                "notTreated": true,
                "population": null,
                "portfolios": [
                    "76046044",
                    "7622101",
                    "76032044"
                ],
                "printed": null,
                "sent": null,
                "signed": null,
                "startDate": "",
                "treated": null,
                "pagination": {
                    "page": 0,
                    "size": 25,
                    "sortBy": "dateCreated",
                    "order": "DESC"
                }
            },
            "responseTimeout": 30000
        },
        "state": "Complete",
        "requestWaited": false,
        "responseWaited": false,
        "subscriptions": [],
        "response": {
            "headers": {
                "content-type": "application/json",
                "access-control-allow-origin": "http://localhost:3000",
                "access-control-allow-credentials": "true"
            },
            "body": {
                "success": true,
                "response": {
                    "data": [
                        {
                            "id": 402551,
                            "label": "Avizen",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "esignFlag": true,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:02:03",
                            "client": {
                                "id": null,
                                "name": "RABILLER"
                            }
                        },
                        {
                            "id": 402532,
                            "label": "Habitation",
                            "family": "Avenant",
                            "contract": 6140567904,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T08:57:46",
                            "client": {
                                "id": 1339415604,
                                "name": "VALLAT CARINE"
                            },
                            "esignFlag": true
                        },
                        {
                            "id": 402533,
                            "label": "Assurance",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "esignFlag": true,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:05:01",
                            "client": {
                                "id": 1339415605,
                                "name": "DUPONT PIERRE"
                            }
                        },
                        {
                            "id": 402534,
                            "label": "Vie",
                            "family": "Avenant",
                            "contract": 6140567905,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:10:15",
                            "client": {
                                "id": 1339415606,
                                "name": "LEFEBVRE MARIE"
                            }
                        },
                        {
                            "id": 402535,
                            "label": "Santé",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:15:30",
                            "client": {
                                "id": 1339415607,
                                "name": "MARTIN JACQUES"
                            }
                        },
                        {
                            "id": 402536,
                            "label": "Retraite",
                            "family": "Avenant",
                            "contract": 6140567906,
                            "deleted": false,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:20:45",
                            "client": {
                                "id": 1339415608,
                                "name": "GARCIA JUAN"
                            }
                        },
                        {
                            "id": 402537,
                            "label": "Habitation",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:25:00",
                            "client": {
                                "id": 1339415609,
                                "name": "ROUSSEAU FRANÇOISE"
                            }
                        },
                        {
                            "id": 402538,
                            "label": "Vie",
                            "family": "Avenant",
                            "contract": 6140567907,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:30:15",
                            "client": {
                                "id": 1339415610,
                                "name": "DURAND PIERRE"
                            }
                        },
                        {
                            "id": 402539,
                            "label": "Santé",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 2,
                                "label": "En cours"
                            },
                            "dateCreation": "2023-03-08T09:35:30",
                            "client": {
                                "id": 1339415611,
                                "name": "LEFEBVRE MARIE"
                            }
                        },
                        {
                            "id": 402540,
                            "label": "Retraite",
                            "family": "Avenant",
                            "contract": 6140567908,
                            "deleted": false,
                            "state": {
                                "id": 1,
                                "label": "Non traité"
                            },
                            "dateCreation": "2023-03-08T09:40:45",
                            "client": {
                                "id": 1339415612,
                                "name": "MARTIN JACQUES"
                            }
                        },
                        {
                            "id": 402541,
                            "label": "Habitation",
                            "family": "Adhésion",
                            "contract": 0,
                            "deleted": false,
                            "state": {
                                "id": 3,
                                "label": "Traité"
                            },
                            "dateCreation": "2023-03-08T09:45:00",
                            "client": {
                                "id": 1339415613,
                                "name": "GARCIA JUAN"
                            }
                        }
                    ],
                    "totalPages": 15,
                    "size": 10,
                    "totalElements": 300,
                    "isLast": true,
                    "currentPage": 0
                }
            },
            "url": "http://localhost:3000/cy-api/acts",
            "method": null,
            "httpVersion": null,
            "statusCode": 200,
            "statusMessage": null
        }
    }
]
