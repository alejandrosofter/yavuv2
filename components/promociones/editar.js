import Modelo, { valoresIniciales } from "../../modelos/ModeloPromociones";
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
      <Form titulo="Editar" subTitulo="Promocion" icono="fas fa-pencil" />
    </EditarGenerico>
  );
}
