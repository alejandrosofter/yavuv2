import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select2Formik";
export default function SelectTipoComprobantes({
  label,
  campo,
  callbackchange,
}) {
  const idUsuario = localStorage.getItem("usermod")
    ? localStorage.getItem("usermod")
    : fuego.auth().currentUser.uid;
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
