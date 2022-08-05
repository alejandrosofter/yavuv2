import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "../forms/select2Formik";
export default function SelectProfesor({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  const { data: productos } = useCollection("profesores", {
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!productos) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "idProfesor"}
      label={label ? label : "Profesor"}
      lista={productos}
      campoId="id"
      campoLabel={(row) => `${row.nombre} ${row.apellido}`}
    />
  );
}
