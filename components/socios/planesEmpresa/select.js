import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloPlanesEmpresa";
import Form from "./_form";
export default function SelectPlanEmpresa({
  multiple,
  label,
  campo,
  callbackchange,
  parentData,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"socios_planEmpresa"}
      Modelo={Modelo}
      parentData={parentData}
      valoresIniciales={valoresIniciales}
      Form={Form}
      callbackchange={callbackchange}
      multiple={multiple}
      campo={campo ? campo : "idPlan"}
      label={label ? label : "Plan Empresa"}
      icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
