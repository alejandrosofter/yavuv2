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
import SelectPlantilla from "@pages/plantillas/selectPlantilla";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
export default function ConfigActividadad({}) {
  const coleccion = "modulos_config";
  const datos = UseConfigModulo("turnos");
  useLayout({
    label: "Config Turnos",
    titulo: "Turnos",
    acciones: [
      { label: "Turnos", icono: "fas fa-calendar", url: "/turnos" },
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    ],
  });

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
          subTitulo="de turnos"
          icono="fas fa-wrench"
        />
      </Typography>
      <FormSubitemColeccion
        registro={datos}
        coleccion={coleccion}
        datos={datos}
        modelo={ModeloConfig}
        valoresIniciales={valoresIniciales}
        callbackSuccess={callbackSuccess}
      >
        <TabsFormik
          label="Configs"
          vistas={[
            {
              label: "impresion",
              nro: 0,
              vista: (
                <Grid spacing={2} container>
                  <Grid item md={3}>
                    <Typography variant="caption" component="div" gutterBottom>
                      Impresion Turno{" "}
                    </Typography>
                    <SelectPlantilla
                      campo="impresionTurno"
                      label="Impresion Turno"
                    />
                  </Grid>
                  <Grid item md={3}>
                    <Typography variant="caption" component="div" gutterBottom>
                      Email Nuevo Turno{" "}
                    </Typography>
                    <SelectPlantilla campo="plantillaTurno" label="Plantilla" />
                  </Grid>
                  <Grid item md={3}>
                    <Typography variant="caption" component="div" gutterBottom>
                      Email Elimina Turno{" "}
                    </Typography>
                    <SelectPlantilla
                      campo="plantillaElimina"
                      label="Plantilla Elimina"
                    />
                  </Grid>
                </Grid>
              ),
            },
            {
              label: "Tipo de Turnos",
              nro: 1,
              vista: (
                <DataGridFormikItems
                  label="Tipo de Turnos"
                  Modelo={ModeloConfig}
                  FormularioItem={FormItem}
                  campo="tipoTurnos"
                  columns={[
                    { field: "nombre", headerName: "Nombre", width: 350 },
                    { field: "duracion", headerName: "Duracion", width: 80 },
                  ]}
                />
              ),
            },
            {
              label: "Categoria de Turnos",
              nro: 2,
              vista: (
                <DataGridFormikItems
                  label="Categoria de Turnos"
                  Modelo={ModeloConfig}
                  FormularioItem={FormCategoria}
                  campo="categoriaTurnos"
                  columns={[
                    { field: "nombre", headerName: "Nombre", width: 350 },
                    { field: "duracion", headerName: "Duracion", width: 80 },
                  ]}
                />
              ),
            },
            {
              label: "Notificaciones",
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
      </FormSubitemColeccion>
    </Grid>
  );
}
