Créé par JOLY Michael, dernière modification le 18. avr. 2025
GED SAM* v2 - Un peu d'histoire...

Un peu d'histoire :

GEDv1 / GEDv2 / GEDv3 / GEDv4 = services de la GED exposée en BasicAuth
Planning de décomm. 2025 - endpointGEDv4

Les endpoints EIP des WS GEDv3/GEDv4 CST, MNG et SRC seront arrêtés aux dates suivantes :

RECETTE : mardi 1er juillet 2025
PP : mardi 23 sept. 2025
PR : mardi 16 déc. 2025
GED SAM v1 = la 1ere version des services de la GED exposée en oAuth2 (WS SOAP).
Secure = oAuth2
Access Module = MAAM v1
GED SAM v2 = la 2ere version des services de la GED exposée en oAuth2 (API REST).
Secure = oAuth2
Access Module = (MAAM v2 jusqu'en mai 2024) / OneAccount depuis mai 2024.
*SAM = Secure Access Module. Dit autrement, la version sécurisée d'accès à la GED (au regard du BasicAuth).

Sommaire
Sommaire
Date de mise en production
Statut : En exploitation
Objectifs
Règles
I - Présentation du service EIP « GED SAMv2 »
II - Principe de consommation du service « GED SAMv2 » avec un jeton d'accès OneAccount
III - Demande RFINT de consommation de l'API "GED SAMv2" 
IV - Demande SILVA de consommation du OneAccount (ClientId et/ou scope)
V - Demande de contrib GED pour mise en oeuvre du mapping ClientId/appUserGED
VI - Consommer une API en oAuth2 avec un access token
VII.a - API GED SAMv2 : Liste des opérations exposées / Classées par scope
VII.b - API GED SAMv2 : Définition des énumérés EndUserType & ApplicationCaller
VIII - API GED SAMv2 : Liste des opérations par type d'exposition
IX - API GED SAMv2 : URL du swagger de l'API REST
X - GED SAMv2 : URL EIP d'accès à l'API REST
XI - Liens ONEACCOUNT
XI - Liens MAAMv2 (Obsolète)
Date de mise en production
2 mars 2021 (Version tactique exit MAAMv1) / 13 déc. 2022 (Version cible MAAMv2) / 24 mai 2024 (Version cible OneAccount)

Statut : En exploitation
1) La version tactique de mars 2021 est une version en cours d'exploitation pour OSMOSE, eModulango, Arkéa afin de répondre à l'exigence du décommissionnement du MAAMv1 (et donc de l'arrêt du service GED SAMv1).

GED SAMv2 - Mars 2021 (WebMethod)

Restrictions d'usages :

Pas compatible avec application de type Frontend ayant plusieurs type de population utilisatrice (Siège, Distributeurs, Filiales) : appelée usage "Front"
Pas compatible avec application de type Backend ayant plusieurs type d'application appelante (Ex: Webmail, PFEL, API Doc Proc, API Business, API Client, etc.) : appelé usage "socle"
Pas compatible avec mécanisme asynchrone (Pas de rejeu automatique)
Exposition partielle des seules opérations utilisés par ces SA :
GetDocument (deprecated)
UploadBinaryDocument (deprecated)
SearchDocuments (deprecated)
L'hébergement de ces méthodes l'est sur l'infra "WebMethod" de l'EIP (deprecated)
Pas d'autres déploiement autorisé sur l'usage de cette version tactique.

2) La version cible de décembre 2022 est la version complète du GED SAMv2 :

GED SAMv2 - Décembre 2022 (CaaS/Honey)

