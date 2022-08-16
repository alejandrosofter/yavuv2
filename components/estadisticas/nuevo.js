import Modelo, { valoresIniciales } from "@modelos/ModeloEstadisticas";
import NuevoGenerico from "../NuevoGenerico";
import Form from "./_form";

export default function Modulo({ mod }) {
  return (
    <NuevoGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="NUEVO" subTitulo={mod.label} icono={mod.icono} />
    </NuevoGenerico>
  );
}
