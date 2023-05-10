import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "../../componen@components/forms/select2Formik";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  const { data } = useCollection("actividadesPadre", {
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
      campo={campo ? campo : "idActividadPadre"}
      label={label ? label : "Actividad Padre"}
      lista={data}
      campoId="id"
      campoLabel={(item) => item.nombre.toUpperCase()}
    />
  );
}
