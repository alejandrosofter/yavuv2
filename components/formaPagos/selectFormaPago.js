import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloFormaPago";
import Form from "@components/formaPagos/_form";
export default function SelectFormaPago({
  label,
  campo,
  callbackchange,
  parentData,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"formaPago"}
      Modelo={Modelo}
      parentData={parentData}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idFormaPago"}
      label={label ? label : "Forma de Pago"}
      maxWidth="md"
      campoId="id"
      campoLabel="nombreFormaPago"
    />
  );
}
