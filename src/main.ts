export const extractNameParts = (fullName?: string) => {
    if (!fullName) return { firstName: "", lastName: "" };
    const parts = fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
   };
   export const formatName = (firstName: string, lastName: string) => {
    return `${firstName.toUpperCase()} ${lastName.toUpperCase()}`.trim();
   };
   export const extractAuthorities = (authorities: string | string[] | undefined) => {
    if (Array.isArray(authorities)) {
      return authorities[0] || "";
    }
    return authorities || "";
   };


import { useEffect, useState,  } from "react";
import TemplateFormData from "../types/Template.type";

export const useFormValidation = (formData: TemplateFormData, fileValue: File | null) => {
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    const isFormValid = !!(
      fileValue &&
      formData.tags &&
      formData.branch &&
      formData.ecmDocumentType &&
      formData.workspaceId &&
      formData.type
    );
    setIsValid(isFormValid);
  }, [fileValue, formData]);
  return isValid;
};  donne le test de ca 
