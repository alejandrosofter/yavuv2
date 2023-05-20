import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import EditarGenerico from "@components/EditarGenerico2";

import Form from "./_form";

export default function EditarGrupo({ open, setOpen, doc, actividad }) {
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
        valoresIniciales={valoresIniciales}
        icono={"fas fa-users"}
        coleccion={`actividades/${actividad?.id}/grupos/${doc?.id}`}
        label={"Editar grupo"}
        modelo={Modelo}
      >
        <Form subTitulo={"grupo"} icono={"fas fa-pencil"} />
     @components/EditarGenerico>
    </DialogContenido>
  );
}
