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
        <Input label="Campo" campo="campo" />
      </Grid>
      <Grid item md={2}>
        <Input label="Valor Historico" campo="valorHistorico" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["SUMATORIA", "CONTADOR", "PROMEDIO"]}
          label="Asignacion"
          campo="asignacion"
        />
      </Grid>
      {values.asignacion === "SUMATORIA" && (
        <Grid item md={3}>
          <Input label="Nombre Campo incremento" campo="campoIncremento" />
          <Typography variant="caption">
            ** es solo util para el caso de los campos de tipo SUMATORIA
          </Typography>
        </Grid>
      )}

      <Grid item md={3}>
        <Switch label="Es Campo Array" campo="esCampoArray" />
      </Grid>
      {values.esCampoArray && (
        <Grid item md={4}>
          <Input label="Nombre campo array" campo="nombreCampoArray" />
        </Grid>
      )}
      <Grid item md={12}>
        <Input label="Condicion" campo="condicion" />
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
