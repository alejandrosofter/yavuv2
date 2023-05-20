import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import SwitchFormik from "@components/forms/switch";

export default function FormTipoPeriodos({}) {
  return (
    <Grid container spacing={2}>
      <Grid item md={6}>
        <Input campo="nombre" label="Nombre" />
      </Grid>
      <Grid item md={6}>
        <SwitchFormik campo="esConAsistencia" label="Con Asistencia" />
      </Grid>
      <Grid item md={2}>
        <Input campo="cantidadMinimaAsistencias" label="Cant. Min/deuda" />
      </Grid>
    </Grid>
  );
}
