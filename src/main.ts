import { useEffect, useRef, useState } from "react";
import configStore from "@/stores/configStore";

import "./styles.scss";
import { getDomainForUrl } from "@/utils";
import { Alert } from "@axa-fr/react-toolkit-all";

window.DEMATCG_TIMEOUT = 5000;

interface DematCGProps {
  docEl: any;
  onLoad: (widget: any) => void;
  onFinish: (data: any) => void;
}

declare global {
  interface Window {
    WidgetDemat?: any;
  }
}

const DematCG: React.FC<DematCGProps> = ({ docEl, onLoad, onFinish }) => {
  console.log("dozzzzzzzcEl", docEl);
  const [error, setError] = useState<string>("");
  const { config } = configStore();
  const dematElement = useRef<HTMLDivElement>(null);
  const urlDematWidgetJsWithoutDomain = config?.urls ? config?.urls["popin.demat"] : "";
  const urlDematWidgetJs = getDomainForUrl(urlDematWidgetJsWithoutDomain, config);
  useEffect(() => {
    const dematCgScriptId = "dematcgWidgetScript";
    if (document.getElementById(dematCgScriptId)) {
      dematCGRun();
    } else {
      if (urlDematWidgetJs === "") {
        setError("Url DematJS is not defined");
        throw new Error("Url DematJS is not defined");
        return;
      }
      var script = document.createElement("script");
      var scriptCanceled = false;
      script.id = dematCgScriptId;
      script.addEventListener("load", function (e) {
        clearTimeout(timer);
        if (!scriptCanceled) dematCGRun();
      });
      script.addEventListener("error", function (e) {
        setError("Erreur lors du chargement du widget");
      });
      script.setAttribute("src", urlDematWidgetJs);
      document.body.appendChild(script);

      const timer = setTimeout(() => {
        setError("Le chargement du widget a pris trop de temps");
        scriptCanceled = true;
      }, window.DEMATCG_TIMEOUT);
    }
  }, [urlDematWidgetJs]);

  const dematCGRun = () => {
    if (!window.WidgetDemat?.run) {
      setError("Erreur lors du chargement du widget");
      return;
    }
    console.log("docEl.dematDoc", docEl.dematDoc);
    window.WidgetDemat.run({
      rootNode: dematElement,
      callback: function (widget: any) {
        onLoad(widget);
        widget.on("dematcg-action", function (data: any) {
          onFinish(data);
        });
      },
      params: {
        application: "spoolnet",
        numeroContrat: docEl.contractNumber,
        codeProduit: docEl.codeProduct,
        dematDoc: docEl.dematDoc,
      },
    });
  };

  const sendPaper = () => {
    onFinish({
      action: "papier",
    });
  };

  return (
    <div>
      {error ? (
        <>
          <Alert classModifier="danger" title="Récupération des documents pré-contractuels indisponible.">
            <p>Veuillez réessayer ou remettre les documents pré-contractuels en papier.</p>
          </Alert>
          <p className="mt10 txt-r">
            <button type="button" className="btn af-btn" onClick={sendPaper} data-testid="dematcg-button-paper">
              Remise des documents pré-contractuels en papier
            </button>
          </p>
        </>
      ) : (
        <div ref={dematElement}></div>
      )}
    </div>
  );
};

export default DematCG;
import React, { ReactNode, useState } from "react";
import CustomModal from "./customModal";
import { Step, Steps } from "@axa-fr/react-toolkit-form-steps";
import DematCG from "./dematCG";
import Alert from "@axa-fr/react-toolkit-alert";
import "./demat.scss";

type DematCGCompleteModalProps = {
  isOpen: boolean;
  title: string;
  document: any;
  onCancel: () => void;
  onClose: () => void;
  //onDematActionAsync: (action: string) => Promise<any>;
  step1Title?: string;
  step2Title?: string;
  step2Content?: ReactNode;
};

const DematCGModalCloseTimeout = 6000;

const DematCGCompleteModal: React.FC<DematCGCompleteModalProps> = ({
  isOpen,
  document,
  title,
  onCancel,
  onClose,
  // onDematActionAsync,
  step1Title = "Remise des documents pré-contractuels",
  step2Title = "Envoi du Devis",
  step2Content,
}) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [widgetDemat, setWidgetDemat] = useState<any>(null);
  const [dematAction, setDematAction] = useState<any>(null);

  const onDematCGLoad = (widget: any) => {
    setWidgetDemat(widget);
    // TODO: set dematCG action send document info to paper to the api");
  };

  const onDematCGFinish = async (data: any) => {
    setDematAction(data.action);
    setCurrentStep(2);
    setTimeout(() => {
      console.warn("dematCG closed bro");
      onClose();
    }, DematCGModalCloseTimeout);
  };

  const onSubmit = () => {
    if (currentStep == 1) {
      widgetDemat?.notify("send");
    } else {
      onClose();
    }
  };

  const notifMessage =
    dematAction === "papier" ? "Conditions Générales remises en papier" : "Conditions Générales envoyées par email";

  return (
    <CustomModal
      title={title}
      isOpen={isOpen}
      onCancel={onCancel}
      onClose={onCancel}
      onSubmit={onSubmit}
      //submitTitle={submitTitle}
      cancelTitle="Annuler"
      cancelClassName="btn af-btn--link af-btn--left af-btn--back"
      className="dematcg-modal af-modal"
    >
      <div data-testid="demat-cg-complete-modal">
        <Steps>
          <Step id="demat-step-1" number="1" mode={currentStep == 1 ? "active" : "disabled"} title={step1Title} />
          <Step id="demat-step-2" number="2" mode={currentStep == 2 ? "active" : "disabled"} title={step2Title} />
        </Steps>
        {currentStep == 1 ? <DematCG docEl={document} onLoad={onDematCGLoad} onFinish={onDematCGFinish} /> : null}
        {currentStep == 2 ? (
          <div>
            <Alert classModifier="success" title={notifMessage}></Alert>
            {step2Content ? <div className="step-content">{step2Content}</div> : null}
          </div>
        ) : null}
      </div>
    </CustomModal>
  );
};

export default DematCGCompleteModal;

je veux svoir lutulite de ca     application: "spoolnet",
        numeroContrat: docEl.contractNumber,
        codeProduit: docEl.codeProduct,
        dematDoc: docEl.dematDoc, est ce que cest donner dont envoyer a un service ?

