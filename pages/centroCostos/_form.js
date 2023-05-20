import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";

export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Input label="Centro de Costo" campo="nombreCentroCosto" />
      </Grid>
    </Grid>
  );
}
