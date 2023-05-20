import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormItem from "@components/actividades/config/_form";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import { ModeloConfig } from "@modelos/ModeloSocios";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import ImpresionDialog from "@components/forms/impresion";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function ConfigActividadad({ mod }) {
  const campo = "config";
  const coleccion = "mods";
  const datos = UseConfigModulo("actividades");

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
          subTitulo="de actividades"
          icono="fas fa-wrench"
        />
      </Typography>
      <FormSubitemColeccion
        registro={datos}
        coleccion={coleccion}
        campo={campo}
        datos={datos}
        callbackSuccess={callbackSuccess}
        valoresIniciales={valoresIniciales}
      >
        <TabsFormik
          label="Configs"
          vistas={[
            {
              label: "Conceptos",
              nro: 0,
              vista: (
                <DataGridFormikItems
                  label="Conceptos"
                  Modelo={ModeloConfig}
                  FormularioItem={FormItem}
                  campo="itemsTipos"
                  columns={[
                    {
                      field: "detalle",
                      headerName: "Detalle",
                      width: 450,
                      editable: true,
                    },
                  ]}
                />
              ),
            },
            {
              label: "Impresiones",
              nro: 1,
              vista: (
                <Grid item md={12}>
                  <Grid item md={8}>
                    <Typography variant="caption" component="div" gutterBottom>
                      Envio a Terceros
                    </Typography>
                    <SelectPlantilla
                      campo="plantillaAsistencias"
                      label="Plantilla Asistencias"
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
