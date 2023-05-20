import { useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import {
  DataPaciente,
  ListaRecetas,
  TurnosPaciente,
} from "@pages/pacientes/fichaPaciente";
import { Grid } from "@mui/material";
import TabsFormik from "@components/forms/tab";

export default function FichaPaciente({}) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: paciente,
    isLoading,
    isError,
  } = useDocument(`pacientes/${id}`, {
    listen: true,
  });

  if (!paciente) return "Seleccione un Paciente!";
  if (!paciente.exists) return "El paciente no existe";
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <DataPaciente paciente={paciente} />
      </Grid>
      <Grid item md={12}>
        <TabsFormik
          label="Datos"
          vistas={[
            {
              label: "Recetas",
              nro: 0,
              icono: "fas fa-file-medical",
              vista: <ListaRecetas paciente={paciente} />,
            },
            {
              label: "Turnos",
              nro: 1,
              icono: "fas fa-calendar",
              vista: <TurnosPaciente paciente={paciente} />,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
