import FormClientes from "@components/clientes/_form";
import DialogContenido from "@components/forms/dialogContenido";
import Form from "@components/productos/_formCategoria";
import EditarSocio from "@components/socios/editarSocio";
import { Grid, IconButton } from "@mui/material";
import { useState } from "react";

export default function DataNotificacionCliente({ mod, dataCliente }) {
  const [open, setOpen] = useState(false);
  return (
    <Grid container>
      <Grid item md={12}>
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
          disabled={!dataCliente}
          className="fas fa-user"
        />
      </Grid>
      <EditarSocio
        dataSocio={dataCliente}
        open={open}
        mod={mod}
        setOpen={setOpen}
      />
    </Grid>
  );
}
