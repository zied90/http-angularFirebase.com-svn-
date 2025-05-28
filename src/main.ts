import { FC, useMemo, useEffect, useState } from "react";
import FormItem from "@/toolkit/Components/Form/FormItem";
import { useDelayApi } from "@/hooks/useApi";
import { allTypesRoute } from "@/Api/ApiRoutes";


interface Type {
  code: string;
  name: string;
}
interface Props {
  className?: string;
}
const Types: FC<Props> = ({ className = "" }) => {
  const { call: loadTypes } = useDelayApi(allTypesRoute); 
  const [types, setTypes] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const response: string[] = await loadTypes();
        setTypes(response);
      } catch (error) {
        console.error("Erreur lors du chargement des types :", error);
      }
    })();
  }, [loadTypes]);
  const typeDatas = useMemo(
    () => [{ label: "Sélectionnez un type", value: "" }, ...types.map((e) => (e:=>e))],
    [types]
  );
  return types.length ? (
    <FormItem
      id="id-Type-template"
      labelStyle={className}
      type="select"
      label="ECM-Type"
      name="type"
      placeholder="Sélectionner un Type"
      required={true}
      visibleValue={types.length === 1 ? types[0].name : undefined}
      value={types.length === 1 ? types[0].code : undefined}
      datas={typeDatas}
    />
  ) : null;
};
export default Types;
