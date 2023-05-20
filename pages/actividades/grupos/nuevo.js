import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";

import Form from "./_form";

export default function NuevoGrupo({ open, setOpen, actividad }) {
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
        icono={"fas fa-users"}
        coleccion={`actividades/${actividad?.id}/grupos`}
        label={"Nuevo grupo"}
        modelo={Modelo}
      >
        <Form subTitulo={"grupo"} icono={"fas fa-plus"} />
      </NuevoGenerico>
    </DialogContenido>
  );
}
