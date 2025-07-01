
 × should manage perimeter `BANQ_CC`
     × should manage perimeter `BANQ_CL`
     × should manage perimeter `COLL_SANTE`
     × should manage any perimeter when a doc contains a perimeter property
     × should manage normal url without perimeter
     × should manage multiple subscribers in url

import { IDocument } from "@/types/documents";
import getEsignUrl, { getGedAttribute, mergeGedWithDocs } from "./getEsignUrl";
import { createEmptyObject } from "@/testsUtils/testsUtils";
import { vi, expect, test, describe, it } from "vitest";
import { IConfiguration } from "@/types/configuration";
import getDomainForUrl from "./getDomainForUrl";
import { templatesPerimetres } from "./perimetersListTemplates";
import { beforeEach } from "node:test";

let emptyDoc = createEmptyObject<IDocument>();

vi.mock("@/constants/bankCCList", () => ({ bankCCList: ["BANQ_CC_template"] }));
vi.mock("@/constants/bankCLList", () => ({ bankCLList: ["BANQ_CL_template"] }));

vi.mock("./index", () => ({
  substringUrl: (config: any) => config.urls.esign.replace(config.domainKey, "example.com"),
  addPrefixPfel: (list: string[]) =>
    list
      .filter((item: string) => !!item)
      .map((item: string) => "pfel-" + item)
      .join(";"),
  addLeadingZeros: (num: any, len: number) => num.padStart(len, "0"),
  getDomainForUrl: (url: string, config: IConfiguration) => getDomainForUrl(url, config),
}));

const configDefault = {
  urls: {
    esign: "https://example.com/?",
  },
};

