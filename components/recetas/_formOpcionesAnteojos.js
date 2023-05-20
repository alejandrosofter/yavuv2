import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";

export default function FormOpcionesAnteojos({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
    </Grid>
  );
}
