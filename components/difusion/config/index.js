import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import DataGridFormikItems from "@components/forms/dataGridFormik";
import SelectPlantilla from "@components/plantillas/selectPlantilla";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import FormModulo from "./_formModulo";
import {
  ModeloConfigItems,
  valoresInicialesMods,
} from "@modelos/ModeloDifusion";
export default function ConfigDifusion(props) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Modulos",
          nro: 0,
          vista: (
            <DataGridFormikItems
              label="Modulos"
              Modelo={ModeloConfigItems}
              FormularioItem={FormModulo}
              valoresIniciales={valoresInicialesMods}
              campo="itemsModulos"
              columns={[
                {
                  field: "label_modulo",
                  headerName: "Nombre",
                  width: 250,
                  editable: true,
                },
                {
                  field: "label_destino",
                  headerName: "Destino",
                  width: 250,
                  editable: true,
                },
              ]}
            />
          ),
        },
        {
          label: "Impresiones",
          nro: 1,
          vista: (
            <Grid item md={12}>
              <Grid item md={8}>
                <Typography variant="caption" component="div" gutterBottom>
                  Plantilla de Emails
                </Typography>
                <SelectPlantilla
                  campo="plantillaEmailDifusion"
                  label="Plantilla Email de Difusion"
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