describe("getEsignUrl", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("should manage perimeter `BANQ_CC`", () => {
    const docsSelected = [
      {
        ...emptyDoc,
        id: "1",
        clientNumber: "155523",
        contractNumber: "4555556",
        idRequest: "1344",
        name: getTemplateFromPerimeterId("BANQ_CC"),
      },
      {
        ...emptyDoc,
        id: "2",
        clientNumber: "155523",
        contractNumber: "4555556",
        name: "",
        idRequest: "2333",
      },
    ];

    const ged = [
      { id: "1", idRequest: "1344", isInGed: true, token: "88888" },
      { id: "2", idRequest: "2333", isInGed: false, token: "88888" },
    ];
    const docsGed = mergeGedWithDocs(docsSelected, ged);

    const esignObject = {
      identifiantAbonne: ["6666666"],
      ged: docsGed,
    };

    const config = structuredClone(configDefault);
    const esignUrl = getEsignUrl(docsSelected, esignObject, config as IConfiguration);

    expect(esignUrl).toBe(
      `https://example.com/?client=0000155523&contrat=0000000004555556&abonne=6666666&docPfel=pfel-1344;pfel-2333&perimetre=BANQ_CC&ged=true;false`
    );
  });

  it("should manage perimeter `BANQ_CL`", () => {
    const docsSelected = [
      {
        ...emptyDoc,
        clientNumber: "155523",
        contractNumber: "4555556",
        name: getTemplateFromPerimeterId("BANQ_CL"),
      },
      {
        ...emptyDoc,
        clientNumber: "155523",
        contractNumber: "4555556",
        name: "",
      },
    ];

    const esignObject = {
      identifiantAbonne: ["6666666"],
      ged: [
        { idRequest: "1344", isInGed: true },
        { idRequest: "2333", isInGed: false },
      ],
    };

    const config = structuredClone(configDefault);
    const esignUrl = getEsignUrl(docsSelected, esignObject, config as IConfiguration);

    expect(esignUrl).toBe(
      `https://example.com/?client=0000155523&contrat=0000000004555556&abonne=6666666&docPfel=pfel-1344;pfel-2333&perimetre=BANQ_CL`
    );
  });

  test("should manage perimeter `COLL_SANTE`", () => {
    const docsSelected = [
      {
        ...emptyDoc,
        clientNumber: "155523",
        contractNumber: "4555556",
        name: getTemplateFromPerimeterId("COLL_SANTE"),
      },
      {
        ...emptyDoc,
        clientNumber: "155523",
        contractNumber: "4555556",
        name: "",
      },
    ];

    const esignObject = {
      identifiantAbonne: ["6666666"],
      ged: [
        { idRequest: "1344", isInGed: true },
        { idRequest: "2333", isInGed: false },
      ],
    };

    const config = structuredClone(configDefault);
    const esignUrl = getEsignUrl(docsSelected, esignObject, config as IConfiguration);

    expect(esignUrl).toBe(
      `https://example.com/?abonne=6666666&perimetre=COLL_SANTE&docPfel=pfel-1344;pfel-2333&ged=true;false`
    );
  });

  test("should manage any perimeter when a doc contains a perimeter property", () => {
    const docsSelected: IDocument[] = [
      {
        ...emptyDoc,
        id: "1",
        clientNumber: "155523",
        contractNumber: "4555556",

        documentOptions: { perimeter: "FOO_BAR_PERIMETER", esign: true, demat: true, typeLetter: "typeLetter" },
      },
      {
        ...emptyDoc,
        id: "2",
        clientNumber: "155523",
        contractNumber: "4555556",
        name: "",
      },
    ];

    const esignObject = {
      identifiantAbonne: ["6666666"],
      ged: [
        { id: "1", idRequest: "1344", token: "88888", isInGed: true },
        { id: "2", idRequest: "2333", token: "88888", isInGed: false },
      ],
    };

    const config = structuredClone(configDefault);
    const esignUrl = getEsignUrl(docsSelected, esignObject, config as IConfiguration);

    expect(esignUrl).toBe(
      `https://example.com/?token=88888&abonne=6666666&perimetre=FOO_BAR_PERIMETER&docPfel=pfel-1344;pfel-2333&ged=true;false`
    );
  });

  test("should manage normal url without perimeter", () => {
    const docsSelected: IDocument[] = [
      {
        ...emptyDoc,
        id: "1",
        clientNumber: "155523",
        contractNumber: "4555556",
      },
      {
        ...emptyDoc,
        id: "2",
        clientNumber: "155523",
        contractNumber: "4555556",
        name: "",
      },
    ];
    const ged = [
      { id: "1", idRequest: "1344", isInGed: true, token: "88888" },
      { id: "2", idRequest: "2333", isInGed: false, token: "88888" },
    ];
    const docsGed = mergeGedWithDocs(docsSelected, ged);

    const esignObject = {
      identifiantAbonne: ["6666666"],
      ged: docsGed,
    };

    const config = structuredClone(configDefault);
    const esignUrl = getEsignUrl(docsSelected, esignObject, config as IConfiguration);

    expect(esignUrl).toBe(
      `https://example.com/?client=0000155523&contrat=0000000004555556&token=88888&abonne=6666666&docPfel=pfel-1344;pfel-2333`
    );
  });

  test("should manage multiple subscribers in url", () => {
    const docsSelected: IDocument[] = [
      {
        ...emptyDoc,
        id: "1",
        clientNumber: "155523",
        contractNumber: "4555556",
      },
      {
        ...emptyDoc,
        id: "2",
        clientNumber: "155523",
        contractNumber: "4555556",
        name: "",
      },
    ];

    const ged = [
      { id: "1", idRequest: "1344", isInGed: true, token: "88888" },
      { id: "2", idRequest: "2333", isInGed: false, token: "88888" },
    ];
    const docsGed = mergeGedWithDocs(docsSelected, ged);

    const esignObject = {
      identifiantAbonne: ["6666666", "5555555"],
      ged: docsGed,
    };

    const config = structuredClone(configDefault);
    const esignUrl = getEsignUrl(docsSelected, esignObject, config as IConfiguration);

    expect(esignUrl).toBe(
      `https://example.com/?client=0000155523&contrat=0000000004555556&token=88888&abonne=6666666;5555555&docPfel=pfel-1344;pfel-2333`
    );
  });

  describe("getGedAttribute", () => {
    it("should return correct docPfel and ged strings for non-empty input", () => {
      const input: IDocument[] = [
        { ...emptyDoc, idRequest: "123", isInGed: true },
        { ...emptyDoc, idRequest: "456", isInGed: false },
        { ...emptyDoc, idRequest: "789", isInGed: true },
      ];

      const result = getGedAttribute(input);

      expect(result).toEqual({
        docPfel: "pfel-123;pfel-456;pfel-789",
        ged: "true;false;true",
      });
    });

    it("should return empty strings for empty input", () => {
      const input: IDocument[] = [];

      const result = getGedAttribute(input);

      expect(result).toEqual({
        docPfel: "",
        ged: "",
      });
    });

    it("should handle single item input", () => {
      const input: IDocument[] = [{ ...emptyDoc, idRequest: "123", isInGed: true }];

      const result = getGedAttribute(input);

      expect(result).toEqual({
        docPfel: "pfel-123",
        ged: "true",
      });
    });
  });
});

const getTemplateFromPerimeterId = (perimeterId: string) => {
  const perimeter = templatesPerimetres.find((p) => p.id === perimeterId);
  if (!perimeter) return null;
  if (!perimeter.templates) return null;
  return perimeter.templates[0];
};

