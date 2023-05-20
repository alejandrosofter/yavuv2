import useSWR from "swr";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import { EmailConfig } from "./_formCuenta";
import Input from "@components/forms/input";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import useLayout from "@hooks/useLayout";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function Configs({ mod }) {
  useLayout({
    label: "Config Email",
    titulo: "CONFIG",
    acciones: [
      { label: "Emails", icono: "fas fa-envelope", url: "/emails" },
      // { label: "Config", icono: "fas fa-cog", url: "/emails/config" },
    ],
  });
  const coleccion = "modulos_config";
  const datos = UseConfigModulo("emails");

  const valoresIniciales = () => {
    return { nombre: "", tipo: "" };
  };
  const callbackSuccess = () => {};
  if (!datos) return "";
  return (
    <Grid container>
      <Typography variant="h4" component="div" gutterBottom>
        <TitulosFormularios
          titulo="CONFIGURACION"
          subTitulo="de emails"
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
              label: "General",
              nro: 0,
              vista: (
                <Grid spacing={2} container>
                  <Grid item md={3}>
                    <Typography variant="caption" component="div" gutterBottom>
                      EMAIL{" "}
                    </Typography>
                    <SelectPlantilla campo="plantillaEmail" label="Plantilla" />
                  </Grid>
                  <Grid item md={3}>
                    <Typography variant="caption" component="div" gutterBottom>
                      PDF{" "}
                    </Typography>
                    <SelectPlantilla
                      campo="plantillaPdf"
                      label="Plantilla PDF"
                    />
                  </Grid>
                </Grid>
              ),
            },
            { label: "Email Config", nro: 1, vista: <EmailConfig /> },
          ]}
        />
      </FormSubitemColeccion>
    </Grid>
  );
}
