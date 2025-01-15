import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "ts-debounce";
import Form from "@/toolkit/Components/Form/Form";
import Filtres from "./tags";
import ModeleImport from "./importModele";
import Button from "@/toolkit/Components/Form/Button";
import "./AjoutModele.scss";
import { useDelayApi } from "@/hooks/useApi";
import { adminTemplateAddRoute } from "@/Api/ApiRoutes";
import TypesDocuments from "@/pages/Generer/TypesDocuments";
import Branches from "@/pages/Generer/Branches";
import Workspaces from "../workspace";
import Types from "../type";
import { FORM_CONSTANTS, INITIAL_FORM_STATE } from "../constants";
import { useFormValidation } from "../hooks/useFormValidation";
import Loader from "@/toolkit/Components/Loader";

export const AjoutModele: React.FC = () => {
  const [formState, setFormState] = useState({
    formRef: null as HTMLFormElement | null,
    fileValue: null as File | null,
    formData: INITIAL_FORM_STATE,
    isSubmitting: false,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { loaded,call: uploadPost } = useDelayApi(adminTemplateAddRoute);
  const tags = searchParams.get("tags");

  const isFormValid = useFormValidation(formState.formData, formState.fileValue);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || formState.isSubmitting) {
      return;
    }
    try {
      setFormState((prev) => ({ ...prev, isSubmitting: true }));
      await uploadPost({
        formData: formState.formData,
      });
      setFormState((prev) => ({
        ...prev,
        formData: INITIAL_FORM_STATE,
        fileValue: null,
        isSubmitting: false,
      }));
      formState.formRef?.reset();
      navigate(location.pathname, { replace: true });
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        isSubmitting: false,
      }));
    }
  };
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === FORM_CONSTANTS.ACCEPTED_FILE_TYPE) {
      setFormState((prev) => ({
        ...prev,
        fileValue: file,
        formData: { ...prev.formData, file },
      }));
    }
  }, []);
  const updateFormDatas = useCallback(
    (ref?: any) => {
      const fixedRef = ref?.target?.form || ref;
      if (formState.formRef || fixedRef) {
        const formDatasObject = Object.fromEntries(new FormData(formState.formRef || fixedRef).entries());
        setFormState((prev) => ({
          ...prev,
          formData: { ...prev.formData, ...formDatasObject },
        }));
      }
    },
    [formState.formRef]
  );
  const onRef = useCallback(
    (ref: HTMLFormElement) => {
      setFormState((prev) => ({ ...prev, formRef: ref }));
      // Observer pour mise à jour initiale
      const observer = new MutationObserver(
        debounce((mutations: MutationRecord[], observer: MutationObserver) => {
          updateFormDatas(ref);
        }, FORM_CONSTANTS.DEBOUNCE_DELAY)
      );
      setTimeout(() => {
        observer.disconnect();
      }, FORM_CONSTANTS.OBSERVER_TIMEOUT);
      observer.observe(ref, { childList: true, subtree: true });
    },
    [updateFormDatas]
  );

  useEffect(() => {
    if (tags) {
      setFormState((prev) => ({
        ...prev,
        formData: { ...prev.formData, tags },
      }));
    }
  }, [tags]);
  return (
    <>
      <h2 className="title">Ajouter un modèle</h2>
      <Loader loaded={loaded}>
      <Form
        onSubmit={handleSubmit}
        onChange={updateFormDatas}
        onInit={updateFormDatas}
        onRef={onRef}
        className="template-form"
        data-testid="form-id"
        aria-label="Formulaire d'ajout de modèle"
      >
        <div className="template-form__container">
          <div className="template-form__sidebar">
            <Filtres className="filters-section" />
          </div>
          <div className="template-form__main-content">
            <div className="template-form__group">
              <TypesDocuments className="form-field" data-testid="types-documents" />
            </div>
            <div className="template-form__group">
              <Branches className="form-field" data-testid="branches" />
            </div>
            <div className="template-form__group">
              <Workspaces className="form-field" data-testid="workspaces" />
            </div>
            <div className="template-form__group">
              <Types className="form-field" data-testid="types" />
            </div>
            <div className="template-form__group template-form__group--with-label">
              <label className="template-form__label template-form__label--required" htmlFor="modele-import">
                Modèle
              </label>
              <ModeleImport onChange={handleFileChange} file={formState.fileValue} data-testid="modele-import" />
            </div>
            <div className="template-form__actions">
              <Button classModifier="primary" type="submit" disabled={!isFormValid || formState.isSubmitting} data-testid="submit-button">
                {formState.isSubmitting ? "Enregistrement..." : "Enregistrer"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
      </Loader>
    </>
  );
};
export default AjoutModele; maintenat fait le test unitare a ca 
