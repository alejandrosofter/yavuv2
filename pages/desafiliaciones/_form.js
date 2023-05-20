import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import BuscadorSocios from "@pages/socios/buscadorSocios";
import SelectSocio from "@pages/socios/selectSocio";
import BuscadorSociosInput from "@pages/socios/_buscador";

import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import Input from "@components/forms/input";
import SelectMotivoDesafiliacion from "./selectMotivo";

export default function Form({ mod, setFieldValue, values, nuevo }) {
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

          <Grid item md={6}>
            <SelectSocio label="Socio" campo="socio" />
          </Grid>
          <Grid item md={3}>
            <SelectMotivoDesafiliacion
              mod={mod}
              label="Motivo"
              campo="motivo"
            />
          </Grid>
          <Grid item md={2}>
            <SelectEstaticFormik
              items={["PENDIENTE", "CANCELADO"]}
              label="Estado"
              campo="estado"
            />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
