import { Grid, Stack, Typography } from "@mui/material";
import Input from "../forms/input";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid sx={{ pt: 1, pb: 1 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={10}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={2}>
        <Input label="Codigo" campo="codigoInterno" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe" campo="importe" />
      </Grid>
      <Grid item md={2}>
        <Input label="Cant x" campo="cantidad" />
      </Grid>
      <Grid item md={8}>
        <Input label="Nombre Corto" campo="nombreCorto" />
      </Grid>
      <Grid item md={12}>
        <Typography variant="caption">
          AYUDA: si no tiene cantidad significa que es por 1{" "}
        </Typography>
      </Grid>
    </Grid>
  );
}
