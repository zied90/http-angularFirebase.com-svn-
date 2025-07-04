import { documentsByActs } from "./documentsByActs";
import ApiHandler from "../config/apiHandler";
import { IDocument } from "@/types/documents";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";
import { createEmptyObject } from "@/testsUtils/testsUtils";

vi.mock("../config/apiHandler");
const emptyIDocument: IDocument = createEmptyObject<IDocument>();

describe("documentsByActs", () => {
  const docFilters = {};
  const actsIds = ["1", "2", "3"];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("should call ApiHandler with the correct parameters", async () => {
    (ApiHandler as Mock).mockResolvedValue({ successData: emptyIDocument });
    await documentsByActs({ docFilters, actsIds });
    actsIds.forEach((actId) => {
      expect(ApiHandler).toHaveBeenCalledWith(`/acts/${actId}/documents`, docFilters, "POST", {});
    });
  });

  test("should return the result from ApiHandler", async () => {
    const expectedResult: IDocument[] = [emptyIDocument, emptyIDocument, emptyIDocument];
    (ApiHandler as Mock).mockResolvedValue({ successData: emptyIDocument });
    const result = await documentsByActs({ docFilters, actsIds });
    expect(result).toEqual(expectedResult);
  });

  test("should throw an error if ApiHandler rejects", async () => {
    const error = new Error("API error");
    (ApiHandler as Mock).mockRejectedValue(error);
    await expect(documentsByActs({ docFilters, actsIds })).rejects.toThrow(error);
  });
});

import ApiHandler from "../config/apiHandler";
import { IDocument } from "@/types/documents";

export type IDocumentsByActs = {
  docFilters: any;
  actsIds: string[];
};

export const documentsByActs = async ({ docFilters, actsIds }: IDocumentsByActs): Promise<IDocument[]> => {
  const calls = actsIds.map((actId) => ApiHandler<IDocument[]>(`/acts/${actId}/documents`, docFilters, "POST", {}));
  const results = await Promise.all(calls);
  return results.reduce((acc, val) => acc.concat(val.successData), []);
};



import ApiHandler from "../config/apiHandler";
import { IDocumentResponse } from "@/types/documents";

export function contextManager(docIs: string[]) {
  const ids = docIs.map(Number).filter((n) => !isNaN(n));
  return ApiHandler<IDocumentResponse>("/contexts/esign", ids, "POST", {});
}

