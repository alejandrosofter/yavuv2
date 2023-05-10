import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material";

import Input from "@components/forms/input";
import { useEffect, useState } from "react";
import SwitchFormik from "../forms/switch";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import TitulosFormularios from "../forms/tituloFormularios";
import useSWR from "swr";
import { getIndexItemArray } from "../../helpers/arrays";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectCuentaBanco from "@components/cuentasEfectivo/selectCuentaBanco";

export default function FormGeneracionDeudas({
  setFieldValue,
  values,
  titulo,
  subTitulo,
  icono,
}) {
  const { data: itemsCuentas } = useCollection(`cuentasEfectivo`, {
    where: [["idUsuario", "==", fuego.auth().currentUser.uid]],
  });
  return (
    <Stack>
      <Grid container rowSpacing={2} spacing={2}>
        <Grid item md={6}>
          <Input label="Nombre" campo="nombreFormaPago" />
        </Grid>
        <Grid item md={3}>
          <SelectEstaticFormik
            items={["ACTIVO", "INACTIVO"]}
            label="ESTADO"
            campo="estado"
          />
        </Grid>
        <Grid item md={4}>
          <SelectCuentaBanco />
        </Grid>
      </Grid>
    </Stack>
  );
}
