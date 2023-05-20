import ColeccionTable from "@components/forms/coleccionTable";
import DialogContenido from "@components/forms/dialogContenido";
import NuevoGenerico from "@components/NuevoGenerico2";
import {
  ModeloCierreAsistencias,
  valoresInicialesCierreAsistencias,
} from "@modelos/ModeloGrupos";
import { Typography, Grid } from "@mui/material";

import Form from "./_form";

export default function ResultadosAsistencias({
  open,
  setOpen,
  actividad,
  grupo,
  cierre,
}) {
  const columns = [
    {
      field: "apellido",
      headerName: "Inscripto",
      width: 200,
      renderCell: (params) => `${params.row.apellido} ${params.row.nombre}`,
    },

    {
      field: "cantidadAsistencias",
      headerName: "Asistencias",
      width: 150,
      renderCell: (params) =>
        `${params.row.cantidadAsistencias} asistencias (${params.row.cantidadAsistenciasMinimas} min)`,
    },
    {
      field: "generaDeuda",
      headerName: "Genera Deuda",
      width: 140,
      renderCell: (params) => `${params.value ? "Si" : "No"}`,
    },
  ];
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="sm"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6">RESULTADOS DE ASISTENCIA</Typography>
        </Grid>
        <Grid item xs={12}>
          <ColeccionTable
            columns={columns}
            orderBy="apellido"
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/cierreAsistencias/${cierre?.id}/resultados`}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
