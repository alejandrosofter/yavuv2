import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProfesor from "@pages/profesores/select";
import SelectFecha from "@components/forms/selectorFecha";
import ColeccionTable from "@components/forms/coleccionTable";
export default function FormGrupo({
  mod,
  setFieldValue,
  values,
  actividad,
  grupo,
}) {
  const cambiaSeleccionItems = (data, ids) => {
    setFieldValue("integrantesAsistencia", ids);
  };
  const columns = [
    {
      field: "label_socio",
      headerName: "Inscripto",
      width: 300,
      renderCell: (params) => `${params.row.apellido} ${params.row.nombre}`,
    },
  ];
  const cambiaFecha = (data) => {
    localStorage.setItem("asistencia_fecha", data);
  };
  return (
    <Grid container sx={{ p: 2 }} rowSpacing={2} spacing={2}>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["NORMAL", "SIN CLASES", "SUSPENDIDA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={6}>
        <SelectFecha callbackChange={cambiaFecha} label="Fecha" campo="fecha" />
      </Grid>

      <Grid item md={12}>
        <ColeccionTable
          fullWidth
          columns={columns}
          initialValuesChecks={values.integrantesAsistencia}
          onSelectionModelChange={cambiaSeleccionItems}
          checkboxSelection
          orderBy="apellido"
          coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/integrantes/`}
        />
      </Grid>
    </Grid>
  );
}
