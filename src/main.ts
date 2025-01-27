import { FC, useMemo, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";
import { useDelayApi } from "@/hooks/useApi";
import { adminProfilesRoute } from "@/Api/ApiRoutes";
interface Props {
 className?: string;
 onChange?: (value: string) => void;
 value?: string;
}
const Profiles: FC<Props> = ({ className = "", onChange, value }) => {
    const { call: loadAllProfiles } = useDelayApi(adminProfilesRoute);
 const [profiles] = useState<any>([
   { "id": "ADMIN", name: "ADMIN" },
   { "id": "AGT", name: "AGT" }
 ]);
 const profileDatas = useMemo(
   () => [
     { label: "Sélectionnez un profile", value: "" },
     ...profiles.map(({ name, id }: any) => ({ label: name, value: id }))
   ],
   [profiles]
 );
 const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
   onChange?.(event.target.value);
 };
 return profiles && profiles.length ? (
<FormItem
     id="id-profile"
     labelStyle={className}
     type="select"
     label="Profile"
     name="authorities"
     placeholder="Sélectionner un Profile"
     required={true}
     visibleValue={profiles.length === 1 ? profiles[0].name : undefined}
     value={value || (profiles.length === 1 ? profiles[0].id : "")}
     datas={profileDatas}
     onChange={handleChange}
   />
 ) : null;
};
export default Profiles;   loadAllProfilesretourne la liste des profiler commentr faitre pour  se debarsser  [
   { "id": "ADMIN", name: "ADMIN" },
   { "id": "AGT", name: "AGT" }
 ])
 et sur un autre exmple jai trouver ca  pour la gestion des branches

import { FC, useEffect, useMemo, useState } from "react";
import { useDelayApi } from "@/hooks/useApi";
import { allBranchesRoute, templateBrancheRoute } from "@/Api/ApiRoutes";
import FormItem from "@/toolkit/Components/Form/FormItem";

interface Props {
  className?: string;
  id?: string | undefined;
}

const Branches: FC<Props> = ({ className = "", id }) => {
  const { call: loadTemplateBranches } = useDelayApi(templateBrancheRoute, { id });
  const { call: loadAllBranches } = useDelayApi(allBranchesRoute);
  const [branches, setBranches] = useState<any>(null);
  const branchesDatas = useMemo(
    () => [{ label: "Sélectionnez une branche", value: "" }, ...(branches || [])?.map(({ name, id }: any) => ({ label: name, value: id }))],
    [branches]
  );

  useEffect(() => {
    (async () => {
      let hasBranches = false;
      if (id) {
        const templateBranches = await loadTemplateBranches({ id });
        if (templateBranches && templateBranches.length) {
          hasBranches = true;
          setBranches(templateBranches);
        }  
      }
      if(!hasBranches) {
        const allBranches = await loadAllBranches();
        setBranches(allBranches);
      }
    })();
  }, [id, loadAllBranches, loadTemplateBranches]);

  return branches && branches.length ? (
    <FormItem
      id="id-courrier-branche"
      labelStyle={className}
      type={branches.length === 1 ? "viewhidden" : "select"}
      label="Branche"
      name="branch"
      placeholder="Sélectionner une branche"
      required={true}
      visibleValue={branches.length === 1 ? branches[0].name : undefined}
      value={branches.length === 1 ? branches[0].id : undefined}
      datas={branchesDatas}
    />
  ) : null;
};

export default Branches;

