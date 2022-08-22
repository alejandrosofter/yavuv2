import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloProductos";
import Form from "@components/productos/_form";
export default function Modulo({ multiple, label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"productos"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "idProducto"}
      label={label ? label : "Producto Asociado"}
      icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
