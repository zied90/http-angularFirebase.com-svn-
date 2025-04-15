
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
import { describe, it, expect, vi, beforeAll } from "vitest";
import { getGroupByActFromLocalStorage, setGroupByActInLocalStorage } from "./localStorage";

describe("LocalStorage utilities", () => {
  // Mocks pour localStorage
  beforeAll(() => {
    global.localStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
    } as unknown as Storage;
  });
  it("should return true by default if localStorage is inaccessible", () => {
    // Simuler l'accès à localStorage
    Object.defineProperty(global, "localStorage", {
      value: {
        getItem: vi.fn().mockImplementation(() => {
          throw new Error("localStorage is not available");
        }),
      },
      writable: true,
    });
    const result = getGroupByActFromLocalStorage();
    expect(result).toBe(true);
  });
  it('should return false if localStorage groupByAct is "false"', () => {
    // Simuler l'accès à localStorage avec "false"
    localStorage.getItem = vi.fn().mockReturnValue("false");
    const result = getGroupByActFromLocalStorage();
    expect(result).toBe(false);
  });
  it('should return true if localStorage groupByAct is not "false"', () => {
    // Simuler l'accès à localStorage avec une autre valeur
    localStorage.getItem = vi.fn().mockReturnValue("true");
    const result = getGroupByActFromLocalStorage();
    expect(result).toBe(true);
  });
  it("should set the correct value to localStorage", () => {
    // Appel de la fonction
    setGroupByActInLocalStorage(true);
    // Vérifier que localStorage.setItem a été appelé avec les bons arguments
    expect(localStorage.setItem).toHaveBeenCalledWith("groupByAct", "true");
  });
  it("should log a warning if localStorage is not available", () => {
    // Simuler l'accès à localStorage qui échoue
    Object.defineProperty(global, "localStorage", {
      value: {
        setItem: vi.fn().mockImplementation(() => {
          throw new Error("localStorage is not available");
        }),
      },
      writable: true,
    });
    const warnSpy = vi.spyOn(console, "warn");
    setGroupByActInLocalStorage(true);
    expect(warnSpy).toHaveBeenCalledWith("Unable to access localStorage");
  });
});
