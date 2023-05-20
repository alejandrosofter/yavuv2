import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import ItemsModulo from "@components/forms/itemsModulo";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function Form({ mod, setFieldValue, values }) {
  const callbackacepta = (values) => {};
  return (
    <Grid spacing={2} container>
      <Grid item md={2}>
        <Input label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={4}>
        <Input label="Presentacion" campo="presentacion" />
      </Grid>
      <Grid item md={1}>
        CADA
      </Grid>
      <Grid item md={2}>
        <Input label="Hrs" campo="hrs" />
      </Grid>
    </Grid>
  );
}
