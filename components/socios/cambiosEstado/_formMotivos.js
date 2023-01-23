import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Input from "@components/forms/input";
import SelectFormik from "@components/forms/select2Formik";
import SelectStaticFormik from "@components/forms/selectEstaticFormik";

import SelectFecha from "@components/forms/selectorFecha";
import _FormItem from "@components/forms/subColeccion/_formItem";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function Form(props) {
  return (
    <Grid sx={{ p: 2 }} spacing={2} container>
      <Grid item md={6}>
        <SelectEstaticFormik
          items={["ALTA", "BAJA (ultimo mes)", "BAJA DEFINITIVA", "SUSPENDIDO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={12}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
    </Grid>
  );
}
