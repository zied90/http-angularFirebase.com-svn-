
Restitution des logs  :
Avant :Au chargement des logs  on charge tous les information  de chque log 
Actuelement : on charge uniquement les unformation necessaire 
Avant on utilise  les info de detai requperer lors de premier chartgerment de log 
Actuelement Pour le detail dun log   on recupere uniqyement le detail de log semctionner 
Avant : indexs étaient pas  bien positionnés
Ajout des index : sur la date de creation , le numeo de contrat  , template, action
 Avant https://consolepfel-recprj.axa-fr.intraxa/api/v1/logs?page=0&size=10&order=DESC&sortBy=dateCreated
Actuelement https://consolepfel-recprj.axa-fr.intraxa/api/v1/logs?page=0&size=10&order=DESC&sortBy=id

La recherche des template  lors de la recheche des log 
Avaant : un champs  libre a sasi 
Actuelement   mise en place dun susteme d autocomplete qui peremet de envoyer id exacte de la template et  pratque  cote experience utilisateur 
