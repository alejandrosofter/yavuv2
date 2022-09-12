import { Grid, Stack, Typography } from "@mui/material";
import Input from "../forms/input";
export default function FormData({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={2}>
        <Input label="Campo Valor" campo="campoValue" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Label" campo="campoLabel" />
      </Grid>
      <Grid item md={2}>
        <Input label="Campo Fecha" campo="campoFecha" />
        <Typography variant="caption">
          ** PARA SACAR PERIDO, Si no se selecciona nada, se pone fecha del dia
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Input label="On Create (operacion asignacion)" campo="onCreate" />
      </Grid>
      <Grid item md={12}>
        <Input label="On Delete (operacion asignacion)" campo="onDelete" />
      </Grid>
      <Grid item md={12}>
        <Input label="On Update (operacion asignacion)" campo="onUpdate" />
      </Grid>
    </Grid>
  );
}
