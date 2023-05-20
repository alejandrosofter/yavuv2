import Modelo, { valoresIniciales } from "@modelos/ModeloExportador";
import EditarGenerico from "@components/EditarGenerico";

import Form from "./_form";

export default function Modulo({ mod }) {
  return (
    <EditarGenerico mod={mod} modelo={Modelo}>
      <Form titulo="Editar" subTitulo={mod.label} icono="fas fa-pencil" />
   @components/EditarGenerico>
  );
}
