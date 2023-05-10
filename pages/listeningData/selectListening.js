import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "@components/forms/select2Formik";
export default function SelecListeningData({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  const { data } = useCollection("listeningData", {
    // where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });
  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idListeningData"}
      label={label ? label : "Listening"}
      lista={data}
      campoId="id"
      campoLabel="nombre"
    />
  );
}
