import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormSubitemColeccion from "@components/forms/editarSubitemColeccion";

import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormItem from "./_form";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import { ModeloConfig } from "@modelos/ModeloSocios";
import TabsFormik, { TabPanel } from "@components/forms/tab";
import TitulosFormularios from "@components/forms/tituloFormularios";
import ImpresionDialog from "@components/forms/impresion";
import SelectProducto from "@components/productos/selectProducto";
import SelectCategoriaProducto from "@components/productos/categoriaProducto";
export default function ConfigPredeuda({ mod }) {
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
          subTitulo="de predeuda"
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
              label: "Generales",
              nro: 0,
              vista: (
                <Grid item md={12}>
                  <Grid item md={8}>
                    <Typography variant="caption" component="div" gutterBottom>
                      Todos los productos con esta categoria seran reconocidos
                      como Actividades
                    </Typography>
                    <SelectCategoriaProducto
                      multiple={true}
                      campo="categoriaActividades"
                      label="Categoria Actividades"
                    />
                  </Grid>
                  <Grid item md={8}>
                    <Typography variant="caption" component="div" gutterBottom>
                      Todos los productos con esta categoria seran reconocidos
                      como cuotas sociales.
                    </Typography>
                    <SelectCategoriaProducto
                      multiple={true}
                      campo="categoriaCuotasSociales"
                      label="Categoria Cuotas Sociales"
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
