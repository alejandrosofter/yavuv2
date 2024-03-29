import Modelo, { valoresIniciales } from "../../modelos/ModeloPlanes";
import { useRouter } from "next/router";

import EditarGenerico from "@components/EditarGenerico";

import Form from "./_form";

export default function Modulo({ mod }) {
  return (
    <EditarGenerico
      valoresIniciales={valoresIniciales}
      mod={mod}
      modelo={Modelo}
    >
      <Form titulo="Editar" subTitulo={mod.label} icono="fas fa-pencil" />
    </EditarGenerico>
  );
}
