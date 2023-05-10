import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloActividades";
import Form from "pages/actividades/_form";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"actividades"}
      Modelo={Modelo}
      parentData={false}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idActividad"}
      label={label ? label : "Actividad"}
      icono="fas fa-shopping-cart"
      maxWidth="sm"
      campoId="id"
      campoLabel={(item) => item?.nombreActividad.toUpperCase()}
    />
  );
}
