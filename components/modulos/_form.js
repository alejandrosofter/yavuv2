import DataGridFormikItems from "@components/forms/dataGridFormik";

import SelectPlantilla from "@components/plantillas/selectPlantilla";
import Switch from "@components/forms/switch";
import Modelo, { valoresIniciales } from "@modelos/ModeloModulos";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { Button, Icon, Typography } from "@mui/material";
import {
  ModeloPermisos,
  valoresInicialesPermisos,
} from "@modelos/ModeloUsuariosInvitados";
import FormPermiso from "@components/usuariosInvitados/_formPermiso";
import SelectMenuGrupo from "./selectGrupo";

export default function FormConfig({ values }) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Gral",
          nro: 0,
          vista: (
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Input label="Nombre " campo="nombre" />
              </Grid>
              <Grid item xs={2}>
                <Input label="Icono (awesome iconos)" campo="icono" />
              </Grid>
              <Grid item xs={1}>
                <Icon
                  sx={{ mt: 3 }}
                  fontSize="large"
                  className={values?.icono}
                />
              </Grid>

              <Grid item xs={4}>
                <Input label="Label" campo="label" />
              </Grid>

              <Grid item md={4}>
                <SelectMenuGrupo />
              </Grid>
              <Grid item xs={5}>
                <Input label="Detalle" campo="detalle" />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Permisos",
          nro: 1,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Permisos"
                Modelo={ModeloPermisos}
                valoresIniciales={valoresInicialesPermisos}
                FormularioItem={FormPermiso}
                campo="permisos"
                columns={[
                  { field: "coleccion", headerName: "Coleccion", width: 180 },
                  { field: "lectura", headerName: "Lectura", width: 100 },

                  {
                    field: "escritura",
                    headerName: "Escritura",
                    width: 150,
                  },
                  {
                    field: "quitar",
                    headerName: "Quitar",
                    width: 150,
                  },
                ]}
              />
            </Grid>
          ),
        },
      ]}
    />
  );
}
