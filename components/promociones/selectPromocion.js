import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloPromociones";
import Form from "@components/promociones/_form";
export default function SelectPromocion({ label, campo, callbackchange }) {
  return (
    <SelectUserModColeccion
      coleccion={"promociones"}
      Modelo={Modelo}
      // parentData={true}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      campo={campo ? campo : "idPromocion"}
      label={label ? label : "Promo Asociada"}
      icono="fas fa-gift"
      maxWidth="md"
      campoId="id"
      campoLabel="nombrePromocion"
    />
  );
}
