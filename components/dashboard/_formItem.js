import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Input from "@components/forms/input";
import SelectEstadistica from "@components/estadisticas/selectorEstadistica";
import { Typography } from "@mui/material";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function FormItem({ values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
      <Grid item md={6}>
        <SelectEstadistica />
      </Grid>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["DIARIO", "MENSUAL", "ANUAL"]}
          label="Filtro"
          campo="filtro"
        />
      </Grid>
      <Grid item md={1}>
        <Input label="Size" campo="size" />
        <Typography variant="caption">*MIN 1 - MAX 12</Typography>
      </Grid>
    </Grid>
  );
}
