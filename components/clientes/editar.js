import EditarGenerico2 from "@components/EditarGenerico2";
import DialogContenido from "@components/forms/dialogContenido";
import Modelo, { valoresIniciales } from "@modelos/ModeloClientes";
import { Button } from "@mui/material";
import { useState } from "react";

import Form from "./_form";

export default function EditarCliente({ mod }) {
  const [open, setOpen] = useState(false);
  const callbackSuccess = (data) => {
    setOpen(false);
  };

  return (
    <>
      <DialogContenido
        fullWidth={true}
        maxWidth="md"
        open={open}
        setOpen={setOpen}
      >
        <EditarGenerico2
          coleccion="clientes"
          callbackSuccess={callbackSuccess}
          valoresIniciales={valoresIniciales}
          mod={mod}
          modelo={Modelo}
        >
          <Form subTitulo={mod.label} icono={mod.icono} />
        </EditarGenerico2>
      </DialogContenido>
    </>
  );
}
