import { FC, useEffect, useMemo, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";
import { useDelayApi } from "@/hooks/useApi";
import { allProfilesRoute } from "@/Api/ApiRoutes";
import { Profile } from "../types/Profile.type";
interface Props {
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}
const Profiles: FC<Props> = ({ className = "", onChange, value }) => {
  const { call: loadAllProfiles } = useDelayApi(allProfilesRoute);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const profileDatas = useMemo(
    () => [{ label: "Sélectionnez un profile", value: "" }, ...profiles.map(({ name, id }: Profile) => ({ label: name, value: id }))],
    [profiles]
  );

  useEffect(() => {
    (async () => {
      try {
        const response = await loadAllProfiles();
        setProfiles(response);
      } catch (error) {
        console.error("Erreur lors du chargement des profils", error);
        setProfiles([]);
      }
    })();
  }, [loadAllProfiles]);
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
export default Profiles;
