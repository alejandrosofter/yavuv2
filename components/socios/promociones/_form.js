import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "../../forms/input";
import { useCollection } from "@nandorojo/swr-firestore";

import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem";
import useSWR from "swr";
import SelectFormik from "../../forms/select";
import { getIndexItemArray } from "../../../helpers/arrays";
import SelectEstaticFormik from "../../forms/selectEstaticFormik";
import { fuego } from "@nandorojo/swr-firestore";
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
      <Grid item sx={{ flex: 1 }} md={6}>
        <SelectFecha label="Fecha " campo="fechaInicio" />
      </Grid>
      <Grid item sx={{ flex: 1 }} md={6}>
        <SelectFecha label="Vto" campo="fechaVto" />
      </Grid>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={5}>
        <SelectFormik
          label="Promocion"
          lista={promociones}
          campoLabel="nombrePromocion"
          campoId="id"
          campo="idPromocion"
        />
      </Grid>

      <Grid item md={12}>
        <Input label="Detalle " campo="detalle" />
      </Grid>
    </Grid>
  );
}
