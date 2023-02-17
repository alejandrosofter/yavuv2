import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";

import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import Input from "../forms/input";
import Switch from "../forms/switch";
import TarjetasEnvio from "./tarjetas";

export default function Form({ mod, setFieldValue, values, nuevo }) {
  const [condiciones, setCondiciones] = useState([]);
  const cambiaModulo = (id, item) => {
    if (item) setCondiciones(item.config?.itemsDifusion);
    else setCondiciones([]);
  };
  return (
    <Grid spacing={2} container>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <Switch label="Recibidas?" campo="recibidas" />
      </Grid>
      {values.recibidas && (
        <Grid item md={2}>
          <SelectFecha label="Fecha Recibidas" campo="fechaRecibidas" />
        </Grid>
      )}

      <Grid item md={2}>
        <SelectEstaticFormik
          items={["ABIERTO", "ENVIADO", "ENTREGADO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Input label="Email Envio" campo="email" />
      </Grid>
    </Grid>
  );
}
