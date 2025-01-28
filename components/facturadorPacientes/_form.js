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
  const cambiaCantidad = (e) => {
    const cant = Number(e.target.value);

    setFieldValue(
      "importe",
      cant * values.prestaciones.find((p) => p.id === values.id)?.importe
    );
  };

  return (
    <Grid container spacing={2}>
      {/* <Grid item md={2}></Grid> */}
      <Grid item md={2}>
        <Input onChange={cambiaCantidad} label="Cantidad" campo="cantidad" />
      </Grid>
      <Grid item md={2}>
        <Input label="Codigo" campo="codigo" />
      </Grid>
      <Grid item md={3}>
        <Input label="Importe" campo="importe" />
      </Grid>

      <Grid item md={12}>
        <Input label="Observaciones" campo="observaciones" />
      </Grid>
      <Grid item md={12}>
        <Button variant="contained" fullWidth onClick={clickAccept}>
          Aceptar
        </Button>
      </Grid>
    </Grid>
  );
}
