import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import Modelo, { valoresIniciales } from "@modelos/ModeloClientes";
import { Button } from "@mui/material";
import { useState } from "react";

import Form from "./_form";

export default function NuevoCliente({ mod }) {
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
        <NuevoGenerico
          coleccion="clientes"
          callbackSuccess={callbackSuccess}
          valoresIniciales={valoresIniciales}
          mod={mod}
          modelo={Modelo}
        >
          <Form subTitulo={mod.label} icono={mod.icono} />
        </NuevoGenerico>
      </DialogContenido>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        + Cliente
      </Button>
    </>
  );
}