compatible avec l'usage "multi-population" des frontend ayant plusieurs type de population utilisatrice (Siège, Distributeurs, Filiales)
compatible avec l'usage "multi-application" des socles ayant plusieurs type d'application utilisatrice appelante
compatible avec mécanismes asynchrones (Rejeu automatique en place sur l'upload aSync / CallBack possible)
Exposition complète de l'ensemble des opérations suivantes de la GED (Description et signification des opérations possibles au paragraphe VII.a)  :
Par scope  : 
Scope urn:axa:france:ged:CST (Consult) : 
📷 /document/vignette : GetDocumentsVignette,
👁️ /document/url : GetDocumentsURL,
outbox tray /document/binary/content : GetDocumentContent,
🧾 /dictionary​ : GetDictionary,
Scope urn:axa:france:ged:MNG (Manage) :
inbox tray /document/upload : UploadDocument,
🖊️ /document/metadatas/update : UpdateDocumentMetadatas,
✅ /document/metadatas/control : ControlMetadatas,
❌ /document/delete : DeleteDocument,
🚦   /availability : GetAvailability,
Scope urn:axa:france:ged:SRC (Search) : 
🔎 /document/metadata​s/search : SearchDocumentsMetadatas,
NEW button In Progress :
Scope urn:axa:france:ged:saveas (Save As) :
ticket outbox tray /document/ticket : GetDocumentTicket, 
Scope urn:axa:france:ged:uploadto (Upload To) :
ticketinbox tray /document/ticket/upload : GetUploadTicket, 
Présentation matrice Objets / Scope :


DOCUMENT	
📷 GetDocumentsVignette

👁️ GetDocumentsURL

outbox tray GetDocumentContent

inbox tray UploadDocument

 ❌ DeleteDocument

/	ticket(outbox tray) GetDocumentTicket	ticket(inbox tray) GetUploadTicket
METADATAS	/	
🖊️ UpdateDocumentMetadatas

✅ ControlMetadatas

🔎  SearchDocumentsMetadatas	/	/
GED	🧾 GetDictionary	🚦 GetAvailability	/	/	/
L'hébergement de ces méthodes est faite sur l'infra CAAS de l'EIP (Framework HONEY).

Objectifs
Respecter les bonnes pratiques d'usages de la GED, de l'EIP, du cloud, et de la stratégie de sécurité Axa France
Permettre aux consommateurs du service historique GEDv4 de basculer sur cet API REST "GED SAMv2"
Règles
Le service EIP appelé "GED SAMv2" est l'API REST d'exposition des opérations de la GED Axa France.
Cela correspond fonctionnellement aux mêmes opérations que le service EIP appelé "GEDv4" mais avec une authentification des applications de type oAuth2 (OneAccount).
I - Présentation du service EIP « GED SAMv2 »
Le service exposé sur l'EIP appelé GED SAMv2 (SAM pour « secure Access Module ») est l'exposition des opérations de la GED avec l'usage des technologies et sécurisation actuellement recommandées : 

Authentification oAuth2 des applications avec usage d'un jeton :
OneAccount (Fournisseur de jeton cible du groupe AXA depuis 2024 )​
Exposition REST​ de l'offre de service GED
Usage des prédicats de recherche en GED au format SQL​
Upload/Download des documents au format binaire (équivalent MTOM du SOAP)​
Une fois habilité à appeler un des services de l'EIP GED SAMv2 (scope : MNG, CST, SRC), il faut présenter à l'API un jeton d'autorisation OneAccount.

II - Principe de consommation du service « GED SAMv2 » avec un jeton d'accès OneAccount
1) Application consommatrice de la GED est déclarée au niveau du OneAccount

un ClientId par application :
Mode "Private_key_jwk" pour les clients "Externe" (Imposé par la SSI)
Utilisation de la librairie AxaFrance.Extensions.Http.OAuth2ClientCredentials : README - AxaFrance.Extensions.Http.OAuth2ClientCredentials
Mode "Client_Secret_jwt" pour les clients "Interne" (Autorisé par la SSI)
Utilisation de la librairie AxaFrance.Extensions.OpenIdConnect.ClientAssertions : README - AxaFrance.Extensions.OpenIdConnect.ClientAssertions
2) Application consommatrice appelle le OneAccount selon son usage :

Sur l'ESG (Adresse en axa.com) pour les clients "Externe" :
L'API "GED SAMv2" est à appeler sur l'ESG.​
Sur l'EIP (Adresse en *.intraxa) pour les clients "Interne" :​
L'API "GED SAMv2" est à appeler sur l'EIP.
​3) Application consommatrice demande un jeton d'accès en s’authentifiant au OneAccount :​

