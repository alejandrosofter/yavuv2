import { Grid, Stack } from "@mui/material";
import Input from "../forms/input";
import Switch from "../forms/switch";
import { useState } from "react";
import SelectTipoCuenta from "./selectTipoCuenta";
export default function Form({ mod, setFieldValue, values }) {
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
          <Grid item md={7}>
            <Input label="Titular" campo="titular" />
          </Grid>
          <Grid item md={5}>
            <Input label="Nro CBU" campo="cbu" />
          </Grid>
          <Grid item md={4}>
            <Input label="DNI Titular" campo="dniTitular" />
          </Grid>

          <Grid item md={5}>
            <SelectTipoCuenta label="Tipo Cuenta" campo="tipoCuenta" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
