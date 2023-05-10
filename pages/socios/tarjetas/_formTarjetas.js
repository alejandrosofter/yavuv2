import { Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@component@components/forms/input";
import SelectEstaticFormik from "@component@components/forms/selectEstaticFormik";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";

export default function FormTarjetasSocio({}) {
  return (
    <Grid sx={{ p: 2 }} spacing={2} container>
      <Grid item md={4}>
        <SelectFecha label="Fecha " campo="fecha" />
      </Grid>
      <Grid item md={8}>
        <Input label="Identificador " campo="identificador" />
      </Grid>
      <Grid item md={6}>
        <SelectEstaticFormik
          label="Tipo"
          campo="tipo"
          items={["CARNET", "PULSERA"]}
        />
      </Grid>
      <Grid item md={6}>
        <SelectEstaticFormik
          label="Estado"
          campo="estado"
          items={["PENDIENTE", "PARA IMPRIMIR", "IMPRESA", "ENTREGADA"]}
        />
      </Grid>

      <Grid item md={12}>
        <Input label="Detalle (opcional)" campo="detalle" />
      </Grid>
    </Grid>
  );
}
