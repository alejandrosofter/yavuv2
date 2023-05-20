import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProfesor from "@pages/profesores/select";
import SelectFecha from "@components/forms/selectorFecha";
import ColeccionTable from "@components/forms/coleccionTable";
export default function Form({
  mod,
  setFieldValue,
  values,
  doc,
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
  return (
    <Grid container sx={{ p: 2 }} rowSpacing={2} spacing={2}>
      <Grid item md={6}>
        <SelectFecha label="Desde" campo="fechaDesde" />
      </Grid>
      <Grid item md={6}>
        <SelectFecha label="Hasta" campo="fechaHasta" />
      </Grid>
      <Grid item md={6}>
        <SelectEstaticFormik
          items={["PENDIENTE", "CERRADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
    </Grid>
  );
}
