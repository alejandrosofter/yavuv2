import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";

import SelectStatik from "@components/forms/selectEstaticFormik";
export default function Form({
  dataModulo,
  modelo,
  clickAceptar,
  valoresIniciales,
}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <SelectStatik
          items={["CUOTA SOCIAL", "ACTIVIDADES"]}
          campo="nombre"
          label="Nombre"
        />
      </Grid>

      <Grid item md={6}>
        <Switch campo="activo" label="Activo" />
      </Grid>
      <Grid item md={6}>
        <Input campo="destino" label="Destino Deuda" />
      </Grid>
    </Grid>
  );
}
