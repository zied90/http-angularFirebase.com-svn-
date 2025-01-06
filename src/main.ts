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
interface TemplateFormData {
  name: string;
  file: File | null;
  tags: string;
  branch: string;
  ecmDocumentType: string;
}
const INITIAL_FORM_STATE: TemplateFormData = {
  name: "",
  file: null,
  tags: "",
  branch: "",
  ecmDocumentType: "",
};
const ACCEPTED_FILE_TYPE = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export const AjoutModele: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [formData, setFormData] = useState<TemplateFormData>(INITIAL_FORM_STATE);
  const navigate = useNavigate();
  const location = useLocation();
  const [disabledBtnAdd, setDisabledBtnAdd] = useState<boolean>(false);
  const { call: uploadPost } = useDelayApi(adminTemplateAddRoute);
  const tags = searchParams.get("tags");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await uploadPost({
        template: formData.file,
        tags: formData.tags,
        branche: formData.branch,
        ecmDocumentType: formData.ecmDocumentType,
      });
      navigate(location.pathname, { replace: true });
      setFormData(INITIAL_FORM_STATE);
      setFileValue(null);
      formRef?.reset();
    } catch (error) {
      throw error;
    }
  };
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === ACCEPTED_FILE_TYPE) {
      setFileValue(file);
      setFormData((prev) => ({ ...prev, file }));
    }
  }, []);
  function updateFormDatas(ref?: any) {
    let fixedRef = ref?.target?.form || ref;

    if (formRef || fixedRef) {
      const formDatasObject = Object.fromEntries(new FormData(formRef || fixedRef).entries());
      setFormData((prev) => ({ ...prev, ...formDatasObject }));
    }
  }
  
  const onRef = (ref: HTMLFormElement) => {
    setFormRef(ref);
    // add a DOM observer to trigger updateFormData on load, its an ugly fix for the form button générer not being refreshed on load
    const observer = new MutationObserver(
      debounce((mutations: MutationRecord[], observer: MutationObserver) => {
        updateFormDatas(ref);
      }, 100)
    );
    setTimeout(() => {
      observer.disconnect();
    }, 6000);
    observer.observe(ref, { childList: true, subtree: true });
  };
  useEffect(() => {
    const isFormValid = !!(fileValue && tags && formData.branch && formData.ecmDocumentType);
    setDisabledBtnAdd(!isFormValid);
  }, [fileValue, tags, formData.branch, formData.ecmDocumentType]);
  useEffect(() => {
    if (tags) {
      setFormData((prev) => ({ ...prev, tags }));
    }
  }, [tags]);
  return (
    <>
      <h2 className="title">Ajouter un modèle</h2>
      <Form onSubmit={handleSubmit} onChange={updateFormDatas} onInit={updateFormDatas} onRef={onRef} className="template-form">
        <div className="template-form__container">
          <div className="template-form__sidebar">
            <Filtres className="filters-section" />
          </div>
          <div className="template-form__main-content">
            <div className="template-form__group">
              <TypesDocuments className="form-field" />
            </div>
            <div className="template-form__group">
              <Branches className="form-field" />
            </div>
            <div className="template-form__group template-form__group--with-label">
              <label className="template-form__label template-form__label--required">Modèle</label>
              <ModeleImport onChange={handleFileChange} file={fileValue} />
            </div>
            <div className="template-form__actions">
              <Button classModifier="primary" type="submit" disabled={disabledBtnAdd}>
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
