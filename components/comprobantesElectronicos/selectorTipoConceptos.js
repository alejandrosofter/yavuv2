import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select2Formik";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function SelectorTipoConceptos({
  label,
  campo,
  callbackchange,
}) {
  const config = UseConfigModulo("cobros");
  const idUsuario = config.idUsuario;
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
