#language: fr

Fonctionnalité: Gérer des documents AxaPac et IL101
  Contexte:
    Etant donné que je suis agent "D900036"
    Etant donné que le mode d'affichage est par "document"
    Et mon profil
      | demat |
      | true  |
    Et les documents suivants
      | id     | index | demat | esign | print | IL101 | contractNumber | clientNumber | name                         |
      | 111111 | 1     | true  | false | false | false | 11111123457    | 22222211124  | DEVOIR_DE_CONSEIL_CAMPINGCAR |
      | 111112 | 2     | true  | false | false | false | 11111123457    | 22222211124  | DEVOIR_DE_CONSEIL_CAMPINGCAR |
    Et 1 préimprimé

  Scénario: Imprimer un document et gérer erreur dematCG
    Et dematCG est en erreur
    Quand j'accède à Spoolnet
    Quand je clique sur le "bouton imprimer du document" 1 du "tableau des documents"
    Alors la "modal DematCG" est "visible"
    Alors le "dematCG" est "inexistant"
    Alors je vois "Récupération des documents pré-contractuels indisponible" dans "modal DematCG"
    Etant donné que je force les timeout à 200ms
    Quand je clique sur "bouton remise en papier"
    Alors je vois "Conditions Générales remises en papier" dans la "modal DematCG"
    Alors les documents suivants sont imprimés
      | id     |
      | 111111 |


  Scénario: Imprimer un document et gérer dematCG en timeout
    Etant donné que dematCG est en timeout
    Quand j'accède à Spoolnet
    Etant donné que je force les timeout à 200ms
    Quand je clique sur le "bouton imprimer du document" 1 du "tableau des documents"
    Alors le "dematCG" est "inexistant"
    Alors la "modal DematCG" est "visible"
    Alors je vois "Récupération des documents pré-contractuels indisponible" dans "modal DematCG"
    Quand je clique sur "bouton remise en papier"
    Alors je vois "Conditions Générales remises en papier" dans la "modal DematCG"
    Alors les documents suivants sont imprimés
      | id     |
      | 111111 |


  Scénario: Titres de dematCG en action <action>
    Etant donné mon profil
      | demat | webmail | esign | mail | print |
      | true  | true    | true  | true | true  |
    Et les documents suivants
      | id     | index | demat         | esign | print | IL101 | contractNumber | clientNumber | name                | typeLetter   |
      | 111111 | 1     | true          | true  | true  | false | 11111123457    | 22222211124  | DEVOIR_DE_CONSEIL_1 | <typeLetter> |
      | 111112 | 2     | <demat doc 2> | true  | true  | false | 11111123457    | 22222211124  | DEVOIR_DE_CONSEIL_2 | AUTRE_TYPE   |
    Etant donné que le mode d'affichage est par "document"
    Quand j'accède à Spoolnet
    Quand je sélectionne le "document 1" du "tableau des documents"
    Et je sélectionne le "document 2" du "tableau des documents"
    Et je sélectionne "<action>" dans "menu actions par lots"
    Alors la "modal DematCG" est "visible"
    Alors je vois "<titre modal>" dans le "titre de la modal"
    Alors je vois "<onglet 1>" dans le "onglet 1 de la modal dematCG"
    Etant donné que je force les timeout à 10000ms
    Quand je clique sur le bouton "bouton DematCG action demat"
    Alors je vois "<onglet 2>" dans le "onglet 2 de la modal dematCG"
    Exemples:
      | action                 | typeLetter               | demat doc 2 | titre modal                                   | onglet 1                              | onglet 2                            | step 2 contenu                                 |
      | Imprimer               | TOUS                     | true        | Avant d'imprimer les Conditions Particulières | Remise des documents pré-contractuels | Impression Conditions Particulières | Conditions particulières en cours d'impression |
      | Imprimer               | CONDITIONS_PARTICULIERES | true        | Avant d'imprimer les Conditions Particulières | Remise des documents pré-contractuels | Impression Conditions Particulières | Conditions particulières en cours d'impression |
      | Imprimer               | DEVIS_PROJET_ETUDE       | false       | Avant d'imprimer les Devis                    | Remise des documents pré-contractuels | Impression Devis                    | Devis en cours d'impression                    |
      | Envoyer                | DEVIS_PROJET_ETUDE       | false       | Avant d'envoyer le Devis                      | Remise des documents pré-contractuels | Envoi du devis                      | Devis Création du message Outlook              |
      | Signature électronique | TOUS                     | true        | Avant de signer électroniquement              | Remise des documents pré-contractuels | Envoi des Conditions Particulières  | Conditions particulières en cours d'impression |
      | Signature électronique | CONDITIONS_PARTICULIERES | true        | Avant de signer électroniquement              | Remise des documents pré-contractuels | Envoi des Conditions Particulières  | Conditions particulières en cours d'impression |
      | Signature électronique | DEVIS_PROJET_ETUDE       | true        | Avant de signer électroniquement              | Remise des documents pré-contractuels | Envoi des Devis                     | Devis en cours d'impression                    |


  Scénario: Titres de dematCG en IL101
    Etant donné mon profil
      | demat | webmail | esign | mail | print |
      | true  | true    | true  | true | true  |
    Etant donné que le mode d'affichage est par "dossier"
    Et les documents Axapac suivants
      | index | id | demat | IL101 | contractNumber | clientNumber |
      | 1     | 11 | true  | true  | 11111123456    | 22222211123  |
      | 2     | 22 | true  | true  | 11111123456    | 22222211123  |
    Quand j'accède à Spoolnet
    Quand je clique sur "titre du bloc Axapac"
    Alors le "bouton Envoi des CG par mail" du "document" 1 du "tableau des documents Axapac" est "visible"
    Quand je clique sur le "bouton Envoi des CG par mail" du "document" 1 du "tableau des documents Axapac"
    Alors je vois "Remise des Conditions Générales" dans le "titre de la modal"
    Alors je vois "Récupération du contrat" dans le "onglet 1 de la modal dematCG"
    Alors je vois "Remise des CG" dans le "onglet 2 de la modal dematCG"



# Ajouter test sur texte "conditions générales remises en papier" ou "CG renvoyées avec succès"