https://confluence.axa.com/confluence/display/OAUTH/Client+Credentials​
Normes : RFC-6749
Exigence SSI
Mode "private_key_jwk" pour les clients externes
Mode "client_secret_jwt" autorisé pour les clients internes.
Détails sur ces 2 modes : Assertion-based Client Authentication - OAuth Authorization Server - Confluence by AXA GO​
​4) Application consommatrice  demande au OneAccount un jeton d'accès à la GED Axa France :

Audience : GED
urn:axa:france:ged
Scope par famille de scope de la liste suivante :
Scope d'autorisation du type d'action "documentaires" à utiliser pour l'usage de l'API "GED SAMv2" en direct (Opération unitaire) :
GED-MNG​ : Scope des opérations de type « gestion » ("MaNaGe" en anglais) 
urn:axa:france:ged:mng
GED-CST​ : Scope des opérations de type « consultation » ("ConSulT" en anglais)
urn:axa:france:ged:cst​
GED-SRC​ : ​ Scope des opérations de  type « recherche  » ("SeaRCh" en anglais)
urn:axa:france:ged:src
Scope d'autorisation du type d'action "documentaires" à utiliser pour les orchestration EIP AFA orchestrant des appels à l'API "GED SAMv2" (Opérations composées) :
GED-COPY​ : Scope des opérations à truster pour l'orchestration EIP "fr-ged-api-documents-copy-v1" (aka copyDoc) 
urn:axa:france:ged:copy
Scope d'autorisation du type d'action "documentaires" à utiliser pour les orchestration EIP AFA orchestrant des appels à l'API "GED SAMv2" pour le compte d'entité non trustés AFA (Opérations à truster) :
GED-ARKEA​ : Scope des opérations à truster pour l'orchestration EIP "fr-ged-api-documents-axb-v1" (aka proxyARKÉA) 
urn:axa:france:ged:axb
GED-ADIS​ : Scope des opérations à truster pour l'orchestration EIP  "fr-ged-api-documents-adis-v1" (aka proxyADIS) 
urn:axa:france:ged:adis
Scope du type d'action d'action "documentaires" à utiliser sur les transferts de fichiers binaires par ticketId (ticketId utilisé depuis un front) : 
GED-SAVEAS​ : ​ Scope de l'opération de  demande d'un TicketId pour « Enregistrer un document de la GED » depuis un front  // In Progress
urn:axa:france:ged:saveas
GED-UPLOADTO : ​ Scope de l'opération de  demande d'un TicketId pour « Téléverser vers la GED » depuis un front // In Progress
urn:axa:france:ged:uploadto
5) Application reçoit un jeton d'autorisation du OneAccount au format JWT (Jeton valide 1h) pour consommer l'API GED "GED SAMv2" : ​

https://confluence.axa.com/confluence/display/OAUTH/Access+Token+v2​
III - Demande RFINT de consommation de l'API "GED SAMv2" 
RFINT en cours d'évol.

Actuellement, RFINT est en attente d'une évolution pour que cette demande de conso soit faite par RFINT.

La demande de consommation de l'API REST "GED SAMv2" faite dans RFINT  : 

https://rfint.axa-fr.intraxa/
GED SAMv2 : fr-ged-api-documents-v2-vs .
ne sert actuellement qu'à de la cartographie, mais ne formalise pas la demande de consommation d'un service oAuth2.

Cette demande de conso "oAuth2" doit être formalisée par un ticket SILVA de demande de conso OneAccount (cf. prochain paragraphe)

IV - Demande SILVA de consommation du OneAccount (ClientId et/ou scope)
Pour avoir un jeton OneAccount à fournir à l'API "GED SAMv2" :  il faut être habilité à générer un jeton d'accès sur l'audience GED auprès du fournisseur de jeton OneAccount. (Et avoir un clientId pour son application slightly smiling face )

Le process de création d'un clientId (ou d'une habilitation d'un clientId à un scope GED) est une demande via un formulaire SILVA :

