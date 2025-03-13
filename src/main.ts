[
    {
        "id": 1,
        "name": "nationale"
    },
    {
        "id": 2,
        "name": "axa partenaire"
    },
    {
        "id": 517,
        "name": "retraite collective"
    },
    {
        "id": 518,
        "name": "prevention_collective"
    },
    {
        "id": 519,
        "name": "rentes individuelles"
    },
    {
        "id": 520,
        "name": "transverse"
    }
]   je veux function en ts: Changer le formalisme pour avoir un affichage user friendly (1ere lettre majuscule & sans underscore) 
  import { FC, useMemo, useEffect, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";
import { useDelayApi } from "@/hooks/useApi";
import { allWorkspacesRoute } from "@/Api/ApiRoutes";
import { Workspace } from "../types/Workspace.type";

interface Props {
  className?: string;
}
const Workspaces: FC<Props> = ({ className = "" }) => {
  const { call: loadWorkspaces } = useDelayApi(allWorkspacesRoute);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response: Workspace[] = await loadWorkspaces();
        setWorkspaces(response);
      } catch (error) {
        console.error("Erreur lors du chargement des workspaces :", error);
      }
    })();
  }, [loadWorkspaces]);
  const workspaceDatas = useMemo(
    () => [{ label: "Sélectionnez un workspace", value: "" }, ...workspaces.map(({ name, id }) => ({ label: name, value: id }))],
    [workspaces]
  );
  return workspaces.length ? (
    <FormItem
      id="id-workspace"
      labelStyle={className}
      type="select"
      label="Workspace"
      name="workspaceId"
      placeholder="Sélectionner un Workspace"
      required={true}
      visibleValue={workspaces.length === 1 ? workspaces[0].name : undefined}
      value={workspaces.length === 1 ? workspaces[0].id : undefined}
      datas={workspaceDatas}
    />
  ) : null;
};
export default Workspaces;
