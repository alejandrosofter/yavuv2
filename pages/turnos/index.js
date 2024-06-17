import ListadoConsultorios from "@components/turnos/listadoConsultorios";

import { Grid } from "@mui/material";
import useLayout from "@hooks/useLayout";
import { menuPacientes } from "@pages/pacientes/informes";

export default function Page(props) {
  const ISSERVER = typeof window === "undefined";

  const idPaciente = !ISSERVER
    ? localStorage.getItem("pacienteSeleccionId")
    : null;
  useLayout({
    label: "Turnos",
    titulo: "TURNOS",
    acciones: menuPacientes(),
  });
  return (
    <Grid container>
      <ListadoConsultorios />;
    </Grid>
  );
}
