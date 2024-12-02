import { Button, Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectFecha from "@components/forms/selectorFecha";
import SelectPrestaciones from "@components/prestaciones/selectPrestacion";
import { getFechaString } from "@helpers/dates";
import { useCollection, useDocument } from "@nandorojo/swr-firestore";

import SelectObraSocial from "@components/obrasSociales/selectObraSocial";
import { useEffect, useState } from "react";
import Switch from "@components/forms/switch";
import RadioButtons from "@components/forms/radioButtons";
import { Form, Formik, useFormikContext } from "formik";
import Select2Simple from "@components/forms/select2Simple";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";

export default function FormFacturacion({ initialValues, onAccept }) {
  return (
    <Formik initialValues={initialValues}>
      <Form onSubmit={(values) => console.log(values)}>
        <_Form onAccept={onAccept} />
      </Form>
    </Formik>
  );
}
export function _Form({ onAccept }) {
  const { values, setFieldValue } = useFormikContext();
  const clickAccept = (e) => {
    if (onAccept) onAccept(values);
  };
  return (
    <Grid container spacing={2}>
      {/* <Grid item md={2}></Grid> */}
      <Grid item md={2}>
        <Input label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={2}>
        <Input label="Codigo" campo="codigo" />
      </Grid>
      <Grid item md={2}>
        <Input label="Importe" campo="importe" />
      </Grid>

      <Grid item md={5}>
        <SelectEstaticFormik
          items={["PENDIENTE", "ACEPTADO", "CANCELADO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={12}>
        <Button variant="contained" fullWidth onClick={clickAccept}>
          Aceptar
        </Button>
      </Grid>
    </Grid>
  );
}
