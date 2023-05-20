import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { useState } from "react";

import SwitchFormik from "@components/forms/switch";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import SelectFormik from "@components/forms/select2Formik";
export default function FromCompartir({ values }) {
  const { data: actividades } = useCollection(`actividades`, {
    where: [["idUsuario", "==", fuego.auth().currentUser.uid]],
  });
  if (!actividades) return "cargando ...";
  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <Input campo="email" label="Email" />
      </Grid>
      <Grid item md={2}>
        <SwitchFormik campo="accesoTotal" label="Acceso Total" />
      </Grid>
      <Grid item md={6}>
        <SelectFormik
          multiple={true}
          lista={actividades}
          campoId="id"
          campoLabel="nombreActividad"
          campo="recursos"
          label="Recursos"
        />
      </Grid>
    </Grid>
  );
}
