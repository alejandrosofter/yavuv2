import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloEnteFacturador";
import Form from "@components/entesFacturadores/_form";
export default function SelectEnteFacturador({
  multiple,
  label,
  campo,
  callbackchange,
  parentData,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"entesFacturadores"}
      Modelo={Modelo}
      parentData={parentData}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      // extraData={["importe"]}
      multiple={multiple}
      campo={campo ? campo : "id"}
      label={label ? label : "Ente Facturador"}
      // icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
