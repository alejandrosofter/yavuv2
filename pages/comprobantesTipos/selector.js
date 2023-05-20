import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloTipoComprobantes";
import Form from "@pages/comprobantesTipos/_form";
export default function SelectTipoComprobante({
  label,
  campo,
  callbackchange,
  soloElectronicas,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"comprobantesTipos"}
      Modelo={Modelo}
      parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "tipoComprobante"}
      label={label ? label : "Tipo de Comprobante"}
      maxWidth="md"
      campoId="id"
      campoLabel={(item) =>
        `${item.nombreTipoComprobante} ${
          item.esFacturaElectronica ? "(Electrónica)" : ""
        }`
      }
    />
  );
}
