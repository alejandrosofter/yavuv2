import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab, Icon } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import { ModeloAcciones, valoresInicialesItems } from "@modelos/ModeloModulos";

import ItemsModulo from "@components/forms/itemsModulo";
import _FormItemAccion from "./_formItemAccion";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectMenuGrupo from "./selectGrupo";

export default function _FormModulos({ values, setFieldValue }) {
  const [tabDatos, setTabDatos] = useState("datos");

  const cambiaTab = (event, newValue) => {
    setTabDatos(newValue);
  };

  return (
    <TabContext value={tabDatos}>
      <Grid xs={9}>
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
              <Input label="Label" campo="label" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Coleccion" campo="coleccion" />
            </Grid>
            <Grid item xs={3}>
              <Switch label="Es Frecuente?" campo="frecuente" />
            </Grid>
            <Grid item md={4}>
              <SelectMenuGrupo />
            </Grid>
            <Grid item xs={5}>
              <Input label="Detalle" campo="detalle" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="acciones">
          <Grid item xs={12}>
            <ItemsModulo
              setFieldValue={setFieldValue}
              campo="acciones"
              data={values?.acciones}
              modelo={ModeloAcciones}
              nombreModulo="ACCIONES"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las acciones de esta accion:`}
              textoAgregar={`Ingrese los datos de la accion`}
              valoresIniciales={valoresInicialesItems}
              form={<_FormItemAccion />}
              dataModulo={[]}
              columnas={[
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
              ]}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </TabContext>
  );
}
