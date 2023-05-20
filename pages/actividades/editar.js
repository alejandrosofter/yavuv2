import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloActividades";
import EditarGenerico from "../../componen@components/EditarGenerico";

import Form from "./_form";

export default function EditarActividad({ open, setOpen, doc, mod }) {
  const callbackSuccess = (data) => {
    setOpen(false);
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <EditarGenerico
        callbackSuccess={callbackSuccess}
        idItem={doc?.id}
        mod={mod}
        modelo={Modelo}
      >
        <Form titulo="Editar" subTitulo={mod.label} icono="fas fa-pencil" />
     @components/EditarGenerico>
    </DialogContenido>
  );
}
