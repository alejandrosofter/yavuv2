import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectMedicamentos from "./selectMedicamento";

export default function FormMedicamentos({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={8}>
        <SelectMedicamentos />
      </Grid>
      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
