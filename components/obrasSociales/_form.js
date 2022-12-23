import DataGridFormikItems from "@components/forms/dataGridFormik";
import { Grid, Stack, Typography } from "@mui/material";
import Input from "../forms/input";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import { ModeloAcciones } from "@modelos/ModeloPacientes";
import FormAccionesWeb from "./_formAccionesWeb";
import Switch from "@components/forms/switch";
import TabsFormik from "@components/forms/tab";
import SelectRutinasWebObraSocial from "./selectRutinaWeb";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <TabsFormik
      label="OBRA SOCIAL"
      vistas={[
        {
          label: "General",
          nro: 0,
          vista: (
            <Grid container spacing={2}>
              <Grid item md={4}>
                <Input label="Nombre" campo="nombre" />
              </Grid>

              <Grid item md={2}>
                <SelectEstaticFormik
                  items={["ACTIVA", "INACTIVA"]}
                  label="Estado"
                  campo="estado"
                />
              </Grid>
              <Grid item md={2}>
                <Switch label="Validacion WEB" campo="tieneValidacionWeb" />
              </Grid>
              {values.tieneValidacionWeb && (
                <Grid item md={2}>
                  <SelectEstaticFormik
                    items={["WEB", "PCPOS"]}
                    label="Tipo Validacion"
                    campo="tipoValidacion"
                  />
                </Grid>
              )}
              {values.tipoValidacion === "WEB" && values.tieneValidacionWeb && (
                <>
                  <Grid item md={2}>
                    <Input label="Usuario WEB" campo="usuarioWeb" />
                  </Grid>
                  <Grid item md={2}>
                    <Input label="Clave Web" campo="claveWeb" />
                  </Grid>
                  <Grid item md={3}>
                    <SelectRutinasWebObraSocial />
                  </Grid>
                  <Grid item md={3}>
                    <Input label="Selector" campo="selector1" />
                  </Grid>
                  <Grid item md={3}>
                    <Input label="Selector 2" campo="selector2" />
                  </Grid>
                </>
              )}
              {values.tipoValidacion === "PCPOS" && values.tieneValidacionWeb && (
                <Grid item md={2}>
                  <Input label="CUIT" campo="cuit" />
                </Grid>
              )}
            </Grid>
          ),
        },
        {
          label: "Importacion Prestaciones",
          nro: 1,
          vista: (
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography variant="caption">
                  Debes poner el nombre de la LETRA de la columna! Ejemplo: A
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Input label="Codigo INT" campo="columnaCodigoInterno" />
              </Grid>
              <Grid item md={2}>
                <Input label="Codigo EXT" campo="columnaCodigoExterno" />
              </Grid>
              <Grid item md={2}>
                <Input label="Nombre" campo="columnaNombre" />
              </Grid>

              <Grid item md={2}>
                <Input label="Importe" campo="columnaImporte" />
              </Grid>
              <Grid item md={2}>
                <Input label="Aclaracion" campo="columnaAclaracion" />
              </Grid>
              <Grid item md={2}>
                <Input label="Comienzo FILA" campo="comienzaFila" />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
