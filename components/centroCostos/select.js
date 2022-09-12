import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloProductos";
import Form from "@components/productos/_form";
export default function SelectCentroCosto({ label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"centroCostos"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idCentroCosto"}
      label={label ? label : "Grupo $"}
      //   icono="fas fa-shopping-cart"
      maxWidth="sm"
      campoId="id"
      campoLabel="nombreCentroCosto"
    />
  );
}
