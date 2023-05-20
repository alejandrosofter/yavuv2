import Grid from "@mui/material/Grid";

import Input from "@components/forms/input";

export default function FormPermiso({ values, setFieldValue }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Coleccion " campo="coleccion" />
      </Grid>
      <Grid item md={2}>
        <Input campo="lectura" label="Lectura" />
      </Grid>
      <Grid item md={2}>
        <Input campo="escritura" label="Escritura" />
      </Grid>
      <Grid item md={2}>
        <Input campo="quitar" label="Quitar" />
      </Grid>
    </Grid>
  );
}
