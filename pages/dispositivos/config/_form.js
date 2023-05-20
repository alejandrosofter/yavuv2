import DataGridFormikItems from "@components/forms/dataGridFormik";

import FormTipoEquipos from "./_formTipoEquipos";
import { ModeloTipoEquipos } from "../../../modelos/ModeloDispositivo";
import TabsFormik, { TabPanel } from "../../forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
export default function FormConfig({}) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Tipo de Equipos",
          nro: 0,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Tipo de Equipos"
                Modelo={ModeloTipoEquipos}
                FormularioItem={FormTipoEquipos}
                campo="itemsTipoEquipos"
                columns={[
                  { field: "nombre", headerName: "Nombre", width: 150 },

                  {
                    field: "cadaTiempoEnvia",
                    headerName: "Frecuencia",
                    width: 100,
                  },
                  { field: "camposEnvia", headerName: "Campos", width: 100 },
                ]}
              />
            </Grid>
          ),
        },
      ]}
    />
  );
}
