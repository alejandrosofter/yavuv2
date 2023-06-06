import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloPacientes";
import Form from "@components/pacientes/_form";
import { useRouter } from "next/router";
export default function SelectPaciente({
  multiple,
  label,
  campo,
  callbackchange,

  esForm,
  sx,
}) {
  const router = useRouter();
  const callbackSuccessNew = (valor, item) => {
    if (item) {
      localStorage.setItem("pacienteSeleccion", JSON.stringify(item));
      router.push(`/pacientes/ficha/${item.id}`);
    }
  };
  return (
    <SelectUserModColeccion
      coleccion={"pacientes"}
      Modelo={Modelo}
      sx={sx}
      callbackSuccessNew={callbackSuccessNew}
      parentData={true}
      valoresIniciales={valoresIniciales}
      listen={true}
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
