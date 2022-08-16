import ItemsModulo from "@components/forms/itemsModulo";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";

import { Grid, Stack } from "@mui/material";
import { useState } from "react";
import Input from "../forms/input";
import FormItem from "./_formItem";
import { valoresInicialesItems, ModeloItems } from "@modelos/ModeloExportador";
import SelectMod from "@components/mod/selectMod";
export default function Form({ setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={3}>
        <Input label="Nombre" campo="nombre" />
      </Grid>
      <Grid item md={3}>
        <SelectMod />
      </Grid>
      <Grid item md={12}>
        <ItemsModulo
          setFieldValue={setFieldValue}
          campo="campos"
          data={values?.campos}
          modelo={ModeloItems}
          nombreModulo="CAMPOS"
          fullWidth={true}
          maxWidth={"md"}
          textoEditar={`Puedes cambiar los items:`}
          textoAgregar={`Ingrese los datos del item`}
          valoresIniciales={valoresInicialesItems}
          form={<FormItem />}
          dataModulo={[]}
          columnas={[
            {
              field: "nombreCampo",
              headerName: "Nombre Campo",
              editable: false,
              width: 200,
            },
            {
              field: "condicion",
              headerName: "Condicion",
              editable: false,
              width: 100,
            },
            {
              field: "tipoDato",
              headerName: "Tipo dato",
              editable: false,
              width: 100,
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
