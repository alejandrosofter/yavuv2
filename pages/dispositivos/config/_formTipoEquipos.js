import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import Select2 from "../@components/forms/select2Formik";
import Switch from "../../forms/switch";
export default function Form({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="nombre" label="Nombre" />
      </Grid>

      <Grid item md={2}>
        <Switch campo="esTrigger" label="Es Trigger" />
      </Grid>
      <Grid item md={6}>
        <Input campo="cadaTiempoEnvia" label="Envia Cada..." />
      </Grid>
      <Grid item md={6}>
        <Input campo="camposEnvia" label="Campos" />
      </Grid>
      <Grid item md={3}>
        <Input label="Cantidad Disparadores" campo="cantidadDisparadores" />
      </Grid>
    </Grid>
  );
}
