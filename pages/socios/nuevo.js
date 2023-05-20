import Modelo, { valoresIniciales } from "@modelos/ModeloSocios";
import NuevoGenerico from "@components/NuevoGenerico";

import Form from "./_formSocios";

export default function Modulo({ mod }) {
  return (
    <NuevoGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="Nuevo" subTitulo={mod.label} icono="fas fa-plus" />
   @components/NuevoGenerico>
  );
}
