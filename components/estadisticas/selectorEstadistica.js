import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
export default function SelectEstadistica({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  const { data } = useCollection("estadisticas", {
    where: [
      parentData
        ? ["idUsuario", "==", localStorage.getItem("usermod")]
        : ["usermod", "==", fuego.auth().currentUser?.uid],
    ],
  });
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idEstadistica"}
      label={label ? label : "Estadistica"}
      lista={data}
      campoId="id"
      campoLabel="nombre"
    />
  );
}
