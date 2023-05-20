import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { useState } from "react";

export default function FormCategoria({ values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={8}>
        <Input campo="nombre" label="Nombre" />
      </Grid>

      <Grid item md={2}>
        <Input campo="duracion" label="Duración" />
      </Grid>
      <Grid item md={12}>
        <Input campo="requerimiento" label="Requerimiento" />
      </Grid>
    </Grid>
  );
}
