import { useCollection } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
import { useFormikContext } from "formik";
export default function SelectMenuGrupo({ label, campo, callbackchange }) {
  const { values, setFieldValue } = useFormikContext();
  const { data } = useCollection("menuGrupos", { orderBy: ["label", "asc"] });
  if (!data) return "";
  const cambia = (valor, item) => {
    if (item) {
      setFieldValue("iconParent", item.icon);
      if (callbackchange) callbackchange(valor, item);
    }
  };

  return (
    <Select2
      callbackchange={cambia}
      campo={campo ? campo : "grupo"}
      label={label ? label : "Grupo"}
      lista={data}
      campoId="id"
      campoLabel="label"
    />
  );
}
