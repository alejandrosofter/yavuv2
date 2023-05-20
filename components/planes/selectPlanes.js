import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
export default function SelectPlan({ label, campo, callbackchange }) {
  const { data: productos } = useCollection("planes", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!productos) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "plan"}
      label={label ? label : "Plan Asociado"}
      lista={productos}
      campoId="id"
      campoLabel="detalle"
    />
  );
}
