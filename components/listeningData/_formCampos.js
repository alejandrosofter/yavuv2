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
        <Input label="Campo" campo="campo" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["SUMATORIA", "CONTADOR", "PROMEDIO"]}
          label="Asignacion"
          campo="asignacion"
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Condicion" campo="condicion" />
      </Grid>
    </Grid>
  );
}
