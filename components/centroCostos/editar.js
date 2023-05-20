import Modelo, { valoresIniciales } from "../../modelos/ModeloCentroCostos";
import EditarGenerico from "@components/EditarGenerico";

import Form from "./_form";

export default function Modulo({ mod }) {
  return (
    <EditarGenerico mod={mod} modelo={Modelo}>
      <Form titulo="EDITAR" subTitulo={mod.label} icono={mod.icono} />
    </EditarGenerico>
  );
}
