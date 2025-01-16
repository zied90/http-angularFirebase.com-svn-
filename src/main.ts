/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomModal from "@/components/modals/customModal";
import { Loader } from "@axa-fr/react-toolkit-all";
import React, { useState, useEffect, useContext } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { useQuery } from "react-query";
import { downloadLog } from "@/api/apifunctions/logs/logs";
import { GlobalAlertContext } from "@/components/GlobalAlert/GlobalAlertContext";
import { AlertTypeEnum } from "@/components/GlobalAlert/Alert.type";
loader.config({ monaco: (window as any).monaco });
interface childComponentProps {
  id: number | null;
  onClose: () => void;
  onChangeValueReplay: (data: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isOpen: boolean;
}
export const Replay: React.FC<childComponentProps> = ({
  id,
  onClose,
  onChangeValueReplay,
  onSubmit,
  isLoading,
  isOpen,
}) => {
  const [value, setValue] = useState<string>("");
  const [logID, setLogID] = useState<number | null>(null);
  const { addAlert } = useContext(GlobalAlertContext);
  useEffect(() => {
    setLogID(id);
  }, [id]);
  const { isFetching } = useQuery(["replay", logID], () => downloadLog(logID), {
    onSuccess({ successData }) {
      setValue(successData);
      onChangeValueReplay(successData);
    },
    onError: (error:any) => {
      const message = error?.response?.data?.message  || " Aucun flux disponible pour ce log  ! "; 
      addAlert({
        message: message,
        type: AlertTypeEnum.error,
      });
      setValue("");

    },
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!logID,
  });
  return (
    <CustomModal
      title="Flux XML"
      isOpen={isOpen && value !== ""}
      onClose={onClose}
      dataTestid="modal-download"
      submitTitle="Replay"
      onSubmit={onSubmit}
      isForm={true}
    >
      <Loader
        mode={isFetching || isLoading ? "get" : "none"}
        className="af-loader"
        text={isLoading ? "Rejeu en cours" : ""}
      >
        <Editor
          height="500px"
          width="550px" 
          defaultLanguage="xml"
          value={value}
          onChange={(e: any) => {
            onChangeValueReplay(e);
          }}
          options={{
            minimap: { enabled: false },
            automaticLayout: true,
            readOnly: false,
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </Loader>
    </CustomModal>
  );
};


import Modal from "@axa-fr/react-toolkit-modal-default";
import Button from "@axa-fr/react-toolkit-button";
import "./styles.scss";

interface CustomModalProps {
  isOpen?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  title: string;
  onCancel?: () => void;
  onClose: () => void;
  onSubmit?: () => void;
  submitTitle?: string;
  cancelTitle?: string;
  children: React.ReactNode;
  dataTestid?: string;
  hasFooter?: boolean;
  isForm?: boolean;
}

export default function CustomModal({
  isOpen = false,
  isDisabled = false,
  isError = false,
  isForm = false,
  title,
  onCancel,
  onClose,
  onSubmit,
  submitTitle,
  cancelTitle,
  children,
  dataTestid,
  hasFooter = true,
}: CustomModalProps) {
  const alertClass = isError ? "alert-danger" : "alert-primary";
  const iconClass = isError
    ? "glyphicon-exclamation-sign"
    : "glyphicon-info-sign";

  return (
    <Modal isOpen={isOpen} onOutsideTap={onClose}>
      <div data-testid={dataTestid}>
        <Modal.HeaderBase id="headerId" classModifier={isError ? "error" : ""}>
          <h4 data-testid="modal-test-title">{title}</h4>
          <button
            className="af-modal__header-close-btn"
            type="button"
            aria-label="Close"
            onClick={onClose}
            data-testid="modal-button-x"
          >
            <span className="glyphicon glyphicon-close" />
          </button>
        </Modal.HeaderBase>
        <Modal.Body>
          {!isForm? (
            <div className={`alert ${alertClass} modal-alert`} role="alert">
              <span
                className={`glyphicon ${iconClass}`}
                aria-hidden="true"
              ></span>
              {children}
            </div>
          ) : (
            children
          )}
        </Modal.Body>
        {hasFooter ? (
          <Modal.Footer>
            {cancelTitle && (
              <button
                className="btn af-btn af-btn--reverse"
                aria-label="Cancel"
                type="button"
                onClick={onCancel}
                data-testid="modal-cancel-button"
              >
                {cancelTitle}
              </button>
            )}
            {submitTitle && (
              <Button
                classModifier={isDisabled ? "disabled" : ""}
                disabled={isDisabled}
                type="submit"
                onClick={onSubmit}
                data-testid="modal-submit-button"
              >
                {submitTitle}
              </Button>
            )}
          </Modal.Footer>
        ) : (
          <div />
        )}
      </div>
    </Modal>
  );
}
  je veux que le  flux xml  prend tout le contenu de modal  est si il est grad  on fait le scorl vertical ou horzontal 
