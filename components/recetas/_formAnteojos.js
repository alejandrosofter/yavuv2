import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectOpcionesAnteojos from "./selectOpcionesAnteojos";
import InputOjo from "./_inputOjo";
import Switch from "@components/forms/switch";
import { FormAnteojo } from "./_formAnteojo";
export default function FormAnteojos({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>

      <Grid item md={10}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
      <Grid item md={6}>
        <FormAnteojo
          agregaCamposAdicion={true}
          label="Para Cerca"
          values={values}
          campo="cerca"
        />
      </Grid>
      <Grid item md={6}>
        <FormAnteojo label="Para Lejos" values={values} campo="lejos" />
      </Grid>
      <Grid item md={6}>
        <FormAnteojo
          label="Para Intermedio"
          values={values}
          campo="intermedio"
        />
      </Grid>
    </Grid>
  );
}
