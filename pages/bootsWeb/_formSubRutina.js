import DataGridFormikItems from "@components/forms/dataGridFormik";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import { ModelRutinas } from "@modelos/ModeloBootsWeb";
export default function FormItem({ mod, values }) {
  const [muestraSalida, setMuestraSalida] = useState(values.esSalida);
  const [esMultiple, setEsMultiple] = useState(values.esMultiple);
  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <Input campo="accion" label="Accion" />
      </Grid>
      <Grid item md={5}>
        <Input campo="selector" label="selector" />
      </Grid>
      <Grid item md={5}>
        <Input campo="subAccion" label="Sub Accion" />
      </Grid>

      <Grid item md={5}>
        <Input campo="parametros" label="Parametro" />
      </Grid>
      <Grid item md={2}>
        <Switch campo="esEntrada" label="Es entrada" />
      </Grid>

      <Grid item md={2}>
        <Switch
          campo="esSalida"
          callbackChange={(check) => setMuestraSalida(check)}
          label="Es salida"
        />
      </Grid>
      <Grid item sx={{ display: muestraSalida ? "block" : "none" }} md={5}>
        <Input campo="nombreSalida" label="Nombre Salida" />
      </Grid>
    </Grid>
  );
}
