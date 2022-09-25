import { Grid, Stack, Typography } from "@mui/material";
import Input from "../forms/input";
import Switch from "@components/forms/switch";
import ItemsModulo from "@components/forms/itemsModulo";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function Form({ mod, setFieldValue, values }) {
  const callbackacepta = (values) => {};
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Input label="Nombre Comercial" campo="nombre" />
      </Grid>
      <Grid item md={3}>
        <Input label="Nombre Generico" campo="nombreGenerico" />
      </Grid>
      <Grid item md={3}>
        <Input label="Presentacion" campo="presentacion" />
      </Grid>
      <Grid item md={12}>
        <Input label="Posología" campo="posologia" />
      </Grid>
    </Grid>
  );
}
