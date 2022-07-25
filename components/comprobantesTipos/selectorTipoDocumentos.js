import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "../forms/select2Formik";
export default function SelectorTipoDocumentos({
  label,
  campo,
  callbackchange,
}) {
  const idUsuario = fuego.auth().currentUser.uid;
  const { data } = useCollection(
    `certificadosDigitales/${idUsuario}/tipoDocumentos`
  );
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoDocumentoFiscal"}
      label={label ? label : "Tipo de Documento"}
      lista={data}
      campoId="id"
      campoLabel={(item) => `${item.Desc}`}
    />
  );
}
