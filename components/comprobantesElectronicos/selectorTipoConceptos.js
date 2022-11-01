import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "../forms/select2Formik";
export default function SelectorTipoConceptos({
  label,
  campo,
  callbackchange,
}) {
  const idUsuario = localStorage.getItem("usermod")
    ? localStorage.getItem("usermod")
    : fuego.auth().currentUser.uid;
  const { data } = useCollection(
    `certificadosDigitales/${idUsuario}/tipoConceptos`
  );
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoConceptoFiscal"}
      label={label ? label : "Tipo Concepto"}
      lista={data}
      campoId="id"
      campoLabel={(item) => `${item.Desc}`}
    />
  );
}
