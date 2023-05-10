import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={3}>
        <Input label="Campo Valor" campo="campoValue" />
      </Grid>
      <Grid item md={3}>
        <Input label="Campo Label" campo="campoLabel" />
      </Grid>

      <Grid item md={3}>
        <Switch label="Tiene Condicion" campo="tieneCondicion" />
      </Grid>
      {values.tieneCondicion && (
        <Grid item md={12}>
          <Input label="Condicion" campo="condicion" />
        </Grid>
      )}

      <Grid item md={12}>
        <Input label="On Create (operacion asignacion)" campo="onCreate" />
      </Grid>
      <Grid item md={12}>
        <Input label="On Delete (operacion asignacion)" campo="onDelete" />
      </Grid>
      <Grid item md={12}>
        <Input label="On Update (operacion asignacion)" campo="onUpdate" />
      </Grid>
      <Grid item md={4}>
        <Input label="Acumulado TOTAL" campo="acumulado" />
      </Grid>
      {/* <Grid item md={4}>
        <Input label="Condicion Desde" campo="condicionDesde" />
      </Grid>
      <Grid item md={2}>
        <Input label="Condicion Signo" campo="condicionSigno" />
      </Grid>
      <Grid item md={4}>
        <Input label="Condicion Hasta" campo="condicionHasta" />
      </Grid> */}
    </Grid>
  );
}
