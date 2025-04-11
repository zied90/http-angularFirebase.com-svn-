import { Then } from "@badeball/cypress-cucumber-preprocessor";
import { getElement } from "cypress/support/functions/Elements";

Then("le footer est visible", () => {
  cy.get(".af-footer").should("be.visible");
});

Then("je vois mon nom {string} dans le header", (name: string) => {
  cy.get(".af-info-user__name").should("contain", name);
});

Then("je vois la modal {string}", (modalName: string) => {
  getElement("modal " + modalName).as("modal");
  cy.get("@modal").contains("Server Name");
  cy.get("@modal").contains("Matricule");
  cy.get("@modal").should("be.visible");
});

Then("je ne vois plus la modal {string}", (modalName: string) => {
  getElement("modal " + modalName).should("not.exist");
});

//je vois "dossier(s)" dans "la barre des résultats"
//je ne vois pas "Aucun document" dans le "bloc Axapac"
Then(
  /^je (vois|ne vois pas) "(.+)" dans(?: (?:le|la|les|un|des))? "(.+)"$/,
  (see: string, str: string, selector: string) => {
    const cleanedStr = str.replace(/\\/g, "");
    switch (see) {
      case "vois":
        getElement(selector).contains(cleanedStr);
        break;
      case "ne vois pas":
        getElement(selector).should("not.contain", cleanedStr);
        break;
      default:
        throw new Error("Invalid value for see : " + see);
    }
  }
);

Then("je vois {string} dans la modal {string}", function (str: string, modalName: string) {
  getElement("modal " + modalName).contains(str);
});

Then("tous les filtres sont présent", () => {
  const filters = [
    "Filtres",
    "Dossiers traités",
    "Dossiers en cours",
    "Dossiers non traités",
    "Dossiers supprimés",
    "Nom du client",
    "Numéro de contrat",
    "Numéro de client",
    "Portefeuille",
    "Date de création",
  ];

  filters.forEach((filter) => {
    cy.contains(".filters", filter);
  });
});
