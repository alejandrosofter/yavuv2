import EditarGenerico2 from "@components/EditarGenerico2";
import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloPacientes";

import Form from "./_form";

export default function EditarPaciente({ idPaciente, open, setOpen }) {
  const callbackSuccess = (data) => {
    setOpen(false);
  };
  return (
    <>
      <DialogContenido
        fullWidth={true}
        maxWidth="lg"
        open={open}
        setOpen={setOpen}
      >
        <EditarGenerico2
          coleccion={`pacientes/${idPaciente}`}
          callbackSuccess={callbackSuccess}
          valoresIniciales={valoresIniciales}
          modelo={Modelo}
        >
          <Form />
        </EditarGenerico2>
      </DialogContenido>
    </>
  );
}
