import Modelo, { valoresIniciales } from "../../modelos/ModeloCuentasCbu";
import NuevoGenerico from "../NuevoGenerico";
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
      <Form titulo="NUEVA" subTitulo={mod.label} icono={mod.icono} />
    </NuevoGenerico>
  );
}
