import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import Modelo, { valoresIniciales } from "@modelos/ModeloCentroCostos";
import Form from "@pages/centroCostos/_form";
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
      maxWidth="md"
      campoId="id"
      campoLabel="nombreCentroCosto"
    />
  );
}
