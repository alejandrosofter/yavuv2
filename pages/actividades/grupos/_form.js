import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectProfesor from "@pages/profesores/select";
export default function FormGrupo({ mod, setFieldValue, values }) {
  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item md={6}>
        <Input label="Nombre Grupo" campo="nombreGrupo" />
      </Grid>
      <Grid item md={5}>
        <SelectProfesor />
      </Grid>
      <Grid item md={2}>
        <Input label="Cupo" campo="cupo" />
      </Grid>
      <Grid item md={4}>
        <Input
          label="Cantidad Clases Mensuales"
          campo="cantidadClasesMensuales"
        />
      </Grid>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVA", "RECESO", "SUSPENDIDA"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={12}>
        <Input rows={3} multiline={true} label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
