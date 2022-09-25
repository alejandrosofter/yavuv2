import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectEstudios from "./selectEstudio";

export default function FormEstudios({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={8}>
        <SelectEstudios />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
