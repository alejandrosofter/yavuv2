import Modelo, { valoresIniciales } from "@modelos/ModeloProcesos";
import EditarGenerico from "@components/EditarGenerico";
import Form from "./_form";

export default function Modulo({ mod, callbackSuccess }) {
  return (
    <EditarGenerico
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="EDITAR" subTitulo={mod.label} icono={mod.icono} />
   @components/EditarGenerico>
  );
}
