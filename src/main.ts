import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { getGroupByActFromLocalStorage, setGroupByActInLocalStorage } from "./localStorage";

describe("LocalStorage utilities", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Réinitialise les mocks entre les tests
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it('should return false when groupByAct is "false"', () => {
    localStorage.setItem("groupByAct", "false");
    const result = getGroupByActFromLocalStorage();
    expect(result).toBe(false);
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
  it("should set the correct value to localStorage", () => {
    const spy = vi.spyOn(Storage.prototype, "setItem");

    setGroupByActInLocalStorage(true);

    expect(spy).toHaveBeenCalledWith("groupByAct", "true");
  });
});
 FAIL  src/utils/localStorage.test.ts > LocalStorage utilities > should set the correct value to localStorage
AssertionError: expected "setItem" to be called with arguments: [ 'groupByAct', 'true' ]

Received:



Number of calls: 0

 ❯ src/utils/localStorage.test.ts:90:17
     88|     setGroupByActInLocalStorage(true);
     89| 
     90|     expect(spy).toHaveBeenCalledWith("groupByAct", "true");
       |                 ^
     91|   });
     92| });
export const getGroupByActFromLocalStorage = (): boolean => {
  try {
    return localStorage.getItem("groupByAct") !== "false";
  } catch {
    return true; // Default to true
  }
};

export const setGroupByActInLocalStorage = (value: boolean) => {
  try {
    localStorage.setItem("groupByAct", value.toString());
  } catch {
    console.warn("Unable to access localStorage");
  }
};
