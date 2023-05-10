import SelectPlantilla from "@components/plantillas/selectPlantilla";
import Switch from "@components/forms/switch";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import SelectProductos from "@components/productos/selectProducto";
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
            <Grid item md={12}>
              <Grid item md={8}>
                <Typography variant="caption" component="div" gutterBottom>
                  Impresion
                </Typography>
                <SelectPlantilla
                  campo="plantillaCierre"
                  label="Plantilla Cierre"
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
