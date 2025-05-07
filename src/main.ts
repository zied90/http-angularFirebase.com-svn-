curl --request POST \
  --url https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/document/upload \
  --header 'authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Imlrbml0RUVIMHNTa0c3SGF2WlVPN18tUmJPMF9SUzI1NiIsInBpLmF0bSI6IjRldG4ifQ.eyJzY29wZSI6InVybjpheGE6ZnJhbmNlOmdlZDpjc3QgdXJuOmF4YTpmcmFuY2U6Z2VkOnNyYyB1cm46YXhhOmZyYW5jZTpnZWQ6bW5nIiwiYXV0aG9yaXphdGlvbl9kZXRhaWxzIjpbXSwiY2xpZW50X2lkIjoiNTEzODg4OTgiLCJpc3MiOiJodHRwczovL29uZWxvZ2luLmRldi5heGEuY29tIiwianRpIjoiNlg3WXNUb0RhTGJrblk3SjI0OGNPU0wwQVhJNXBmZ0EiLCJleHAiOjE3NDY2MjgzNjIsImlhdCI6MTc0NjYyNDc2Mn0.WBqAiegIzez5crOIrSb6ViutunydNhTI8ubgmtWkwTzcm48sHAm4xY_ubt7ujNoNiIJvkkVvusdBEFk6ONRc6P7-An0HwC-dI42TnwzFGN2XaKU4pszQ3KbmUoewRyo1sy93prUpA1A2uVZ7KQJg7Lr_9UbXQivp-ijl56Gb8n_peA4ONd2MR5Tlj2EM428nTg_aNsGMTU2SeLSQw64LVP6YHVFVcd5Hji8Yf-HpSirA2K3LeVZd2r1S2yESjtNtSTjbvW7o0_Dt1po8Asj0ZCflulELBTiMFjZsmXhHVHptSTcq87IO8BlVOsQoz4714Zd424rSnThdJlk8Mb1gJA' \
  --header 'content-type: multipart/form-data' \
  --form 'UploadRequest={
    "Interaction": "sync",
    "CommonParameters": {
        "Locale": "fr-fr",
        "ApplicationCaller": "FRONTEADAPTALIA",
		"EndUserId": "S875170"
    },
    "DocumentProperties": {
        "Name": "doc",
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
  --form 'Content=@C:\Users\B609EN\Downloads\doc.pdf'
