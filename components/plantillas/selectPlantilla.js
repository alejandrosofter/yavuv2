import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloPlantillas";
import Form from "@components/plantillas/_form";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"plantillas"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idPlantilla"}
      label={label ? label : "Plantilla"}
      icono="fas fa-file-image"
      maxWidth="lg"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
