  const openAgenceEdit = async () => {
    try {
      const result = await createModal((resolve, reject) => <AgenceEdit agence={agence} onCancel={reject} onSave={resolve} />, {
        title: "Modification coordonnées agence",
        className: "modal-agence-edit",
      });
      setAgence(result as AgenceType);
    } catch (e) {
      console.info("Agence modification canceled, reason:", e);
    }
  };

import FileUpload from "@/Admin/Components/FileUpload";
import { FC, useState } from "react";
import HabilitationsUsersList from "./HabilitationsUsersList";
import { User } from "@/Admin/types/User.type";
import { UserListConverter } from "@/Admin/adminUtils/UserListConverter";
import "./HabilitationsFromList.scss";
import { adminHabilitationListDeployRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import Loader from "@/toolkit/Components/Loader";
import HabilitationResults from "./HabilitationResult/HabilitationResults";
import useModal from "@/toolkit/Components/Modal/useModal";

export type HabilitationsFromListProps = {
  className?: string;
};

const ALLOWED_FORMATS = [".xls", ".xlsx", ".csv", ".txt"];

export const HabilitationsFromList: FC<HabilitationsFromListProps> = ({ className = ""}) => {
  const [file, setFile] = useState<File | null>(null);
  const converter = new UserListConverter();
  const [users, setUsers] = useState<User[]>([]);
  const { loaded, call: habiliterList, data } = useDelayApi(adminHabilitationListDeployRoute);
  const [showResults, setShowResults] = useState<boolean>(false);
  const { createModal, deleteConfirmModal } = useModal();
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let file: File = e.target.files[0];
      setFile(file);
      if (ALLOWED_FORMATS.includes(file.name.substring(file.name.lastIndexOf(".")))) {
        const users = await converter.parseInput(file);
        setUsers(users);
      }
    }
  };

  const importFromClipboard = async () => {
    const clipboardData = await navigator.clipboard.readText();
    const users = await converter.parseInput(clipboardData);
    setUsers(users);
  };

  const uploadHabilitations = async () => {
    try {
      const file = converter.userListToCSV(users);
      await habiliterList({ file });
      setShowResults(true);
    } catch (e) {
      throw e;
    }
  };
  const handleReset = () => {
    setShowResults(false);
    setFile(null);
    setUsers([]);
   };
   console.log("dd",data)
  return (
    <div className="HabilitationsFromList">
      <Loader loaded={loaded} />
      {!showResults ? (
        <>
          <div className="row">
            <div className="col">
              <FileUpload
                onChange={onChange}
                file={file}
                allowedFormats={ALLOWED_FORMATS}
                explicationText={
                  <>
                    Téléchargez un fichier Excel, CSV, ou Texte pour importer des utilisateurs. <br />
                    Les fichiers CSV ou Texte, sont formatés avec des tabulations ou des virgules (,) ou (;) pour séparer les colonnes.
                  </>
                }
              />
            </div>
            <div className="col flex-col">
              <button type="button" className="btn btn--primary" onClick={importFromClipboard}>
                <i className="icon icon-clipboard"></i> Importer depuis le Presse-Papier
              </button>
              <button type="button" className="btn btn--success mt-a" onClick={uploadHabilitations}>
                <i className="icon icon-arrow-up"></i> Envoyer les Habilitations
              </button>
            </div>
          </div>
          <div className="Habilitation--list mt-md">
            <HabilitationsUsersList users={users} />
          </div>
        </>
      ) : (
        <HabilitationResults data={data} onReset={handleReset} />
      )}
    </div>
  );
};
 comment faire dans mon exemple pour afficher <HabilitationResults data={data} onReset={handleReset} /> dans modale  createModal   et voci le fooks import { ReactNode } from "react";
import { Root } from "react-dom/client";
import { create, InstanceProps } from "react-modal-promise";

import Modal, { Props as ModalProps } from "./Modal";
import ModalConfirm, { Props as ModalConfirmProps } from "./ModalConfirm";

const useModal = () => {
  /**
   * Create a modal with the given props, and render it into the document body.
   * @param {CreateModalArgs}  - isOpen - boolean - whether the modal is open or not
   *
   * @example :
   * const { createModal } = useModal();
   * const modal = createModal(
   *  (resolve, reject) => <ModalConfirm resolve={resolve} reject={reject}>,
   * {
   * isOpen: true,}
   */
  const createModal = async (modalContent: (resolve: any, reject: any) => React.ReactNode, modalParams: ModalProps = {}) => {
    const MyModal: React.FC<InstanceProps<unknown>> = ({ isOpen, onResolve, onReject }) => {
      const resolve = (value: any) => {
        onResolve(value);
        document.documentElement.style.overflow = "";
      };

      const reject = (reason?: any) => {
        onReject(reason);
        document.documentElement.style.overflow = "";
      };

      return (
        <Modal open={isOpen} {...modalParams} onClose={reject}>
          {modalContent(resolve, reject)}
        </Modal>
      );
    };
    const myPromiseModal = create(MyModal);
    document.documentElement.style.overflow = "hidden";
    return myPromiseModal({ ...modalParams, isOpen: true });
  };

  const createConfirmModal = async (modalContent: ReactNode, _modalParams: ModalConfirmProps = {}) => {
    return createModal((resolve, reject) => {
      return (
        <ModalConfirm resolve={resolve} reject={reject} {..._modalParams}>
          {modalContent}
        </ModalConfirm>
      );
    }, _modalParams);
  };

  const deleteConfirmModal = async (message: React.ReactNode, deleteAction: () => Promise<unknown>, options?: any) => {
    try {
      let result = await createConfirmModal(message, {
        ConfirmButton: ({ onClick }) => (
          <button onClick={onClick} className="btn btn--danger icon icon-trash" autoFocus data-testid="id-modal-confirm-button-delete">
            Supprimer
          </button>
        ),
        ...options,
      });
      await deleteAction();
      return result;
    } catch (e) {
      throw e;
    }
  };

  /** function that create a modal with simply pass the Component  as argument and the props as other argument,
   * it uses createModal function to create the modal and return the result of the modal
   *
   */

  const createQuickModal = async (Component: React.FC<any>, componentProps: any, modalProps: any) => {
    return createModal((resolve, reject) => {
      return <Component resolve={resolve} reject={reject} {...componentProps} />;
    }, modalProps);
  };

  const closeModal = (root: Root) => {
    root.unmount();
  };

  return {
    createConfirmModal,
    createModal,
    closeModal,
    createQuickModal,
    deleteConfirmModal,
  };
};

export default useModal;
