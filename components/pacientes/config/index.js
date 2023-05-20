import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";
import Input from "@components/forms/input";
import { useContext, useEffect, useState } from "react";
import { Context } from "context/userContext";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
export default function View({}) {
  const coleccion = "modulos_config";
  const datos = UseConfigModulo("pacientes");
  useLayout({
    label: "Config Pacientes",
    titulo: "Pacientes",
    acciones: [
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
      { label: "Turnos", icono: "fas fa-calendar", url: "/turnos" },
      { label: "Config", icono: "fas fa-cog", url: "/pacientes/config" },
    ],
  });
  if (!datos) return <div>Cargando...</div>;
  const valoresIniciales = () => {
    return { nombre: "", tipo: "" };
  };
  const callbackSuccess = () => {};

  return (
    <Grid container>
      <Typography variant="h4" component="div" gutterBottom>
        <TitulosFormularios
          titulo="CONFIGURACION"
          subTitulo="de pacientes"
          icono="fas fa-wrench"
        />
      </Typography>
      <FormSubitemColeccion
        registro={datos}
        coleccion={coleccion}
        datos={datos}
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
      >
        <TabsFormik
          label="Configs"
          vistas={[
            {
              label: "GRAL",
              nro: 0,
              vista: (
                <Grid item md={12}>
                  <Grid item md={6}>
                    <Input campo="cuitPrestador" label="CUIT PRESTADOR" />
                    <Typography variant="caption" component="div" gutterBottom>
                      IMPORTANTE PARA VALIDACION WEB!
                    </Typography>
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
      </FormSubitemColeccion>
    </Grid>
  );
}
