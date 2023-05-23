import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormItem from "./_form";
import { ModeloBootWeb } from "@modelos/ModeloPacientes";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
export default function ConfigActividadad({}) {
  return (
    <Grid container>
      <TabsFormik
        label="Configs"
        vistas={[
          {
            label: "Acciones Web",
            nro: 0,
            vista: (
              <DataGridFormikItems
                label="Acciones WEB"
                Modelo={ModeloBootWeb}
                FormularioItem={FormItem}
                campo="itemsBootsWeb"
                columns={[
                  {
                    field: "label_bootWeb",
                    headerName: "Boot Web",
                    width: 150,
                  },
                  {
                    field: "parametros",
                    headerName: "Parametros",
                    width: 350,
                  },
                ]}
              />
            ),
          },
        ]}
      />
    </Grid>
  );
}
