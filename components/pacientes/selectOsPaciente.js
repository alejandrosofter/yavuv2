import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { ModeloOsPaciente, valoresInicialesOs } from "@modelos/ModeloPacientes";
import Form from "@components/pacientes/_formOs";
import { useRouter } from "next/router";
export default function SelectOsPaciente({
  multiple,
  label,
  campo,
  callbackchange,
  setFieldValue,
  values,
  idPaciente,
  esForm,
  sx,
}) {
  const callbackSuccessNew = (valor, item) => {
    if (item) {
      setFieldValue(campo ? campo : "osPaciente", item.id);
      setFieldValue(
        `label_${campo ? campo : "osPaciente"}`,
        item.label_obraSocial
      );
      if (callbackchange) callbackchange(item);
    }
  };

  return (
    //ES UN CHOTAZO, tengo que hacer un google function para que cuando se cree le asigne
    // el id del paciente al que pertenece
    <SelectUserModColeccion
      coleccion={`pacientes/${idPaciente}/obrasSociales`}
      Modelo={ModeloOsPaciente}
      sx={sx}
      callbackSuccessNew={callbackSuccessNew}
      parentData={true}
      valoresIniciales={valoresInicialesOs}
      listen={true}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "osPaciente"}
      label={label ? label : "Os Paciente"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.label_obraSocial} - ${item.nroAfiliado}  `}
      esForm={esForm}
    />
  );
}
