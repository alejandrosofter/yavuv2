import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={3}>
        <Input label="Valor" campo="valor" />
      </Grid>
    </Grid>
  );
}
