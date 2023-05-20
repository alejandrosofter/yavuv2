import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import {
  inicialesCategoria,
  ModeloCategoria,
} from "@modelos/ModeloPrestaciones";
import Form from "@components/prestaciones/_formCategorias";
export default function SelectCategoriaPrestacion({
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={`prestaciones_categorias`}
      Modelo={ModeloCategoria}
      parentData={true}
      valoresIniciales={inicialesCategoria}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idPrestacion"}
      label={label ? label : "Prestacion"}
      icono="fas fa-medical"
      maxWidth="md"
      campoId="id"
      campoLabel={(item) => `${item.nombre}`}
    />
  );
}
