import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab, Icon } from "@mui/material";
import Input from "@components/forms/input";
import { ModeloAcciones, valoresInicialesItems } from "@modelos/ModeloModulos";

import ItemsModulo from "@components/forms/itemsModulo";
import _FormItemAccion from "./_formItemAccion";

export default function FormMod({ values, setFieldValue }) {
  const [tabDatos, setTabDatos] = useState("datos");

  const cambiaTab = (event, newValue) => {
    setTabDatos(newValue);
  };
  const field = "acciones";
  const label = "ACCIONES";
  const cols = [
    {
      field: "nombre",
      headerName: "Nombre",
      editable: false,
      width: 100,
    },

    {
      field: "label",
      headerName: "Label",
      editable: false,
      width: 80,
    },
    {
      field: "icono",
      headerName: "Icono",
      width: 80,
      renderCell: (params) => {
        return <Icon className={params.formattedValue} />;
      },
    },
    {
      field: "descripcion",
      headerName: "Descripcion",
      editable: false,
      width: 180,
    },
    {
      field: "url",
      headerName: "Url",
      editable: false,
      width: 280,
    },
    {
      field: "color",
      headerName: "Color",
      editable: false,
      width: 80,
    },
    {
      field: "method",
      headerName: "Metodo",
      editable: false,
      width: 80,
    },
    {
      field: "esRegistro",
      headerName: "Es Registro?",
      width: 60,
      valueFormatter: ({ value }) => (value ? "SI" : "NO"),
    },
    {
      field: "esFuncion",
      headerName: "Es Funcion?",
      width: 60,
      valueFormatter: ({ value }) => (value ? "SI" : "NO"),
    },
  ];
  return (
    <TabContext value={tabDatos}>
      <Grid md={12} item xs={9}>
        <TabList
          onChange={cambiaTab}
          key="accionesModulo"
          aria-label="Acciones Modulo"
        >
          <Tab label="Datos" value="datos" />
          <Tab
            label={`Acciones (${
              values?.acciones ? values.acciones.length : 0
            })`}
            value="acciones"
          />
        </TabList>
        <TabPanel value="datos">
          <Grid
            sx={{ pt: 4 }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          >
            <Grid item xs={3}>
              <Input label="Nombre " campo="nombre" />
            </Grid>
            <Grid item xs={2}>
              <Input label="Icono (awesome iconos)" campo="icono" />
            </Grid>
            <Grid item xs={1}>
              <Icon sx={{ mt: 3 }} fontSize="large" className={values?.icono} />
            </Grid>

            <Grid item xs={4}>
              <Input label="Nombre Modulo" campo="nombreModulo" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Coleccion" campo="coleccion" />
            </Grid>
            <Grid item xs={5}>
              <Input label="Detalle" campo="detalle" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="acciones">
          <Grid md={12} xs={12}>
            <ItemsModulo
              setFieldValue={setFieldValue}
              campo={field}
              data={values[field]}
              modelo={ModeloAcciones}
              nombreModulo={label}
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las acciones del registro:`}
              textoAgregar={`Ingrese los datos del registro`}
              valoresIniciales={valoresInicialesItems}
              form={<_FormItemAccion mod={mod} />}
              dataModulo={[]}
              columnas={cols}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </TabContext>
  );
}
