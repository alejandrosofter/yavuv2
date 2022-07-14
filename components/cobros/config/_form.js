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
          label: "Otras",
          nro: 0,
          vista: (
            <Grid container>
              <Grid item md={5}>
                <Switch campo="imprimirAlcrear" label="Imprimir al crear" />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Impresiones",
          nro: 1,
          vista: (
            <Grid container>
              <Grid item md={8}>
                <SelectPlantilla
                  campo="plantillaCobro"
                  label="Plantilla Cobro"
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
