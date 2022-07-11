import Grid from "@mui/material/Grid";
import Input from "../../forms/input";
import Switch from "../../forms/switch";

import SelectStatik from "../../forms/selectEstaticFormik";
export default function FormCategoriaSocio({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
      <Grid item md={12}>
        <Input campo="condicion" label="Condicion" />
      </Grid>
    </Grid>
  );
}
