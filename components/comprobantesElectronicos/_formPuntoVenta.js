import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
export default function FormPuntoVenta({ setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={4}>
        <Input label="Nro" campo="nro" />
      </Grid>
    </Grid>
  );
}