Raise a demand to IAM in English :  
Request IAM - Silva Portal SSP
If it’s to get new OneAccount IDs, please select “new project” (minor update is for a list of specific BAU requests and OneAccount IDs creation is not part of this)
Provide as many details as possible in the demand, as the IAM team does not access to WAC JIRA and cannot consult the history of past demands managed by Olivier Marlin
You will get an IAM-XXXX reference from @COE, IAM including a scoping that you will have to validate
After the approval on the scoping, an IAM implementer will contact you to proceed with the implementation
=> Vous pouvez contacter IAM.COE@axa.com en anglais pour tout complément d’information relatif à Silva ou à la création de votre demande IAM.

/!\ Le process end-to-end (depuis l’émission de la demande à l’implémentation jusque la production) peut prendre quelques semaines, il faut donc anticiper les demandes autant que possible. /!\

oAuth2 : Client Credentials Grant / private_key_jwt

Pour respecter les standards de sécurités attendues par la SSI, la demande est une demande de :

Type : Client Credentials Grant : Applicative Authentication
Pour les clients "Externe" : Methode "chiffrement asymétrique" / private_key_jwk
private_key (known by the application) 
matching public_key (known by OneAccount)
Pour les clients "Interne" : Methode "chiffrement symétrique" / client_secret_jwt
client_secret (known by the application) 
client_secret (known by OneAccount)
Détails pour l'implémentation : Assertion-based Client Authentication - OAuth Authorization Server - Confluence by AXA GO
V - Demande de contrib GED pour mise en oeuvre du mapping ClientId/appUserGED
La consommation de l'API REST "GED SAMv2" nécessite une contrib GED afin qu'un BA GED mettent en œuvre un mapping technique :

Soit le clientId a approuvé une personne, et nous mettons en oeuvre sur le EndUserType de cette personne (~type de population) :
ClientId + EndUserTYpe → appUsers GED dans le contexte de sécurité de cette population 
Exemple : ClientId = SOLARIS / EndUserType = SIEGE → appUsers GED = ecm_solaris_siege (Les droits d'action et droits d'accès en GED sera porté par cet appUser GED)
Soit le clientId a approuvé une application, et nous mettons en oeuvre sur le applicationCaller de cette application approuvée  :
ClientId + ApplicationCaller  → appUsers GED dans le contexte de cette application appelante 
Exemple : ClientId = PFEL / ApplicationCaller = SOLARIS → appUsers GED = ecm_pfel_solaris (Les droits d'action et droits d'accès en GED sera porté par cet appUser GED)
Cette demande de contrib GED est à faire via un ticket AJIR, modop de création du ticket ici : Contrib GED - Modop AJIR

VI - Consommer une API en oAuth2 avec un access token
A utiliser le package de la COP .NET :

      https://dev.azure.com/axafrance/COPDotNet/_git/oauth-wcf-behavior-net?path=%2Fsrc%2FAF.Extensions.Http.OAuth2ClientCredentials

VII.a - API GED SAMv2 : Liste des opérations exposées / Classées par scope
Scope GED-MNG / contrôle du scope présent dans le jeton pour exécuter les opérations suivantes :​
inbox tray "UploadDocument" <=>  /document/upload
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/upload
Schéma : multipart/form-data
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
Interaction (enum : 'sync','async')
CallbackAddress (string)

CallbackAddress

Ne pas utiliser de DNS d'AZURE MT en ***.multitenants.net : DNS non résolu sur le CaaS.

DocumentProperties : 
Url (string)
Name (string)
Extension (string)
Properties (array Property[] )
Content (binary )
FileName (string)
ContentType (string)
Content (stream)
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocumentProperties
Name 
Extension 
Properties (au moins 1 Property)
Content (ou DocumentProperties.Url)
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur)
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Soit Content de valorisé, soit Url de valorisé.
Si Interaction à 'async', alors CallbackAddress valorisé aussi
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
ObjectStore correspond au PM.
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
DocId (string)
ObjectStore (string)
Response "500" :

! Check du client généré avec le swagger !

