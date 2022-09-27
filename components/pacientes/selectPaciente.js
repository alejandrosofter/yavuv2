import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloPacientes";
import Form from "@components/pacientes/_form";
export default function SelectPaciente({
  multiple,
  label,
  campo,
  callbackchange,
  esForm,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"pacientes"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "paciente"}
      label={label ? label : "Pacientes"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre} ${item.apellido} ${item.dni}`}
      esForm={esForm}
    />
  );
}
