import Modelo, { valoresIniciales } from "@modelos/ModeloSocioDeudas";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "./_form";

export default function Modulo({ mod, callbackSuccess, preData }) {
  return (
    <NuevoGenerico
      preData={preData}
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="NUEVO" subTitulo={mod.label} icono={mod.icono} />
    </NuevoGenerico>
  );
}
