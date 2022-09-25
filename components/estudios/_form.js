import { Grid, Stack, Typography } from "@mui/material";
import Input from "../forms/input";
import Switch from "@components/forms/switch";
import ItemsModulo from "@components/forms/itemsModulo";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function Form({ mod, setFieldValue, values }) {
  const callbackacepta = (values) => {};
  return (
    <Grid spacing={2} container>
      <Grid item md={8}>
        <Input label="Nombre Estudio" campo="nombre" />
      </Grid>
    </Grid>
  );
}
