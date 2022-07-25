import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "../forms/select2Formik";
export default function Modulo({
  label,
  campo,
  callbackchange,
  soloElectronicas,
}) {
  const where = soloElectronicas
    ? [
        ["esFacturaElectronica", "==", true],
        ["idUsuario", "==", fuego.auth().currentUser.uid],
      ]
    : [["idUsuario", "==", fuego.auth().currentUser.uid]];
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
