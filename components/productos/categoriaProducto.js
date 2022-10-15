import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import {
  valoresInicialesCategoria,
  ModeloCategoria,
} from "@modelos/ModeloProductos";
import Form from "@components/productos/_formCategoria";
export default function SelectCategoriaProducto({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"productos_categorias"}
      Modelo={ModeloCategoria}
      valoresIniciales={valoresInicialesCategoria}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idCategoriaProducto"}
      label={label ? label : "Categoria Producto"}
      icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
