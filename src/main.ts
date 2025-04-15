
 FAIL  src/utils/localStorage.test.ts > LocalStorage utilities > should set the correct value to localStorage
TypeError: undefined is not a spy or a call to a spy!
 ❯ src/utils/localStorage.test.ts:41:34
     39|     setGroupByActInLocalStorage(true);
     40|     // Vérifier que localStorage.setItem a été appelé avec les bons arguments
     41|     expect(localStorage.setItem).toHaveBeenCalledWith("groupByAct", "true");
       |                                  ^
     42|   });
     43|   it("should log a warning if localStorage is not available", () => {









              export const setGroupByActInLocalStorage = (value: boolean) => {
  try {
    localStorage.setItem("groupByAct", value.toString());
  } catch {
    console.warn("Unable to access localStorage");
  }
};
