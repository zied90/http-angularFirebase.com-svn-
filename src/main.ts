
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "ts-debounce";
import Form from "@/toolkit/Components/Form/Form";
import Filtres from "./tags";
import ModeleImport from "./importModele";
import Button from "@/toolkit/Components/Form/Button";
import "./AjoutModele.scss";
import { useDelayApi } from "@/hooks/useApi";
import { adminTemplateAddRoute } from "@/Api/ApiRoutes";
import { GlobalAlertContext } from "@/toolkit/Components/GlobalAlert/GlobalAlertContext";
import { AlertTypeEnum } from "@/toolkit/Components/Alert/Alert.type";
import TypesDocuments from "@/pages/Generer/TypesDocuments";
import Branches from "@/pages/Generer/Branches";

interface TemplateFormData {
  name: string;
  file: File | null;
  tags: string[];
}
export const AjoutModele: React.FC = () => {
  const [serachParams] = useSearchParams();
  const { addAlert } = useContext(GlobalAlertContext);
  const [formRef, setFormRef] = useState<HTMLFormElement | null>(null);
  const [fileValue, setFileValue] = useState<File | null>(null);
  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    file: null,
    tags: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [disabledBtnAdd, setDisabledBtnAdd] = useState<boolean>(false);
  const { call: uploadPost } = useDelayApi(adminTemplateAddRoute);
  const tags = serachParams.get("tags");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      addAlert({
        message: "Veuillez sélectionner un fichier Word.",
        type: AlertTypeEnum.error,
      });
      return;
    }

    try {
      const template = formData.file;
      await uploadPost({ template, tags });
      navigate(location.pathname, { replace: true });
      setFormData({
        name: "",
        file: null,
        tags: [],
      });
      setFileValue(null);
    } catch (error) {
      throw error;
    }
  };

  // Gestion du changement de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFileValue(file);
      setFormData({ ...formData, file });
    }
  };

  useEffect(() => {
    setDisabledBtnAdd(!(fileValue && tags));
  }, [fileValue, tags]);
  function updateFormDatas(ref?: any) {
    let fixedRef = ref?.target?.form || ref;

    if (formRef || fixedRef) {
      const formDatasObject = Object.fromEntries(new FormData(formRef || fixedRef).entries());
      console.log("formDatasObject", formDatasObject);
      // setFormDatas((formDatas: any) => formDatasObject);
    }
  }
  const onRef = (ref: HTMLFormElement) => {
    setFormRef(ref);
    // // add a DOM observer to trigger updateFormData on load, its an ugly fix for the form button générer not being refreshed on load
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
  return (
    <>
      <h2 className="center-text">Ajouter un modèle</h2>
      <Form onSubmit={handleSubmit} onChange={updateFormDatas} onInit={updateFormDatas} onRef={onRef}>
        <div className="flex-container">
          <Filtres className="filterA" />
          <div>
            <div style={{ marginBottom: "1em", marginLeft: "1em" }}>
              <TypesDocuments className="label-style" />
            </div>
            <div style={{ marginBottom: "1em", marginLeft: "1em" }}>
              <Branches className="label-style" />
            </div>
            <div>
              <div style={{ display: "flex", marginBottom: "1em", marginLeft: "1em" }}>
                <div style={{ width: "174px" }}>
                  Modéle <span style={{ color: "red" }}> *</span>
                </div>
                <ModeleImport onChange={handleFileChange} file={fileValue} />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "14em" }}>
              <Button classModifier="primary" type="submit">
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};
/*
    
@import "../../toolkit/styles/variables.scss";
@import "../../toolkit/styles/functions";
.BtnDownloadModeleImport {
  .btn-upload {
    border: 1px solid #000;
    padding: 0.3em 0.5em;
    box-shadow: 1px 1px 3px 2px #0000001f;
  }
}
.af-form {
  justify-content: center;
  align-items: center;
}
.modele-content {
  min-width: 500px;
  position: relative;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  min-height: 397px;
}

.toolbar {
  --border-radius: 4px;
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background: #fff;

  &__header {
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    background: $primary-color;
    color: #fff;
    padding: size($vPaddings $hPaddings);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__body {
    padding: size($vPaddingsM $hPaddings);
  }
 
}
.flex-container {
  display: flex;
  
  
}
.center-text {
  text-align: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  margin: 2em;
}
.label-style{
  width: 160px;
}
.filterA{
  margin-top: 0em;
}
