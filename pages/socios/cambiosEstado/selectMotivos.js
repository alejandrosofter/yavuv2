import SelectUserModColeccion from "@components/forms/selectUserModColeccion";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import {
  ModeloMotivosCambioEstado,
  valoresInicialesMotivoCambioEstado,
} from "@modelos/ModeloSocios";
import Form from "@components/socios/cambiosEstado/_formMotivos";
export default function SelectMotivo({
  label,
  campo,
  callbackchange,
  parentData,
  estado,
}) {
  return (
    <SelectUserModColeccion
      coleccion={"cambiosEstados_motivos"}
      Modelo={ModeloMotivosCambioEstado}
      parentData={parentData}
      valoresIniciales={valoresInicialesMotivoCambioEstado}
      Form={Form}
      addWhere={[["estado", "==", estado]]}
      callbackchange={callbackchange}
      campo={campo ? campo : "idMotivo"}
      label={label ? label : "Motivo"}
      icono="fas fa-shopping-cart"
      maxWidth="md"
      campoId="id"
      campoLabel="nombre"
    />
  );
}
