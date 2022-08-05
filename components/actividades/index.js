import ListaActividades from "./_actividades";
import { Grid } from "@mui/material";
import ListaGrupos from "./grupos";
import { useState } from "react";
export default function Modulo({ mod }) {
  const [actividad, setActividad] = useState(null);
  const cambiaActividad = (actividad) => {
    setActividad(actividad);
  };
  return (
    <Grid container>
      <Grid item md={3}>
        <ListaActividades mod={mod} callbackchange={cambiaActividad} />
      </Grid>
      <Grid item md={9}>
        <ListaGrupos mod={mod} actividad={actividad} />
      </Grid>
    </Grid>
  );
}
