import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloPuntosVenta";
import Form from "@components/comprobantesElectronicos/_formPuntoVenta";
export default function SelectPuntoVenta({
  multiple,
  label,
  campo,
  callbackchange,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"comprobantesElectronicos_puntosVenta"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "puntoVenta"}
      label={label ? label : "Punto Venta"}
      maxWidth="sm"
      campoId="id"
      campoLabel={(data) => `${data.nombre} - ${data.nro}`}
    />
  );
}
