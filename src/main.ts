Expected: "Déjà Formaté"
Received: "DÉJÀ FormatÉ"

 ❯ src/Admin/adminUtils/FormatString.test.ts:8:52
      6|   });
      7|   it("ne modifie pas un texte déjà formaté", () => {
      8|     expect(formatStringForDisplay("Déjà Formaté")).toBe("Déjà Formaté");
       |                                                    ^
      9|   });
     10|   it("gère les chaînes vides", () => {
