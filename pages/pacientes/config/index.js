import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "../../forms/editarSubitemColeccion";
import Input from "@components/forms/input";
import DataGridFormikItems from "../../forms/dataGridFormik";
import FormItem from "./_form";
import { ModeloBootWeb } from "@modelos/ModeloPacientes";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
export default function ConfigActividadad({ mod }) {
  const campo = "config";
  const coleccion = "mods";
  const datos = mod[campo] ? mod[campo] : {};

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
