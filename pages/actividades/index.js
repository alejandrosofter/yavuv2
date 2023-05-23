import ListaActividades from "@components/actividades/_actividades";
import { Grid } from "@mui/material";
import ListaGrupos from "@components/actividades/grupos";
import { useState } from "react";
import useLayout from "@hooks/useLayout";
export default function Modulo({ mod }) {
  const [actividad, setActividad] = useState(null);
  const cambiaActividad = (actividad) => {
    setActividad(actividad);
  };
  useLayout({
    label: "Actividades",
    titulo: "ACTIVIDADES",
    icon: "fas fa-dumbbell",
    acciones: [
      {
        label: "Actividades",
        icono: "fas fa-dumbbell",
        url: "/actividades",
      },
    ],
  });
  return (
    <Grid container spacing={3}>
      <Grid item md={3}>
        <ListaActividades mod={mod} callbackchange={cambiaActividad} />
      </Grid>
      <Grid item md={9}>
        <ListaGrupos mod={mod} actividad={actividad} />
      </Grid>
    </Grid>
  );
}
