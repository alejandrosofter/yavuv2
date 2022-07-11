import {
  CircularProgress,
  Grid,
  MenuItem,
  Tab,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";

export default function FormTarjetasSocio({}) {
  return (
    <Grid md={12} sx={{ ml: 1 }} container rowSpacing={2} spacing={2}>
      <Grid item md={6}>
        <Input label="Apellido" campo="apellido" />
      </Grid>
      <Grid item md={6}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Typography sx={{ p: 3 }} variant="caption">
        Si desea modificar la FOTO:1.- debe ir al perfil del socio y modificar
        su foto. 2.- Click sobre `Enviar terceros`
      </Typography>
    </Grid>
  );
}
