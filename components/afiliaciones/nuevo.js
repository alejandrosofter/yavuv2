import { getModUsuario } from "@helpers/db";
import UseMod from "@hooks/useModulo";
import Modelo, { valoresIniciales } from "@modelos/ModeloAfiliados";
import { fuego } from "@nandorojo/swr-firestore";
import NuevoGenerico from "../NuevoGenerico";
import Form from "./_form";

export default function Modulo({ mod, callbackSuccess }) {
  const modCobros = getModUsuario("cobros", localStorage.getItem("usermod"));
  // console.log(modCobros?.config);
  return (
    <NuevoGenerico
      preData={modCobros?.config}
      callbackSuccess={callbackSuccess}
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form subTitulo={mod.label} icono={mod.icono} />
    </NuevoGenerico>
  );
}
