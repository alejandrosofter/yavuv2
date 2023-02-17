import { Grid, Icon, Stack, Typography } from "@mui/material";

import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectTipoCuenta from "@components/cuentasCbu/selectTipoCuenta";
import Input from "../forms/input";

import { GridActionsCellItem } from "@mui/x-data-grid";
import SelectFormaPago from "@components/formaPagos/selectFormaPago";
export default function FormCobranzaGrupal({ setFieldValue, values }) {
  const clickProcesar = (data) => (event) => {};
  const accionesExtra = (data) => [
    <GridActionsCellItem
      icon={<Icon className="fas fa-plug" />}
      label="Procesar"
      key="accion_Procesar"
      onClick={clickProcesar(data)}
      color="inherit"
    />,
  ];
  return (
    <Grid sx={{ pt: 1, mb: 2 }} md={12} container rowSpacing={2} spacing={2}>
      <Grid item md={12}>
        <Stack>
          <Typography variant="caption">
            ** IMPORTANTE: El sistema buscara todas las deudas de socios que
            esten PENDIENTES,con DEBITO AUTOMATICO habilitado y que coincida con
            el campo Tipo Cuenta (banco)
          </Typography>
          <Typography variant="caption">
            ** IMPORTANTE: El campo FORMA DE PAGO sera la forma de pago que sera
            seteada en los COBROS efectivos una vez aplicados las respuestas de
            banco.
          </Typography>
        </Stack>
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "GENERADO", "PROCESANDO", "PROCESADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>

      <Grid item md={2}>
        <SelectFecha label="1er VTO" campo="primerVto" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="2do VTO" campo="segundoVto" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="3er VTO" campo="tercerVto" />
      </Grid>
      <Grid item md={2}>
        <Input label="CUIT Empresa" campo="cuit" />
      </Grid>
      <Grid item md={2}>
        <SelectFormaPago label="Forma de Pago" campo="formaPago" />
      </Grid>
      <Grid item md={3}>
        <SelectTipoCuenta label="Tipo Cuenta" campo="tipoCuenta" />
      </Grid>
    </Grid>
  );
}