import { IDocument } from "@/types/documents";
import { getDomainForUrl } from "./index";
import { IConfiguration } from "@/types/configuration";
//import { baseParamsList, PerimetreType, templatesPerimetres } from "./perimetersListTemplates";

/** Base perimeters, help to generate the esign urls from templates or not */

// TODO REFACTOR THIS
/**
 * Retrieves the e-signature URL based on the selected documents, e-signature object, and configuration.
 * @param docsSelected - An array of selected documents.
 * @param esignObject - The e-signature object.
 * @param config - The configuration object.
 * @returns The e-signature URL.
 */
const getEsignUrl = (docsSelected: IDocument[], esignObject: any, config: IConfiguration | null) => {
  if (config === null) throw new Error("Configuration object is null");
  const { contextId } = esignObject;
  return formatEsignUrl(config, contextId);
};

/**
 * First check the perimeters of the documents (doc.documentOptions.perimeter)
 * If perimeter is not found, found the perimeter from the doc.name and fint the perimeter in perimeters according to the doc.name and templatesPerimetres list
 * if perimeter is not found, get the default perimeter
 * @param doc
 * @param perimeters
 */
/* const getPerimeter = (docs: IDocument[], perimeters: any): PerimetreType | null => {
  const perimeterName = docs
    .map((doc: IDocument) => {
      if (doc.documentOptions?.perimeter) {
        return doc.documentOptions.perimeter;
      }
      const perimeterFromName = doc.name ? getPerimeterFromTemplateName(doc.name, perimeters) : null;
      if (perimeterFromName) {
        return perimeterFromName;
      }
      return null;
    })
    .filter((perimeter: any) => perimeter !== null)[0];

  // if no perimeter found, return null
  if (!perimeterName) return null;
  // if a perimeter name is found, try to get the perimeter from the perimeters list
  const perimeter = perimeters.find((perimeter: any) => perimeter.name === perimeterName);
  if (perimeter) return perimeter;

  // if no perimerter found return the default perimeter
  const defaultPerimeter = perimeters.find((perimeter: any) => perimeter.id === "default");
  defaultPerimeter.name = perimeterName;
  return defaultPerimeter;
}; */

/* const getPerimeterFromTemplateName = (name: string, perimeters: any) => {
  const perimeter = perimeters.find((perimeter: any) => perimeter.templates?.includes(name));
  if (perimeter) {
    return perimeter.id;
  }
  return null;
}; */

const formatEsignUrl = (config: IConfiguration, contextId: string) => {
  return getDomainForUrl(config.urls.esign, config) + contextId;
};
/* Object.keys(params).forEach((key) => (params[key] === null || params[key] === undefined ? delete params[key] : null));
  return getDomainForUrl(config.urls.esign, config) + new URLSearchParams(params).toString().replace(/%3B/g, ";");
}; */

// /**
//  * Helper function the find a document perimeter from the template name of documents
//  * @param documents
//  * @param templates
//  * @returns
//  */
// const isTemplateInDocs = (documents: IDocument[], templates: string[] | undefined) => {
//   if (!templates || templates.length === 0) return false;
//   return documents.some((doc: IDocument) => doc.name && templates.includes(doc.name));
// };

/**
 * Processes an array of objects and extracts specific attributes.
 *
 * @param {Array<Object>} ged - An array of objects where each object contains an 'id' and 'ged' property.
 * @returns {Object} An object with two properties:
 *  - `docPfel`: a semicolon-separated string of 'id' values from the input array.
 *  - `ged`: a semicolon-separated string of 'ged' values from the input array.
 */
export const getGedAttribute = (ged: IDocument[]): { docPfel: string; ged: string } => {
  const attr: { docPfel: string; ged: string } = { docPfel: "", ged: "" };
  attr.docPfel = ged.map((el) => "pfel-" + el.idRequest).join(";");
  attr.ged = ged.map((el) => el.isInGed).join(";");
  return attr;
};

/**
 * Ged contains isInGed bool and doc id, we need to merge them with the docs, then the docs get ged attribute
 * @param docs
 * @param ged
 */
export const mergeGedWithDocs = (
  docs: IDocument[],
  ged: { id: string; idRequest: string; isInGed: boolean; token: string }[]
) => {
  return ged.map((gedDoc) => {
    const doc = docs.find((el) => el.id === gedDoc.id);
    if (!doc) console.log("Document not found in ged list");
    return {
      ...doc,
      isInGed: gedDoc.isInGed || false,
      token: gedDoc.token,
      idRequest: gedDoc.idRequest || doc?.idRequest,
    };
  });
};

export default getEsignUrl;
