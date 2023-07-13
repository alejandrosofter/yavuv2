import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Select from "@components/forms/select2Formik";
import { getModUsuario } from "../../helpers/db";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function Modulo({ label, campo, callbackchange }) {
  const config = UseConfigModulo("cuentasCbu");
  const data = config?.itemsCategoriaSocios;
  if (!data) return "";
  return (
    <Select
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoCuenta"}
      label={label ? label : "Cuenta Asociada"}
      lista={data}
      campoId="id"
      campoLabel="nombre"
    />
  );
}
