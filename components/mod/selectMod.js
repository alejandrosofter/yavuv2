import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
export default function SelectMod({ label, campo, callbackchange }) {
  const { data } = useCollection("mods", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "idMod"}
      label={label ? label : "Mod"}
      lista={data}
      campoId="id"
      campoLabel="label"
    />
  );
}
