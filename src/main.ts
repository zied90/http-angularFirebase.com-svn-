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
import React from "react";
import StatusCard from "@/Admin/Components/StatusCard";
import FailedUsersTable from "../HabilitationFailedUsersList/FailedUsers";

export type HabilitationResultsProps = {
  data: {
    failedUsers: any[];
    successUsers: any[];
  };
  onReset: () => void;
};
const HabilitationResults: React.FC<HabilitationResultsProps> = ({ data, onReset }) => {
  return (
    <div className="habilitation-results">
      <button
        className="btn btn--reverse"
        onClick={onReset}
        type="button"
        id="id-address-add-new"
        data-testid="Fermer-importer-un-nouveau-document"
      >
        Importer un nouveau document
      </button>
      <div className="status-cards">
        <StatusCard type="error" count={data.failedUsers.length} title="Échecs" description="habilitations échouées" />
        <StatusCard type="success" count={data.successUsers.length} title="Succès" description="habilitations réussies" />
      </div>
      <FailedUsersTable users={data.failedUsers} />
    </div>
  );
};
export default HabilitationResults;

import React from "react";
import "./FailerUsersList.scss";
interface FailedUser {
  userNumber: string;
  reason: string;
}

interface FailedUsersTableProps {
  users: FailedUser[];
  className?:string
}

export const FailedUsersTable: React.FC<FailedUsersTableProps> = ({ users,className }) => {
  if (!users.length) return null;

  return (
    <div className={`HabilitationsFailedList ${className}`}>
      <h3 className="failed-users-table__title">Utilisateurs en échec ({users.length})</h3>
      <table className="table-panel">
        <colgroup>
          <col className="col-identifiant" />
          <col className="col-raison" />
        </colgroup>
        <thead>
          <tr>
          <th>Identifiant</th>
          <th>Raison de l'échec</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={`${user.userNumber}-${index}`}>
              <td>{user.userNumber}</td>
              <td>{user.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

.HabilitationsFailedList {
  .table-panel {
    thead th {
      text-align: left;
    }
  }
}



export default FailedUsersTable;
pour les user failer cest un tableau ca peux avoir 1000 user failer du cous je veux scroller sur cette liste 
