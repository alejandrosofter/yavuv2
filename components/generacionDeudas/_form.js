import { CircularProgress, Grid, Stack, Tab, Typography } from "@mui/material";

import Input from "../forms/input";
import { useEffect, useState } from "react";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import SelectFormik from "../forms/select";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { getItemArray, getIndexItemArray } from "../../helpers/arrays";
import { useRouter } from "next/router";
const getItemsConceptos = (id, arr) => {
  const item = getItemArray({ data: arr, valor: id, campoId: "id" });

  if (item && item.config && item.config.itemsTipos)
    return item.config.itemsTipos;
  return [];
};
export default function FormGeneracionDeudas({ setFieldValue, values }) {
  return (
    <Grid sx={{ pt: 1, mb: 2 }} container rowSpacing={2} spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha Vto Debito" campo="fechaVto" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha Vto Otros" campo="fechaVtoOtros" />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "PROCESADA", "PROCESANDO", "ENVIADO"]}
          label="ESTADO"
          campo="estado"
        />
      </Grid>

      <Grid item md={6}>
        <Input label="Detalle Agregado (opcional)" campo="detalle" />
      </Grid>
    </Grid>
  );
}
