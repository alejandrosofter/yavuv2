import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "../forms/select2Formik";
export default function SelectActividades({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  const { data } = useCollection("actividades", {
    where: [
      "idUsuario",
      "==",
      localStorage.getItem("usermod")
        ? localStorage.getItem("usermod")
        : fuego.auth().currentUser.uid,
    ],
  });
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      //   extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idActividad"}
      label={label ? label : "Actividad "}
      lista={data}
      campoId="id"
      campoLabel={(item) => item.nombreActividad.toUpperCase()}
    />
  );
}
