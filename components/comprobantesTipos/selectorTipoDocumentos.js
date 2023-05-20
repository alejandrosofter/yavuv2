import { localstorageParser } from "@helpers/arrays";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select2Formik";
export default function SelectorTipoDocumentos({
  label,
  campo,
  callbackchange,
}) {
  const idUsuario = localStorage.getItem("usermod")
    ? localStorage.getItem("usermod")
    : fuego.auth().currentUser.uid;
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
