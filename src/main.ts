
Créé par JOLY Michael, dernière modification le 23. avr. 2025
Date de mise en production
13 déc. 2022 

Statut : En exploitation


Ce service de rappel concerne actuellement l'upload "aSync" sur l'API GED SAMv2. 

Ce mécanisme est : 

Un rappel sur l'URL fourni en paramètre CallbackAddress de l'upload GED SAMv2 en mode "aSync"
Avec l'URL de callback rappelée ayant les caractéristiques suivantes :
WS exposée sur l'EIP 
WS en SOAP et respectant un WSDL défini
WS avec authent en BasicAuth autorisé sur le user EIP de la GED "CLT_GED"


Informations

Ce service de rappel n'est pas encore disponible pour un rappel d'une URL exposée en oAuth2/REST.

D'ailleurs, à étudier si cela est pertinent à développer au regard de l'actuelle mise à disposition d'un event Kafka d'upload en GED déjà disponible par entité. 

 

Sommaire
Date de mise en production
Statut : En exploitation
Sommaire
Objectifs
Présentation de l'EIP-GED SAMv2 (Scope MNG) et de son mécanisme de callback
Objectifs
Décrire l'usage et les normes d'utilisation du callback de l'API REST "GED SAMv2" en mode upload "aSync" (Asynchrone)
Présentation de l'EIP-GED SAMv2 (Scope MNG) et de son mécanisme de callback
Sur le service EIP de la GED "GED SAMv2"  (RFINT: fr-ged-api-documents-v2-vs), il est possible de faire de l'upload en GED en mode "aSynchrone", c'est à dire avec un mécanisme de callback (Fournir le docId du document injecté en GED dans un temps différé de celui de l'appel à l'upload aSync).

Pour ce faire :

1) Coté consommateur de la GED : exposer une virtu de rappel (qui sera rappelé une fois l'upload réellement effectué en GED), virtu qui doit être avec les caractéristiques techniques suivantes :

en SOAP
en BasicAuth
autorisée au compte EIP "CLT_GED"
avec le contrat de services SOAP contenant ces paramètres : 
<xs:complexType name="UploadDocumentCallbackRequestType">
<xs:sequence>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="ConversationId" type="xs:string"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="EventType" type="xs:string"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="Username" type="xs:string"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="EndUser" type="xs:string"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="Status" type="xs:string"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="Errors" type="tns:ArrayOfUploadDocumentCallbackRequestTypeError"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="DocId" type="xs:string"/>
<xs:element form="unqualified" maxOccurs="1" minOccurs="0" name="Properties" type="tns:ArrayOfUploadDocumentCallbackRequestTypeProperty"/>
</xs:sequence>
</xs:complexType>
Explication des éléments :
ConversationId : restitue le CorrelationId fourni lors de l'appel à l'Upload.
Status : restitue le statut OK ou KO renvoyé par le backend GED lors de l'upload.
DocId : restitue l'identifiant documentaire du document tel que stocké en GED (si le statut est OK).
Exemple de WSDL :
DND en REC : fr-dnd-mng-documentcallback-v1
Easy Epargne : fr-easep-mng-documentcallback-v1
SDJ en REC : fr-sdj-mng-documentcallback-v1-vs
2) Coté consommateur de la GED : appeler l'API REST "GED SAMv2" (fr-ged-api-documents-v2-vs), avec les éléments valorisés suivants :

Interaction (enum : 'sync','async') :
valorisé à 'async'
CallbackAddress (string) :
valorisé à l'adresse du service consommateur à rappeler par la GED SAMv2
Exemple : 'https://eip-rec.axa-fr.intraxa/ws/fr-easep-mng-documentcallback-v1-vs'
3) Recevoir la réponse immédiate de l'upload 'aSync' du GED SAMv2 comme quoi la demande d'upload est bien prise en compte (Pas de docId fourni) :

CorrelationId -> ConversationId

Bien stocker/récupérer le CorrelationId de cet upload aSync, car il sera retransmis dans le ConversationId du callback GED SAMv2, en plus du docId du document.

4) Recevoir la réponse asynchrone sur votre virtu de callback (une fois l'injection réalisée en GED) afin de recevoir le docId du document importé en GED (sourire)

CorrelationId -> ConversationId

C'est bien la valeur du CorrelationId de l'Upload remis dans le ConversationId du callback qu'on retrouve quel document à quel docId en GED.
