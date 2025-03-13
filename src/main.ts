
 FAIL  src/Admin/adminUtils/FormatString.test.ts > formatStringForDisplay > ne modifie pas un texte déjà formaté
AssertionError: expected 'DéJà Formaté' to be 'Déjà Formaté' // Object.is equality

Expected: "Déjà Formaté"
Received: "DéJà Formaté"




const formatStringForDisplay = (name: string) => {
  return name.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export default formatStringForDisplay;



import formatStringForDisplay from "./FormatString";

describe("formatStringForDisplay", () => {
  it("remplace les underscores par des espaces et met en majuscule la première lettre de chaque mot", () => {
    expect(formatStringForDisplay("prevention_collective")).toBe("Prevention Collective");
    expect(formatStringForDisplay("rentes_individuelles")).toBe("Rentes Individuelles");
  });
  it("ne modifie pas un texte déjà formaté", () => {
    expect(formatStringForDisplay("Déjà Formaté")).toBe("Déjà Formaté");
  });
  it("gère les chaînes vides", () => {
    expect(formatStringForDisplay("")).toBe("");
  });
  it("fonctionne avec plusieurs underscores", () => {
    expect(formatStringForDisplay("test_unitaire_en_ts")).toBe("Test Unitaire En Ts");
  });
});
