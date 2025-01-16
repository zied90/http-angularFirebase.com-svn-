import FileUpload from "@/Admin/Components/FileUpload";
import { FC, useState } from "react";
import HabilitationsUsersList from "./HabilitationsUsersList";
import { User } from "@/Admin/types/User.type";
import { UserListConverter } from "@/Admin/adminUtils/UserListConverter";
import "./HabilitationsFromList.scss";
import { adminHabilitationListDeployRoute } from "@/Api/ApiRoutes";
import { useDelayApi } from "@/hooks/useApi";
import Loader from "@/toolkit/Components/Loader";
import StatusCard from "@/Admin/Components/StatusCard";

export type HabilitationsFromListProps = {
  className?: string;
};

const ALLOWED_FORMATS = [".xls", ".xlsx", ".csv", ".txt"];

export const HabilitationsFromList: FC<HabilitationsFromListProps> = ({ className = "" }) => {
  const [file, setFile] = useState<File | null>(null);
  const converter = new UserListConverter();
  const [users, setUsers] = useState<User[]>([]);
  const { loaded, call: habiliterList,data } = useDelayApi(adminHabilitationListDeployRoute);

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

  const uploadHabilitations = async() => {
   try{
    const csv = converter.userListToCSV(users);
     await habiliterList({csv});
   }catch(e){
    throw e
   }
    
  };
console.log(data,'oooiiii')

  return (
    <div className="HabilitationsFromList">
      <Loader loaded={loaded} />
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
      <div className="status-cards">
<StatusCard
       type="error"
       count={3}
       title="Échecs"
       description="habilitations échouées"
     />
<StatusCard
       type="success"
       count={12}
       title="Succès"
       description="habilitations réussies"
     />
</div>
      <div className="Habilitation--list mt-md">

        <HabilitationsUsersList users={users} />
      </div>
    </div>
  );
};
  comment faire   afficher que  les 2 card   si ona data  et dans lexemple data represente retour api  {
    "successUsers": [],
    "failedUsers": [
        {
            "userNumber": "F146885",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146884",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146883",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146882",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146853",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146844",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146808",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146806",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146804",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146803",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146792",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146790",
            "reason": "User already deployed"
        },
        {
            "userNumber": "F146788",
            "reason": "User already deployed"
        }
    ]
} que je vais passer a la card cad resultat 
