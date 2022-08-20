import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select2 from "../forms/select2Formik";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  const { data: productos } = useCollection("productos", {
    where: [
      "idUsuario",
      "==",
      localStorage.getItem("usermod")
        ? localStorage.getItem("usermod")
        : fuego.auth().currentUser.uid,
    ],
  });
  if (!productos) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idProducto"}
      label={label ? label : "Producto Asociado"}
      lista={productos}
      campoId="id"
      campoLabel="nombre"
    />
  );
}
