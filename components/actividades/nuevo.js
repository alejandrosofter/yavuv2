import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico";
import Modelo, { valoresIniciales } from "@modelos/ModeloActividades";

import Form from "./_form";

export default function NuevaActividad({ open, setOpen, mod }) {
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
      <NuevoGenerico
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
        mod={mod}
        modelo={Modelo}
      >
        <Form subTitulo={mod.label} icono={mod.icono} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
