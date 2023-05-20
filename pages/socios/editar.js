import Modelo, { valoresIniciales } from "@modelos/ModeloSocios";
import { useRouter } from "next/router";
import EditarGenerico from "@components/EditarGenerico";

import Form from "./_formSocios";

export default function Modulo({ mod }) {
  const router = useRouter();

  return (
    <EditarGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form
        titulo="Editar"
        mod={mod}
        subTitulo={mod.label}
        icono="fas fa-pencil"
      />
   @components/EditarGenerico>
  );
}