Après la génération automatique de votre code client avec le swagger GED SAMv2 : vérifier que vous avez bien modifié le ContentType généré par défaut en application/octet-stream avec votre vrai type MIME de votre fichier uploadé (sourire) !
UploadBinaryDocument ( warning Deprecated / Seul usage pour Arkéa et Karibu )
HOST : WebMethod
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/binary
🖊️ "UpdateDocumentMetaDatas​" <=> /document/metadatas/update
HOST : HONEY
VERB : PUT​
URL : /fr-ged-api-documents-v2-vs/document/metadatas/update
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
DocId (string)
Properties (array Property[] )
Interaction (enum : 'sync','async')
CallbackAddress (string)

CallbackAddress

Ne pas utiliser de DNS d'AZURE MT en ***.multitenants.net : DNS non résolu sur le CaaS.

Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocId
Properties (au moins 1 Property)
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur)
Si EndUserType valorisé, alors EndUserId valorisé aussi.
Si Interaction à 'async', alors CallbackAddress valorisé aussi
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
ObjectStore correspond au PM.
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
UpdatedPropertiesCount (integer)
❌ "DeleteDocument" <=> /document/delete
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/delete
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
DocId (string)
DatePurge (string) 
Interaction (enum : 'sync','async') 
CallbackAddress (string)

CallbackAddress

Ne pas utiliser de DNS d'AZURE MT en ***.multitenants.net : DNS non résolu sur le CaaS.

Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocId
DatePurge
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur)
Si EndUserType valorisé, alors EndUserId valorisé aussi.
Si Interaction à 'async', alors CallbackAddress valorisé aussi
Règle de valorisation du EndUserId lors de l'appel au backend GED : 
Si EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
ObjectStore correspond au PM.
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
DocId (string)
DatePurge (string)​
/fr-ged-api-documents-v2-vs/document/delete
/fr-ged-api-documents-v2-vs/document/delete
✅ "ControlMetaDatas" <=> /document/metadatas/control
HOST : HONEY 
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/metadatas/control
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
Properties (array Property[] )
Document :
Name (string)
Extension (string)
MimeType (string)
Size (integer)
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
Properties (au moins 1 Property)
Document :
Name
Extension
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur)
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Règle de valorisation du EndUserId  lors de l'appel au backend GED : 
Si EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
ObjectStore correspond au PM.
Response "200" (Schéma : application/json) :
​Status (enum : 'OK','KO')
 🚦 "GetAvailability" <=> /availability​
HOST : HONEY
VERB : GET​
URL : /fr-ged-api-documents-v2-vs/availability
Schéma : /
Input : 
Locale (enum : 'fr-fr','en-us')
Required : /
Contrôle sur input : /
Règle de valorisation du EndUserId  lors de l'appel au backend GED : /
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')​
AvailabilityState (integer)
AvailabilityStateDescription (string)
Scope GED-CST (Consult) / contrôle du scope présent dans le jeton pour exécuter les opérations suivantes : ​
GetDocument ( warning Deprecated / Seul usage pour OSMOSE et eMODULANGO )​
HOST : WebMethod
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/content
outbox tray​ "GetDocumentContent" <=> /document/binary/content​
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/binary/content
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
DocId (string)
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocId 
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur) 
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
Response "200" (Schéma : multipart/form-data) :
Status (enum : 'OK','KO')
Name (string)
Extension (string)
MimeType (string)​
File (binary)
Response "406" :

Schéma Response

