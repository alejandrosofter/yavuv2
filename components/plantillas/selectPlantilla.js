import DialogContenido from "@components/forms/dialogContenido";
import { getModUsuario } from "@helpers/db";
import { Button, Grid, Icon, Tooltip } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Select2 from "../forms/select2Formik";
import NuevoPaciente from "./nuevo";
export default function Modulo({ campo, label, callbackchange }) {
  const { data } = useCollection("plantillas", {
    listen: true,
    where: ["idUsuario", "==", fuego.auth().currentUser.uid],
  });

  if (!data) return "";
  return (
    <Grid container>
      <Grid item xs={10}>
        <Select2
          callbackchange={callbackchange}
          campo={campo ? campo : "plantilla"}
          label={label ? label : "Plantilla"}
          lista={data}
          campoId="id"
          campoLabel={(item) => `${item.nombre} `}
        />
      </Grid>
    </Grid>
  );
}
