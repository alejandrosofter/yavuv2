import Modelo, { valoresIniciales } from "../../modelos/ModeloTurnos";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";

export default function Modulo({
  titulo,
  subTitulo,
  callbackSuccess,
  preData,
}) {
  return (
    <NuevoGenerico
      coleccion="turnos"
      label="Turno"
      icono={"fas fa-calendar"}
      preData={preData}
      titulo={titulo}
      subTitulo={subTitulo}
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      modelo={Modelo}
    >
      <Form />
    </NuevoGenerico>
  );
}
