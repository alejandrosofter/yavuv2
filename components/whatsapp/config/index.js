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
export default function ConfigWsap({}) {
  return (
    <Grid container>
      <TabsFormik
        label="Configs"
        vistas={[
          {
            label: "server",
            nro: 0,
            vista: (
              <Grid spacing={2} container>
                <Grid item md={3}>
                  <Typography variant="caption" component="div" gutterBottom>
                    ACTIVO
                  </Typography>
                  <Switch label="Esta Activo" campo="activo" />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="caption" component="div" gutterBottom>
                    URL HOST
                  </Typography>
                  <Input label="Host" campo="hosting" />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="caption" component="div" gutterBottom>
                    User
                  </Typography>
                  <Input label="Usuario" campo="user" />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="caption" component="div" gutterBottom>
                    Token
                  </Typography>
                  <Input label="Token" campo="token" />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="caption" component="div" gutterBottom>
                    Id BOT
                  </Typography>
                  <Input label="ID BOT" campo="idBot" />
                </Grid>
                <Grid item md={3}>
                  <Typography variant="caption" component="div" gutterBottom>
                    Url confirmacion turnos{" "}
                  </Typography>
                  <Input label="Url Confirmacion turno" campo="urlConfirm" />
                </Grid>
              </Grid>
            ),
          },
        ]}
      />
    </Grid>
  );
}
