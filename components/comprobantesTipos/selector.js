import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "../forms/select2Formik";
export default function Modulo({
  label,
  campo,
  callbackchange,
  soloElectronicas,
}) {
  const idUsuario = localStorage.getItem("usermod")
    ? localStorage.getItem("usermod")
    : fuego.auth().currentUser.uid;
  const where = soloElectronicas
    ? [
        ["esFacturaElectronica", "==", true],
        ["idUsuario", "==", idUsuario],
      ]
    : [["idUsuario", "==", idUsuario]];
  const { data } = useCollection("comprobantesTipos", {
    where,
  });
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoComprobante"}
      label={label ? label : "Tipo de Comprobante"}
      lista={data}
      campoId="id"
      campoLabel={(item) =>
        `${item.nombreTipoComprobante} ${
          item.esFacturaElectronica ? "(Electrónica)" : ""
        }`
      }
    />
  );
}
