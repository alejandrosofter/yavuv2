import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import { useCollection } from "@nandorojo/swr-firestore";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { fuego } from "@nandorojo/swr-firestore";
import SelectPromocion from "@pages/promociones/selectPromocion";
export default function FormPromocionesSocio({ values, setFieldValue }) {
  const { data: promociones } = useCollection(`promociones`, {
    listen: true,
    where: [
      "idUsuario",
      "==",
      localStorage.getItem("usermod")
        ? localStorage.getItem("usermod")
        : fuego.auth().currentUser.uid,
    ],
  });
  if (!promociones) return "Cargando Promos...";

  return (
    <Grid sx={{ p: 2 }} container spacing={2}>
      <Grid item sx={{ flex: 1 }} md={4}>
        <SelectFecha label="Fecha " campo="fechaInicio" />
      </Grid>
      <Grid item md={4}>
        <Switch label="Tiene Vto?" campo="tieneVto" />
      </Grid>
      {values.tieneVto && (
        <Grid item sx={{ flex: 1 }} md={4}>
          <SelectFecha label="Vto" campo="fechaVto" />
        </Grid>
      )}
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={8}>
        <SelectPromocion />
      </Grid>

      <Grid item md={12}>
        <Input label="Detalle " campo="detalle" />
      </Grid>
    </Grid>
  );
}