! Vérifier que vous avez bien mis un schéma de reponse en multipart/form-data (sourire) !
👁️ "GetDocumentsURL" <=> /document/url
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/url
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
DocIds (array DocId[])
ViewerLinkOption :
ViewerType (enum : 'Extern','Intern')
Profil (string)
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocIds (au moins 1 DocId)
ViewerLinkOption :
ViewerType
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur) 
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
Links (array Link[])
Url (string)
DocId (string)​
ObjectStore (string)
📷 "GetDocumentsVignette​" <=> /document/vignette
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/vignette
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
DocIds (array DocId[])
ImageLinkOption :
Size (integer)
PageNumber  (integer)
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocIds (au moins 1 DocId)
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur) 
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
Links (array Link[])
Url (string)
DocId (string)​
ObjectStore (string)
🧾 "GetDictionary" <=> /dictionary​
HOST : HONEY
VERB : GET​
URL : /fr-ged-api-documents-v2-vs/dictionary
Schéma : /
Input : 
Locale (enum : 'fr-fr','en-us')
Required : /
Contrôle sur input : /
Règle de valorisation du EndUserId  lors de l'appel au backend GED : /
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
​Properties (array PropertyDefinition[] )
Name (string)
Code (string)
Type (string)
Category (string)
Length (integer)
Searchable (boolean)
IsRequired (boolean)
ListId (string)
ListMembers (array ListMember[])
Scope GED-SRC (Search) / contrôle du scope présent dans le jeton pour exécuter les opérations suivantes :
🔎 "SearchDocumentsMetaDatas" <=> /document/metadata​s/search​
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/metadata​s/search
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType)
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
Predicate (string)  // Prédicat de recherche attendu au format SQL (! Pas de transco JSON/SQL !)
PropertiesToReturn (array Property[] )
MaxResult  (Integer)
CreationDateOrdering (enum : 'ASC','DESC')
PaginationCode (string)
ObjectStoreList (array ObjectStore[])
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
Predicate
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur)
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
PaginationCode (string)
ResultNumber (integer)
Documents (array object "document")
ObjectStore (string)
DocId (string)
Properties (array Property[])
SearchDocuments ( warning Deprecated / Seul usage pour OSMOSE, eMODULANGO et Arkéa ) ​
HOST : WebMethod
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/metadata​s
Scope GED-SAVEAS / contrôle du scope présent dans le jeton pour exécuter les opérations suivantes :​ 
ticket(outbox tray) GetDocumentTicket <=> /document/ticket (// En REC, en cours de test)​
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/ticket
Schéma : application/json
Input : 
CommonParameters :
Locale (enum : 'fr-fr','en-us')
EndUserId  (string)
EndUserType  (enum : ListEndUserType )
ApplicationCaller (enum : ListApplicationCaller )
ObjectStore (string)
DocId (string)
Required :
CommonParameters
Locale 
EndUserType ou ApplicationCaller
DocId 
Contrôle sur input :
Soit EndUserType ou ApplicationCaller de valorisés (sinon, message d'erreur) 
Si EndUserType valorisé, alors EndUserId  valorisé aussi.
Règle de valorisation du EndUserId  lors de l'appel au backend GED :
Si l'input EndUserId est valorisé par appelant alors propager la valeur sinon EndUserId  est valorisé avec l'appUser récupéré lors de l'appel à la méthode du WS GED (mapping {ClientId;EndUserType} / appUser).
Response "200" (Schéma : application/json) :
Status (enum : 'OK','KO')
TicketId (string)
Scope GED-UPLOADTO / contrôle du scope présent dans le jeton pour exécuter les opérations suivantes :​ 
ticket(inbox tray) UploadTicket <=> /document/ticket (// En cours de spec.)​
HOST : HONEY
VERB : POST​
URL : /fr-ged-api-documents-v2-vs/document/ticket/upload
...In Progress...
VII.b - API GED SAMv2 : Définition des énumérés EndUserType & ApplicationCaller
A la date du 25 oct. 2024, ces 2 listes sont fermées sont avec les items suivants :

ListEndUserType / Type de population des endUsers authentifiés par le front qui appelle le socleGED :
A2P;ADF;AEP;AGA;AMA;AWS;AXA_ASSISTANCE;AXB;CLI;CLP;COU;JURIDICA;SIEGE;SIEGE_AXAPART;SIEGE_IARDENT;SIEGE_REGLEURS;SOG
ListApplicationCaller / Application consommant le socle qui appelle le socleGED :
APICLIENT;APPMOBILE;AXAWS;AXAPAC;BATCH;ECMWEBAPP;ESPACE_BENEFICIAIRE;FRONTGED;Karibu;MAW;MOSAIC;NAE;NOVA;OnePager;OSE;PARTYREGISTRATION_TECH;PEIS;PEMA;RADLAD;SALESFORCE;Salesforce;SDJ;SED;SIEBEL_ERE;SOLARIS;SOLARIS_ADF;SOLARIS_AGDF;SOLARIS_TECH


Evolution de ces listes fermées

Dans le cas d'une nouvelle population utilisatrice (EndUserType) ou d'un nouveau frontEnd débranchant vers un socle consommant la GED (ApplicationCaller), faire valider le nouvel item auprès du DA GED.

VIII - API GED SAMv2 : Liste des opérations par type d'exposition
1) Exposition "ESG" / PROD :

Opérations exposées par ordre alphabétique :
outbox tray	GetDocumentContent	urn:axa:france:ged:cst
ticket(outbox tray)	GetDocumentTicket	urn:axa:france:ged:saveas
👁️	GetDocumentsUrl	urn:axa:france:ged:cst
🔎	SearchDocumentsMetadatas	urn:axa:france:ged:src
inbox tray	UploadDocument	urn:axa:france:ged:mng
UploadBinaryDocument (Deprecated)
2) Exposition EIP "Intraxa" Legacy / PROD (version Mars 2021 - Osmose/eModulango/Arkéa)

Opérations exposées :
GetDocument (Deprecated)
👁️ GetDocumentsURL
UploadBinaryDocument (Deprecated)
UploadDocument (Deprecated)
🔎 SearchDocuments
3) Exposition EIP "Intraxa" / PROD (Version Cible - MEP du 24 mai 2024 )

