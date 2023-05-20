import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloFormaPago";
import Form from "@pages/formaPagos/_form";
export default function SelectFormaPago({
  label,
  campo,
  callbackchange,
  parentData = true,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"formaPagos"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "formaPago"}
      label={label ? label : "Forma de Pago"}
      maxWidth="md"
      campoId="id"
      campoLabel="nombreFormaPago"
    />
  );
}
