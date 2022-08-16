import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";

import SelectStatik from "@components/forms/selectEstaticFormik";
export default function FormCategoriaSocio({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="detalle" label="Detalle" />
      </Grid>
      <Grid item md={2}>
        <Switch campo="default" label="Default" />
      </Grid>
    </Grid>
  );
}
