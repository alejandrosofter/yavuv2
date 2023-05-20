import Modelo, { valoresIniciales } from "../../modelos/ModeloModulos";
import { useRouter } from "next/router";

import EditarGenerico from "@components/EditarGenerico";

import Form from "./_form2";

export default function Modulo({ mod }) {
  return (
    <EditarGenerico mod={mod} modelo={Modelo}>
      <Form titulo="Editar" subTitulo="Modulo" icono="fas fa-pencil" />
    </EditarGenerico>
  );
}
