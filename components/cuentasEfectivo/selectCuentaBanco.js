import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloCuentasEfectivo";
import Form from "@components/cuentasEfectivo/_form";
export default function SelectCuentaBanco({
  label,
  campo,
  callbackchange,
  parentData,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"cuentasEfectivo"}
      Modelo={Modelo}
      parentData={parentData}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idCuentaBanco"}
      label={label ? label : "Cuenta Banco"}
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
