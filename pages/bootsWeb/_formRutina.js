import DataGridFormikItems from "@components/forms/dataGridFormik";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Input from "@components/forms/input";
import Switch from "../forms/switch";
import { ModelRutinas } from "@modelos/ModeloBootsWeb";
import FormSubRutina from "./_formSubRutina";
export default function FormItem({ mod, values }) {
  const [muestraSalida, setMuestraSalida] = useState(values.esSalida);
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
      <Grid item md={2}>
        <Switch campo="tieneSubRutinas" label="Sub Rutinas" />
      </Grid>
      <Grid
        sx={{ display: values.tieneSubRutinas ? "block" : "none" }}
        md={12}
        item
      >
        <DataGridFormikItems
          label="SUB RUTINAS"
          Modelo={ModelRutinas}
          FormularioItem={FormSubRutina}
          campo="subRutinas"
          columns={[
            { field: "accion", headerName: "Accion", width: 120 },
            { field: "selector", headerName: "Selector", width: 120 },
            { field: "subAccion", headerName: "SubAccion", width: 120 },
            { field: "parametros", headerName: "Parametros", width: 120 },
            { field: "esEntrada", headerName: "Es Entrada", width: 120 },
            { field: "esSalida", headerName: "Salida?", width: 120 },
          ]}
        />
      </Grid>
    </Grid>
  );
}