Opérations exposées par ordre alphabétique :
✅	
ControlMetadatas

urn:axa:france:ged:mng
❌	
DeleteDocument

urn:axa:france:ged:mng
🚦	
GetAvailability

urn:axa:france:ged:mng
🧾	
GetDictionary

urn:axa:france:ged:cst
outbox tray	GetDocumentContent	urn:axa:france:ged:cst
ticket(outbox tray)	GetDocumentTicket	urn:axa:france:ged:saveas
 📷	
GetDocumentsVignette

urn:axa:france:ged:cst
👁️	GetDocumentsUrl	urn:axa:france:ged:cst
🔎	SearchDocumentsMetadatas	urn:axa:france:ged:src
 🖊️	UpdateDocumentMetadatas	urn:axa:france:ged:mng
inbox tray	UploadDocument	urn:axa:france:ged:mng
IX - API GED SAMv2 : URL du swagger de l'API REST
Le swagger de l'API "GED SAMv2" (en OPEN API 3.0) est disponible sur le GIT d'Axa France : AXA France Developers - GED SAMV2 (axa-fr.intraxa)

ASTUCE : 
Utilisation du swagger sur HONEY

Dans le cas d'un usage du swagger avec HONEY-SHELL (AZURE), il faut prévoir une rustine pour la génération de l'objet client qui va consommer l'API. En effet, l'opération "📤 GetDocumentContent" ne renvoie pas le même format selon la réponse : 
Si 200 : multipart/form-data
Sinon : application/json
Aussi, la "rustine" conseillée est de déclarer les 2 formats dans la réponse "200" :

