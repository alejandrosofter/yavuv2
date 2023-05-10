import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";

export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={1} sx={{ p: 1 }}>
      <Grid item md={4}>
        <Input label="Razon Social" campo="razonSocial" />
      </Grid>

      <Grid item md={2}>
        <Input label="Cuit" campo="cuit" />
      </Grid>
      <Grid item md={3}>
        <Input label="Telefono" campo="telefono" />
      </Grid>
      <Grid item md={4}>
        <Input label="Email" campo="email" />
      </Grid>
    </Grid>
  );
}
