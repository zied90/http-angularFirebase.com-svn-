import { FC,useMemo, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";

interface Props {
  className?: string;
}
// TODO: Appel API dès que l'endpoint est prêt
const Workspaces: FC<Props> = ({ className = "" }) => {

  const [workspaces] = useState<any>([{"id":1,name:"Nationale"},{"id":2,name:"Axa part"}]);
  const workspaceDatas = useMemo(
    () => [{ label: "Sélectionnez un workspace", value: "" }, ...(workspaces || [])?.map(({ name, id }: any) => ({ label: name, value: id }))],
    [workspaces]
  );

  return workspaces && workspaces.length ? (
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


import { FC, useMemo, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";

interface Props {
  className?: string;
}
// TODO: Appel API dès que l'endpoint est prêt
const Types: FC<Props> = ({ className = "" }) => {

  const [types] = useState<any>([{"id":"CTR",name:"Contrat"},{"id":"CLT",name:"Client"}]);
  const typeDatas = useMemo(
    () => [{ label: "Sélectionnez un type", value: "" }, ...(types || [])?.map(({ name, id }: any) => ({ label: name, value: id }))],
    [types]
  );

  return types && types.length ? (
    <FormItem
      id="id-Type-template"
      labelStyle={className}
      type="select"
      label="Type"
      name="type"
      placeholder="Sélectionner un Type"
      required={true}
      visibleValue={types.length === 1 ? types[0].name : undefined}
      value={types.length === 1 ? types[0].id : undefined}
      datas={typeDatas}
    />
  ) : null;
};

export default Types;  fait le meme proncipe pour ces 2 compsent
