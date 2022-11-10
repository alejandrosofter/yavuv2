import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "../forms/select2Formik";
export default function SelectorComprobantes({
  label,
  campo,
  callbackchange,
  parentData,
}) {
  const { data } = useCollection("comprobantesElectronicos", {
    where: parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid],
  });
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "comprobanteAsociado"}
      label={label ? label : "Comprobante Asociado"}
      lista={data}
      campoId="id"
      campoLabel={(item) => `${item.razonSocial} - NRO ${item.CbteHasta}`}
    />
  );
}
