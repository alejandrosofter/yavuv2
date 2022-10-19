import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloObrasSociales";
import Form from "@components/obrasSociales/_form";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"obrasSociales"}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      parentData={true}
      multiple={multiple}
      campo={campo ? campo : "obraSocial"}
      label={label ? label : "Obra Social"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
