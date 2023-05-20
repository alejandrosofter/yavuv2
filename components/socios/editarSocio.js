import EditarGenerico2 from "@components/EditarGenerico2";
import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloSocios";

import Form from "./_formSocios";

export default function EditarSocio({ dataSocio, open, setOpen }) {
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
          coleccion={`socios/${dataSocio?.objectID}`}
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
