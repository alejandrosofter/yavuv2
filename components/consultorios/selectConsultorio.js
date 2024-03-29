import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select2Formik";
export default function Modulo({ label, campo, callbackchange }) {
  const { data } = useCollection("consultorios", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "consultorio"}
      label={label ? label : "Consultorio"}
      lista={data}
      campoId="id"
      campoLabel="nombre"
    />
  );
}
