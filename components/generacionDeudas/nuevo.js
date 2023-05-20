import Modelo, { valoresIniciales } from "../../modelos/ModeloGeneracionDeuda";

import NuevoGenerico from "@components/NuevoGenerico";
import FormGeneracionDeudas from "./_form";

export default function Modulo({ mod }) {
  return (
    <NuevoGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <FormGeneracionDeudas
        titulo="NUEVA"
        subTitulo="Generacion de deuda"
        icono="fas fa-plus"
      />
    </NuevoGenerico>
  );
}
