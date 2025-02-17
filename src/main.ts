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
    () => [{ label: "Sélectionnez un Profil", value: "" }, ...profiles.map(({ name, id }: Profile) => ({ label: name, value: id }))],
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
    console.log(event.target,"mmmmmm")
    onChange?.(event.target.value);
  };
  return profiles && profiles.length ? (
    <FormItem
      id="id-profile"
      labelStyle={className}
      type="select"
      label="Profil"
      name="authorities"
      placeholder="Sélectionner un Profile"
      required={true}
      visibleValue={profiles.length === 1 ? profiles[0].name : undefined}
      value={value || (profiles.length === 1 ? profiles[0].name : "")}
      datas={profileDatas}
      onChange={handleChange}
    />
  ) : null;
};
export default Profiles;


voci le bakcend  ce qui retourne [
  {
    "id": 1,
    "name": "ADMIN"
  },
  {
    "id": 2,
    "name": "CONTRIB"
  },
  {
    "id": 3,
    "name": "AGT"
  },
  {
    "id": 4,
    "name": "AXA_PART"
  },
  {
    "id": 60,
    "name": "RETRAITE_COLLECTIVE"
  },
  {
    "id": 61,
    "name": "PREV_COLLECTIVE"
  },
  {
    "id": 62,
    "name": "RENTES_INDIVIDUELLES"
  }
] moi je veux enboyer name et pas id
