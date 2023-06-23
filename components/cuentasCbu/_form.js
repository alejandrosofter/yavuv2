import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import { useState } from "react";
import SelectTipoCuenta from "./selectTipoCuenta";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { calcularCuil } from "@helpers/Strings";
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
            <SelectEstaticFormik
              items={["MASCULINO", "FEMENINO", "EMPRESA"]}
              label="Tipo Titular"
              campo="tipo"
            />
          </Grid>
          <Grid item md={4}>
            <Typography variant="caption">
              CUIL: {calcularCuil(values.tipo, values.dniTitular)}
            </Typography>
          </Grid>

          <Grid item md={5}>
            <SelectTipoCuenta label="Tipo Cuenta" campo="tipoCuenta" />
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
}
