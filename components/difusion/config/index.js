import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormItem from "./_form";
import SelectPlantilla from "@components/plantillas/selectPlantilla";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import ImpresionDialog from "@components/forms/impresion";
import FormModulo from "./_formModulo";
import {
  ModeloConfigItems,
  valoresInicialesMods,
} from "@modelos/ModeloDifusion";
export default function ConfigDifusion({ mod }) {
  const campo = "config";
  const coleccion = "mods";
  const datos = mod[campo] ? mod[campo] : {};

  const valoresIniciales = () => {
    return { itemsModulos: [] };
  };
  const callbackSuccess = () => {};

  return (
    <Grid container>
      <Typography variant="h4" component="div" gutterBottom>
        <TitulosFormularios
          titulo="CONFIGURACION"
          subTitulo="de difusion"
          icono="fas fa-wrench"
        />
      </Typography>
      <FormSubitemColeccion
        registro={mod}
        mod={mod}
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
              label: "Modulos",
              nro: 0,
              vista: (
                <DataGridFormikItems
                  label="Modulos"
                  Modelo={ModeloConfigItems}
                  FormularioItem={FormModulo}
                  valoresIniciales={valoresInicialesMods}
                  campo="itemsModulos"
                  columns={[
                    {
                      field: "label_modulo",
                      headerName: "Nombre",
                      width: 250,
                      editable: true,
                    },
                    {
                      field: "label_destino",
                      headerName: "Destino",
                      width: 250,
                      editable: true,
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </FormSubitemColeccion>
    </Grid>
  );
}
