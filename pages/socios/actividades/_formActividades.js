import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";
import SwitchFormik from "../../forms/switch";
import SelectProducto from "@components/productos/selectProducto";
import SelectFecha from "../../forms/selectorFecha";
import _FormItem from "../../forms/subColeccion/_formItem";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectFormik from "../@components/forms/select2Formik";
import { getItemArray } from "../../../helpers/arrays";
import SelectEstaticFormik from "../@components/forms/selectEstaticFormik";
export default function FormActividadesSocio({
  values,
  registro,
  setFieldValue,
}) {
  const { data: actividades } = useCollection(`actividades`);
  const cambiaActividad = (newValue, item) => {
    if (item) {
      setFieldValue("idProducto", item.idProducto);
      setFieldValue("idProducto_importe", item.idProducto_importe);
      setFieldValue("label_idProducto", item.label_idProducto);
    }
  };
  if (!actividades) return "Cargando Acts...";

  return (
    <Grid container rowSpacing={2} spacing={2}>
      <Grid item sx={{ flex: 1 }} md={3}>
        <SelectFecha label="Fecha " campo="fechaInicio" />
      </Grid>
      <Grid item md={4}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>

      <Grid item md={8}>
        <SelectFormik
          label="Actividad"
          lista={actividades}
          campoLabel="nombreActividad"
          callbackchange={cambiaActividad}
          campoId="id"
          campo="idActividad"
        />
      </Grid>
    </Grid>
  );
}
