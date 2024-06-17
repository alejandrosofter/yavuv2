import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloDiagnosticos";
import Form from "@components/diagnosticos/_form";
export default function SelectDiagnostico({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"diagnosticos"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idDiagnostico"}
      label={label ? label : "Diagnostico"}
      icono="fas fa-notes-medical"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre}`}
    />
  );
}
