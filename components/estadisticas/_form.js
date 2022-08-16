import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import Input from "../forms/input";
import Switch from "../forms/switch";
import SelecListeningData from "@components/listeningData/selectListening";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
export default function Form({ setFieldValue, values }) {
  const cambiaListening = (val, item) => {
    if (item) {
      setFieldValue(`campos`, item.campos);
      setFieldValue(`comienzaHistorico`, item.comienzaHistorico);
    }
  };
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>

      <Grid item md={3}>
        <SelecListeningData callbackchange={cambiaListening} />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["ACTIVA", "INACTIVA"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["MENSUAL", "DIARIO", "ANUAL"]}
          label="Periodicidad"
          campo="periodicidad"
        />
      </Grid>
      <Grid item md={3}>
        <Switch label="Comienza Acumulado" campo="comienzaAcumulado" />
        <Typography variant="caption">
          Al seleccionar esta opcion, se comenzara el periodo con el conteo
          total historico
        </Typography>
      </Grid>
      <Grid item md={9}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
