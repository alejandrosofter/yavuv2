import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloContactos";
import Form from "@components/contactos/_form";
export default function SelectContacto({
  multiple,
  label,
  campo,
  callbackchange,
  esForm,
  campoLabel,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"contactos"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "contacto"}
      label={label ? label : "Contactos"}
      icono="fas fa-users"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) =>
        campoLabel
          ? campoLabel(item)
          : `${item.nombre} ${item.apellido} - ${item.telefono} - ${item.email}`
      }
      esForm={esForm}
    />
  );
}
