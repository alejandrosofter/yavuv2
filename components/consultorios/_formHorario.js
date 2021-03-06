import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";

import SelectDias from "./selectDias";
import SelectTipoTurno from "@components/turnos/selectTipoTurno";
import TimePickerFormik from "@components/forms/timePickerFormik";

export default function FormularioItemActividad({ profesores, mod }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        DESDE Y HASTA debe tener el formato HH:MM!
      </Grid>
      <Grid item md={2}>
        <TimePickerFormik campo="desde" label="Desde" />
      </Grid>
      <Grid item md={2}>
        <TimePickerFormik campo="hasta" label="Hasta" />
      </Grid>

      <Grid item md={2}>
        <Input campo="duracion" label="Duracion Mins." />
      </Grid>
      <Grid item md={3}>
        <SelectTipoTurno />
      </Grid>
      <Grid item md={5}>
        <SelectDias />
      </Grid>
    </Grid>
  );
}
