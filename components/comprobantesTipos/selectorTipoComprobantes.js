import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select2Formik";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function SelectTipoComprobantes({
  label,
  campo,
  callbackchange,
}) {
  const config = UseConfigModulo("cobros");
  const { data } = useCollection(
    `certificadosDigitales/${config?.idUsuario}/tipoComprobantes`
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
