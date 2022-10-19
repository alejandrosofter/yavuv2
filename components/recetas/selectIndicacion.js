import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloIndicaciones";
import Form from "@components/indicaciones/_form";
export default function SelectIndicacion({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"indicaciones"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idIndicacion"}
      label={label ? label : "Indicacion"}
      icono="fas fa-notes-medical"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre}`}
    />
  );
}
