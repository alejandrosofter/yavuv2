import { Grid, Stack, Typography } from "@mui/material";
import Input from "@components/forms/input";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import TabsFormik from "@components/forms/tab";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import {
  ModeloItemMovimiento,
  valoresIniciales,
} from "@modelos/ModeloPredeudaSocios";
import FormItem from "./_form";
import { useEffect } from "react";
import { quitarValoresNullArray } from "@helpers/objects";
export default function Form({ mod, setFieldValue, values, seleccion }) {
  useEffect(() => {
    setFieldValue(
      "items",
      quitarValoresNullArray(seleccion).concat(values.items)
    );
  }, [seleccion]);
  return (
    <TabsFormik
      label="Nuevo Movimiento"
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

              <Grid item md={6}>
                <SelectEstaticFormik
                  items={["ACEPTAR", "SUSPENDER", "BAJA"]}
                  label="Estado"
                  campo="estado"
                />
              </Grid>

              <Grid item md={12}>
                <Input
                  multiline={true}
                  rows={5}
                  label="Comentario"
                  campo="comentario"
                />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Deudas",
          nro: 1,
          vista: (
            <DataGridFormikItems
              label="Deudas"
              Modelo={ModeloItemMovimiento}
              valoresIniciales={valoresIniciales}
              FormularioItem={FormItem}
              hideAgregar={true}
              campo="items"
              columns={[
                {
                  field: "label_socio",
                  headerName: "Socio",
                  width: 450,
                  editable: true,
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
