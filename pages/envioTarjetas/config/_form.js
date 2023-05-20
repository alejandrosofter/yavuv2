import SelectPlantilla from "@pages/plantillas/selectPlantilla";
import Switch from "@components/forms/switch";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { Typography } from "@mui/material";
export default function FormConfig({}) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Impresiones",
          nro: 0,
          vista: (
            <Grid container>
              <Grid item md={6}>
                <SelectPlantilla
                  campo="plantillaTerceros"
                  label="Plantilla Envio Terceros"
                />
              </Grid>
              <Grid item md={6}>
                <SelectPlantilla
                  campo="tarjetasImpresas"
                  label="Informe Tarjetas Impresas"
                />
              </Grid>
              <Grid item md={6}>
                <SelectPlantilla
                  campo="plantillaFrenteCredencial"
                  label="Plantilla Frente de Credencial"
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
