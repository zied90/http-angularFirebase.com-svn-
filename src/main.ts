import { FC, useMemo, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";
interface Props {
 className?: string;
 onChange?: (value: string) => void;
 value?: string;
}
const Profiles: FC<Props> = ({ className = "", onChange, value }) => {
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
export default Profiles; voci le compsen profile done corrige si ilya mofication autoritiue
