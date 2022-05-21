import ModuloUsuarioUnico from "@components/ModuloUsuarioUnico";
import Modelo, { valoresIniciales } from "@modelos/ModeloCuentas";
import Form from "./_form";
export default function MiCuenta() {
  return (
    <ModuloUsuarioUnico
      nombreModulo="micuenta"
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      Form={Form}
    />
  );
}
