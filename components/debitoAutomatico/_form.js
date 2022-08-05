import { Grid, Icon } from "@mui/material";

import { useState } from "react";

import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectTipoCuenta from "../cuentasCbu/selectTipoCuenta";
import ItemsModulo from "../forms/itemsModulo";
import Input from "../forms/input";
import FormItem from "./_formImputa";
import {
  ModeloImputaciones,
  valoresInicialesImputa,
} from "../../modelos/ModeloDebitoAutomatico";
import { getFechaString } from "../../helpers/dates";
import { GridActionsCellItem } from "@mui/x-data-grid";
import SelectFormaPago from "@components/formaPagos/selectFormaPago";
export default function FormCobranzaGrupal({ setFieldValue, values }) {
  const clickProcesar = (data) => (event) => {
    console.log(data);
  };
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
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "GENERADO", "PROCESANDO", "PROCESADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
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
