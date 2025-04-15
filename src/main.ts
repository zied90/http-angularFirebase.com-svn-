 src/utils/localStorage.test.ts > LocalStorage utilities > should set the correct value to localStorage
Error: setItem does not exist
 ❯ src/utils/localStorage.test.ts:85:20
     83|   it("should set the correct value to localStorage", () => {
     84|     // Espionner directement global.localStorage.setItem
     85|     const spy = vi.spyOn(global.localStorage, "setItem");
       |                    ^
     86|     setGroupByActInLocalStorage(true);
     87|     // Vérifier que setItem a bien été appelé avec les bons arguments
