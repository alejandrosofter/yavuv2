import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "../forms/select2Formik";
export default function SelectTipoComprobantes({
  label,
  campo,
  callbackchange,
}) {
  const idUsuario = fuego.auth().currentUser.uid;
  const { data } = useCollection(
    `certificadosDigitales/${idUsuario}/tipoComprobantes`
  );
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoComprobanteFiscal"}
      label={label ? label : "Tipo de Comprobante"}
      lista={data}
      campoId="id"
      campoLabel={(item) => `${item.Desc}`}
    />
  );
}
