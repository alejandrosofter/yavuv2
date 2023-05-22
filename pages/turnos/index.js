import ListadoConsultorios from "@components/turnos/listadoConsultorios";

import { Grid } from "@mui/material";
import useLayout from "@hooks/useLayout";

export default function Page(props) {
  useLayout({
    label: "Turnos",
    titulo: "TURNOS",
    acciones: [
      { label: "Turnos", icono: "fas fa-calendar", url: "/turnos" },
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
      {
        label: "Consultorios",
        icono: "fas fa-house-medical",
        url: "/consultorios",
      },
      { label: "Ficha", icono: "fas fa-id-card", url: "/pacientes/ficha" },
    ],
  });
  return (
    <Grid container>
      <ListadoConsultorios />;
    </Grid>
  );
}
