import Modelo, { valoresIniciales } from "@modelos/ModeloCuentas";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";

export default function Modulo({ mod }) {
  return (
    <NuevoGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="NUEVA" subTitulo={mod.label} icono={mod.icono} />
    </NuevoGenerico>
  );
}
