import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { useContext, useEffect, useState } from "react";
import { Context } from "context/userContext";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
import FormGenerico from "@components/_formGenerico";
export default function View({}) {
  return (
    <Grid container>
      <TabsFormik
        label="Configs"
        vistas={[
          {
            label: "GRAL",
            nro: 0,
            vista: (
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <Input campo="cuitPrestador" label="CUIT PRESTADOR" />
                  <Typography variant="caption" component="div" gutterBottom>
                    IMPORTANTE PARA VALIDACION WEB!
                  </Typography>
                </Grid>
                <Grid item md={3}>
                  <Input campo="nombrePrestador" label="Nombre PRESTADOR" />
                </Grid>
                <Grid item md={3}>
                  <Input campo="nroPrestador" label="NRO PRESTADOR" />
                </Grid>
                <Grid item md={3}>
                  <Input
                    campo="especialidadPrestador"
                    label="Especialidad PRESTADOR"
                  />
                </Grid>
              </Grid>
            ),
          },
          {
            label: "Impresiones",
            nro: 1,
            vista: (
              <Grid item md={12}>
                <Grid item md={6}>
                  <SelectPlantilla
                    campo="plantillaRecetas"
                    label="Plantilla Receta"
                  />
                </Grid>
                <Grid item md={6}>
                  <SelectPlantilla
                    campo="plantillaLiquidaciones"
                    label="Plantilla Liquidaciones"
                  />
                </Grid>
                <Grid item md={6}>
                  <SelectPlantilla
                    campo="plantillaRecetaDigital"
                    label="Plantilla Receta Digital"
                  />
                </Grid>

                <Grid item md={6}>
                  <SelectPlantilla
                    campo="plantillaEmailReceta"
                    label="Plantilla Email Receta"
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
