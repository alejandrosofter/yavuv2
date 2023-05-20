import Modelo, { valoresIniciales } from "@modelos/ModeloExportador";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";

export default function Modulo({ mod, callbackSuccess }) {
  return (
    <NuevoGenerico
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form subTitulo={mod.label} icono={mod.icono} />
   @components/NuevoGenerico>
  );
}
