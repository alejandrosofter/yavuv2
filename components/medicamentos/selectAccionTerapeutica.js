import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import {
  valoresInicialesAccionTerapeutica,
  ModeloAccionTerapeutica,
} from "@modelos/ModeloMedicamentos";
import Form from "@components/medicamentos/_formAccionTerapeutica";
export default function SelectAccionTerapeutica({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"accionesTerapeuticas"}
      Modelo={ModeloAccionTerapeutica}
      parentData={true}
      valoresIniciales={valoresInicialesAccionTerapeutica}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idAccionTerapeutica"}
      label={label ? label : "Accion Terapeautica"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre} `}
    />
  );
}
