import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloEstudios";
import Form from "@components/estudios/_form";
export default function SelectEstudios({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"estudios"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idEstudio"}
      label={label ? label : "Estudio"}
      icono="fas fa-book-medical"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
