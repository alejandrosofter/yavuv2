import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloProfesores";
import Form from "@components/profesores/_form";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"profesores"}
      Modelo={Modelo}
      // parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idProfesor"}
      label={label ? label : "Profesor"}
      icono="fas fa-user"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre} ${item.apellido}`}
    />
  );
}
