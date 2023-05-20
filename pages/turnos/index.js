import ListadoConsultorios from "./listadoConsultorios";

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
      { label: "Config", icono: "fas fa-cog", url: "/turnos/config" },
    ],
  });
  return (
    <Grid container>
      <ListadoConsultorios />;
    </Grid>
  );
}
