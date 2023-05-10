import Modelo, { valoresIniciales } from "../../modelos/ModeloTurnos";
import NuevoGenerico from "../NuevoGenerico";
import Form from "./_form";

export default function Modulo({
  mod,
  titulo,
  subTitulo,
  callbackSuccess,
  preData,
}) {
  return (
    <NuevoGenerico
      preData={preData}
      titulo={titulo}
      subTitulo={subTitulo}
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form />
    </NuevoGenerico>
  );
}
