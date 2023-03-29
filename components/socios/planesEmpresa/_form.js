import { Grid } from "@mui/material";

import SwitchFormik from "@components/forms/switch";

import SelectFecha from "@components/forms/selectorFecha";
import Input from "@components/forms/input";
export default function FormPlan({ values, setFieldValue }) {
  return (
    <Grid container>
      <Grid item md={7}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
    </Grid>
  );
}
