
  Scénario: L'appel au service de récupération des documents se fait correctement
    Et mon profil
      | demat |
      | false |
    Et les documents des dossiers suivants
      | actId | docId | index | esign | demat | contractNumber | clientNumber |
      | 1     | 11    | 1     | true  | false | 11111123456    | 22222211123  |
      | 2     | 22    | 2     | true  | false | 11111123456    | 22222211123  |
    Et 1 préimprimé
    Quand j'accède à Spoolnet
    Et je sélectionne le "dossier 1" du "tableau des dossiers"
    Et je sélectionne le "dossier 2" du "tableau des dossiers"
    Et je sélectionne "Signature électronique" dans "menu actions par lots"
    Alors le service "@actsDocuments" est appelé avec le body suivant :
      | pagination                                                     |
      | {"page": 0,"size": 25,"sortBy": "dateCreated","order": "DESC"} |
    Alors les dossiers n'ont pas été rechargés
