import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloOpcionesAnteojos";
import Form from "@pages/recetas/_formOpcionesAnteojos";
export default function SelectOpcionesAnteojos({
  multiple,
  label,
  campo,
  callbackchange,
  parentData,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"recetas_opecionesAnteojos"}
      Modelo={Modelo}
      parentData={parentData}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={true}
      campo={campo ? campo : "idOpcionesAnteojos"}
      label={label ? label : "Opciones"}
      icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