Cela permet la génération d'un objet du style :
 @Headers({
    "Content-Type: application/json",
    "Accept: multipart/form-data, application/json" 
X - GED SAMv2 : URL EIP d'accès à l'API REST
RFINT	WSDL coreIT (EIP 9.7)	WSDL pIaaS (EIP 10.3)
REC (fr-ged-api-documents-v2)

https://eip-medv9-tst-sesd.applications.services.axa-tech.intraxa/ws/fr-ged-api-documents-v2-vs/

https://eip-rec.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/
PP  (fr-ged-api-documents-v2)

https://eip-meds-hp-bravo-stg-sesd.ppmail.ppservices.axa-tech.intraxa/ws/fr-ged-api-documents-v2-vs

https://eip-pp.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/
PR (fr-ged-api-documents-v2)

https://eip-meds-hp-bravo-sesd.applications.services.axa-tech.intraxa/ws/fr-ged-api-documents-v2-vs

https://eip.axa-fr.intraxa/ws/fr-ged-api-documents-v2-vs/
XI - Liens ONEACCOUNT
Page d'information de la migration MAAMv2→ OneAccount : 0. Informations générales - AXA France - Guilds - Confluence by AXA GO
Page de management des configurations (Basé sur les API de Ping) : OneAccount Management API - Swagger UI (corp.intraxa)
Environnement du OneAccount :
DEV (INT/REC) : https://onelogin.dev.axa.com/.well-known/openid-configuration
STG (PP) : https://onelogin.stg.axa.com/.well-known/openid-configuration 
PROD : https://onelogin.axa.com/.well-known/openid-configuration 
XI - Liens MAAMv2 (Obsolète)
Authentification sur le MAAMv2 pour l'audience GED : Client Authentication Methods :
Type : Client Credentials Grant
Methode :
Client externe : private_key_jwk
Client interne : client_secret_jwt
Environnements du MAAMv2 : MAAMv2 Environments avec les URLS d'accès ci-dessous :
INT/REC : 
External : https://maam-dev.axa.com/maam/v2/api/v1/ 
Internal : https://maam-dev.corp.intraxa/maam/v2/api/v1/
PP : 
External : https://maam-stg.axa.com/maam/v2/api/v1/ 
Internal : https://maam-stg.corp.intraxa/maam/v2/api/v1/
PROD: 
External : https://maam.axa.com/maam/v2/api/v1/ 
Internal : https://maam.corp.intraxa/maam/v2/api/v1/
Procédure pour récupérer les infos du token : HOWTO: Check a Client Config


J'aime2 personne(s) aiment ça
meeting-notesModifier les étiquettes
9 commentaires
Icône utilisateur: jeanlou.pierme@axa.fr
PIERME Jean lou dit :
Ca serait bien de ne pas avoir l'exemple de code pour consommer de l'oauth mais plutot rediriger vers le package oauth de la copdotnet : https://dev.azure.com/axafrance/COPDotNet/_git/oauth-wcf-behavior-net?path=%2Fsrc%2FAF.Extensions.Http.OAuth2ClientCredentials

RépondreSupprimerJ'aime16. sept. 2020
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Merci pour le feedback, je mets à jour en ce sens. 

RépondreSupprimerJ'aime16. sept. 2020
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Rajout en PJ à la page du swagger en openapi 3.0. avec les opérations :

GetDocumentContent,
GetDocumentsUrl,
SearchDocuments
UploadDocument
RépondreSupprimerJ'aime24. sept. 2020
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Rajout en PJ à la page du swagger "v6" en openapi 3.0. complétant l'exposition des opérations avec : 

GetDocumentContent (pour remplacer GetDocument deprecated),
UpdateDocument,
DeleteDocument,
ControlMetas,
GetDictionary,
GetAvailability,
RépondreSupprimerJ'aime23. juin 2022
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Mise à jour du swagger "cible" avec l'opération "GetDocumentsVignette" (pour la génération d'URL de récupération d'une vignette du document).

GetDocumentsURL n'est plus qu'une méthode de génération d'une URL de visu du document.
Respect du modèle SOLID de chacune des opérations exposées
RépondreSupprimerJ'aime23. juin 2022
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Mise à jour pour dépréciation des méthodes "WebMethod" SearchDocuments et UploadBinaryDocument pour réécriture des méthodes sur HONEY en SearchDocumentsMetaDatas et UploadDocument.

RépondreSupprimerJ'aime16. sept. 2022
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Suite au comité de DA GED du 19 déc. 2022 , le service GED SAMv2 est le seul service exposant l'offre de service de la GED disponible pour tout nouveau déploiement, nouvel usage à partir du 1 janv. 2023 

RépondreSupprimerJ'aime30. déc. 2022
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
Mise à jour de la page avec les préco SSI : 

Private_key_jwk : mécanisme de signature via un chiffrement asymétrique
Méthode d’authentification obligatoire pour les clients externe.
Le private_key_jwt garantie que le token a été émis par le client, car il est le seul à détenir la clé de chiffrement (principe de non répudiation).
Client_secret_jwt : mécanisme de signature via un chiffrement symétrique
Méthode d’authentification acceptée pour les clients internes.
RépondreSupprimerJ'aime04. nov. 2024
Icône utilisateur: michael.joly@axa.fr
JOLY Michael dit :
L'API REST "GED SAMv2" est depuis ce jour en double RUN avec token MAAMv2 et token OneAccount. (coche)

