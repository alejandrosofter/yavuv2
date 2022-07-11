import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";

import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import Input from "../forms/input";
import TarjetasEnvio from "./tarjetas";

export default function Form({ mod, setFieldValue, values, nuevo }) {
  const [condiciones, setCondiciones] = useState([]);
  const cambiaModulo = (id, item) => {
    console.log(item);

    if (item) setCondiciones(item.config?.itemsDifusion);
    else setCondiciones([]);
  };
  return (
    <Grid>
      <Stack>
        <Grid
          sx={{ pt: 1, pb: 1 }}
          md={12}
          container
          rowSpacing={2}
          spacing={2}
        >
          <Grid item md={2}>
            <SelectFecha label="Fecha" campo="fecha" />
          </Grid>

          <Grid item md={2}>
            <SelectEstaticFormik
              items={["ABIERTO", "ENVIADO", "ENTREGADO", "FINALIZADO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
          <Grid item md={3}>
            <Input label="Email Envio" campo="email" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
