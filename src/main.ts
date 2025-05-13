
  le client ma dit voci u_n exemple qui marche    mais moi jai ca est ce que  va ne marche pas  jazi ca {
  "Status": "KO",
  "Code": "INTERNAL_SERVER_ERROR",
  "Label": null,
  "Message": "Content of file Contrat_Client was not sent"
}  --header 'content-type: multipart/form-data' \
  --form 'UploadRequest={
    "Interaction": "sync",
    "CommonParameters": {
        "Locale": "fr-fr",
        "ApplicationCaller": "FRONTEADAPTALIA"
    },
    "DocumentProperties": {
        "Name": "Contrat_Client",
        "Extension": ".pdf",
        "Properties": [
            {
                "Key": "ecm_SensFlux",
                "Value": "Sortant"
            },
            {
                "Key": "ecm_NbPage",
                "Value": "2"
            },
            {
                "Key": "ecm_Extension",
                "Value": ".pdf"
            },
            {
                "Key": "ecm_SAOrigine",
                "Value": "EADAPTALIA"
            },
            {
                "Key": "ecm_Visibilite",
                "Value": "Client"
            },
            {
                "Key": "ecm_NomClient",
                "Value": "ORANGE"
            },
            {
                "Key": "ecm_PrenomClient",
                "Value": ""
            },
            {
                "Key": "ecm_NumContratAutre",
                "Value": "2524756612000"
            },
            {
                "Key": "ecm_NumDemande",
                "Value": "246b87f3-9599-4746-b52c-494577b9a5e2"
            },
            {
                "Key": "ecm_CanalFrom",
                "Value": "EADAPTALIA"
            },
            {
                "Key": "ecm_CanalTo",
                "Value": "EADAPTALIA"
            },
            {
                "Key": "ecm_NomDoc",
                "Value": "Document d'\''information sur le produit d'\''assurance"
            },
            {
                "Key": "ecm_Societe",
                "Value": "AXA France"
            },
            {
                "Key": "ecm_Branche",
                "Value": "Vie collective santé"
            },
            {
                "Key": "ecm_SousBranche",
                "Value": "Métropolitain"
            },
            {
                "Key": "ecm_Produit",
                "Value": "1486_Bureaux d'\''études techniques, cabinets d'\''ingénieurs-cons"
            },
            {
                "Key": "ecm_CodePtf",
                "Value": "0062040344"
            },
            {
                "Key": "ecm_ReseauDistrib",
                "Value": "AGA"
            },
            {
                "Key": "ecm_Motif",
                "Value": "Socle"
            },
            {
                "Key": "ecm_TypeCourrier",
                "Value": "Courrier"
            },
            {
                "Key": "ecm_TypeDemat",
                "Value": "Editique"
            },
            {
                "Key": "ecm_Origine",
                "Value": "Siege"
            },
            {
                "Key": "ecm_IdPublic",
                "Value": "38012986608447"
            },
            {
                "Key": "ecm_NumContratFCA",
                "Value": "2524756612000P19"
            },
            {
                "Key": "ecm_StatutSignature",
                "Value": "Non signé"
            },
            {
                "Key": "ecm_Statut",
                "Value": "Archive"
            },
            {
                "Key": "ecm_TopMedical",
                "Value": "Non"
            },
            {
                "Key": "ecm_TopBanque",
                "Value": "Non"
            },
            {
                "Key": "ecm_TopVIP",
                "Value": "Non"
            },
            {
                "Key": "ecm_TopRH",
                "Value": "Non"
            },
            {
                "Key": "ecm_TopBrouillon",
                "Value": "Non"
            },
            {
                "Key": "ecm_TypeDocument",
                "Value": "DIPA"
            },
            {
                "Key": "spe_CodeService",
                "Value": ""
            },
            {
                "Key": "ecm_DateRcptHorsGed",
                "Value": "2025-05-07T11:52:16"
            },
            {
                "Key": "ecm_DatePurge",
                "Value": "2028-05-07T11:52:16"
            },
            {
                "Key": "ecm_DateEffetDebut",
                "Value": "2025-03-01T12:00:00"
            }
        ]
    }
}' \
  --form 'Content=@C:\Users\B609EN\Downloads\Contrat_Client.pdf'


et voici exemple qu il ma fournier qui marche -----------A5EF6555-E859-4DB2-B33B-F3A92BF3E156
Content-Type: application/json; charset=utf-8
Content-Disposition: form-data; name=UploadRequest

{"Interaction":"sync","CommonParameters":{"Locale":"fr-fr","ApplicationCaller":"FRONTEADAPTALIA"},"DocumentProperties":{"Name":"Document d'information sur le produit d'assurance","Extension":".pdf","Properties":[{"Key":"ecm_SensFlux","Value":"Sortant"},{"Key":"ecm_NbPage","Value":"2"},{"Key":"ecm_Extension","Value":".pdf"},{"Key":"ecm_SAOrigine","Value":"EADAPTALIA"},{"Key":"ecm_Visibilite","Value":"Client"},{"Key":"ecm_NomClient","Value":"ORANGE"},{"Key":"ecm_PrenomClient","Value":""},{"Key":"ecm_NumContratAutre","Value":"2524756612000"},{"Key":"ecm_NumDemande","Value":"246b87f3-9599-4746-b52c-494577b9a5e2"},{"Key":"ecm_CanalFrom","Value":"EADAPTALIA"},{"Key":"ecm_CanalTo","Value":"EADAPTALIA"},{"Key":"ecm_NomDoc","Value":"Document d'information sur le produit d'assurance"},{"Key":"ecm_Societe","Value":"AXA France"},{"Key":"ecm_Branche","Value":"Vie collective santé"},{"Key":"ecm_SousBranche","Value":"Métropolitain"},{"Key":"ecm_Produit","Value":"1486_Bureaux d'études techniques, cabinets d'ingénieurs-cons"},{"Key":"ecm_CodePtf","Value":"0062040344"},{"Key":"ecm_ReseauDistrib","Value":"AGA"},{"Key":"ecm_Motif","Value":"Socle"},{"Key":"ecm_TypeCourrier","Value":"Courrier"},{"Key":"ecm_TypeDemat","Value":"Editique"},{"Key":"ecm_Origine","Value":"Siege"},{"Key":"ecm_IdPublic","Value":"38012986608447"},{"Key":"ecm_NumContratFCA","Value":"2524756612000P19"},{"Key":"ecm_StatutSignature","Value":"Non signé"},{"Key":"ecm_Statut","Value":"Archive"},{"Key":"ecm_TopMedical","Value":"Non"},{"Key":"ecm_TopBanque","Value":"Non"},{"Key":"ecm_TopVIP","Value":"Non"},{"Key":"ecm_TopRH","Value":"Non"},{"Key":"ecm_TopBrouillon","Value":"Non"},{"Key":"ecm_TypeDocument","Value":"DIPA"},{"Key":"spe_CodeService","Value":""},{"Key":"ecm_DateRcptHorsGed","Value":"2025-05-07T11:52:16"},{"Key":"ecm_DatePurge","Value":"2028-05-07T11:52:16"},{"Key":"ecm_DateEffetDebut","Value":"2025-03-01T12:00:00"}]}}
-----------A5EF6555-E859-4DB2-B33B-F3A92BF3E156
Content-Type: application/pdf
Content-Disposition: form-data; name=Content; filename="Document d'information sur le produit d'assurance"; filename*=utf-8''Document%20d%27information%20sur%20le%20produit%20d%27assurance
