import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import TabsFormik from "@components/forms/tab";

import { useEffect } from "react";
import { quitarValoresNullArray } from "@helpers/objects";
import SelectGrupos from "pages/actividades/grupos/select";
import SelectActividades from "pages/actividades/selectActividad";
import SelectProducto from "@components/productos/selectProducto";
export default function Form({
  mod,
  setFieldValue,
  values,
  seleccion,
  grupo,
  producto,
  actividad,
}) {
  useEffect(() => {
    console.log(actividad, grupo);
    if (actividad) {
      setFieldValue("idActividad", actividad.id);
      setFieldValue("label_idActividad", actividad.nombreActividad);
    }
    if (grupo) {
      setFieldValue("idGrupoActividad", grupo.id);
      setFieldValue("label_idGrupoActividad", grupo.nombreGrupo);
    }
  }, [actividad, grupo]);
  return (
    <TabsFormik
      label="Nueva Generacion"
      vistas={[
        {
          label: "Generales",
          nro: 0,
          vista: (
            <Grid container spacing={2}>
              <Grid item md={3}>
                <SelectFecha label="Fecha" campo="fecha" />
                <Typography variant="caption">
                  Esta es la fecha de la deuda que generara en los perfiles de
                  socios!
                </Typography>
              </Grid>
              <Grid item md={3}>
                <SelectEstaticFormik
                  items={["FIJA", "+1 MES"]}
                  label="Tipo Seteo Fecha"
                  campo="tipoSeteoFecha"
                />
                <Typography variant="caption">
                  +1 MES es VARIABLE y FIJA es fecha fija para proxima cuota
                </Typography>
              </Grid>

              {values.tipoSeteoFecha === "FIJA" && (
                <Grid item md={3}>
                  <SelectFecha label="Prox Cuota" campo="fechaProximaCuota" />
                  <Typography variant="caption">
                    Esta es la fecha de la proxima cuota una vez generada esta
                    deuda
                  </Typography>
                </Grid>
              )}
              <Grid item md={5}>
                <SelectEstaticFormik
                  items={["SELECCION", "TODOS"]}
                  label="Tipo"
                  campo="tipoOperacion"
                />
                {values.tipoOperacion === "SELECCION" && (
                  <Typography sx={{ color: "green" }} variant="caption">
                    {/* //loop values.items que es un objecto */}
                    Tienes {Object.keys(values.items).length} deudas
                    seleccionadas para generar
                  </Typography>
                )}
              </Grid>
              {/* {actividad && (
                <Grid item md={4}>
                  <SelectActividades />
                </Grid>
              )}
          
               {grupo && (     <Grid item md={5}>
                  <SelectGrupos idActividad={values.idActividad} />
                </Grid>
              )} */}

              <Grid item md={7}>
                <SelectProducto />
              </Grid>

              {/* <Grid item md={6}>
                <SelectEstaticFormik
                  items={["PENDIENTE", "FINALIZADO"]}
                  label="Estado"
                  campo="estado"
                />
              </Grid> */}

              <Grid item md={12}>
                <Input
                  multiline={true}
                  rows={3}
                  label="Comentario"
                  campo="comentario"
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
