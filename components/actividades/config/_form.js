import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { useState } from "react";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import SwitchFormik from "@components/forms/switch";
import SelectFormik from "../../forms/select";
export default function FormItemConfigActividades({ values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="detalle" label="Detalle" />
      </Grid>

      <Grid item md={3}></Grid>

      {/* ({elemento})=>`${elemento.apellido} ${elemento.nombre}` */}
    </Grid>
  );
}
