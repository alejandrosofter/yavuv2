import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormItem from "./_form";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import FormCategoria from "./_formCategoria";
import { ModeloConfig } from "@modelos/ModeloSocios";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
export default function ConfigWhatsapp({}) {
  return (
    <Grid container>
      <TabsFormik
        label="Configs"
        vistas={[
          {
            label: "Mensajes",
            nro: 3,
            vista: (
              <Grid spacing={2} container>
                <Grid item md={3}>
                  <Switch
                    label="Notificar por Whatsapp"
                    campo="whatsapp_notificar"
                  />
                </Grid>
                <Grid item md={2}>
                  <Input
                    label="Dias antes del turno"
                    campo="whatsapp_diasAntesTurno"
                  />
                </Grid>
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
}
