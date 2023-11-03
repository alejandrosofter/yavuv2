import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Modelo, { valoresIniciales } from "@modelos/ModeloRecetas";

import Form from "./_form";

export default function NuevaReceta({
  open,
  setOpen,
  paciente,
  receta,
  onsuccess,
}) {
  const callbackSuccess = (data) => {
    setOpen(false);
    if (onsuccess) onsuccess(data);
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
        icono={"fas fa-users"}
        preData={{
          receta: {
            ...receta,
            fecha: new Date(),
            fecha_timestamp: new Date().getTime(),
            fechaReceta_timestamp: new Date().getTime(),
            fechaReceta: new Date(),
          },
        }}
        coleccion={`pacientes/${paciente?.id}/recetas`}
        label={"Nueva Receta"}
        modelo={Modelo}
      >
        <Form subTitulo={"RECETA"} icono={"fas fa-plus"} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
