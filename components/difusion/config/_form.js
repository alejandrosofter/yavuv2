import Grid from "@mui/material/Grid";
import { useState } from "react";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import TabsFormik from "@components/forms/tab";
import FormModulo from "./_formModulo";
export default function FormConfig({ values }) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "DESTINOS",
          nro: 0,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Modulos"
                Modelo={ModeloModulo}
                FormularioItem={FormModulo}
                campo="itemsModulos"
                columns={[
                  { field: "nombre", headerName: "Nombre", width: 150 },
                  { field: "destino", headerName: "Nombre", width: 150 },
                ]}
              />
            </Grid>
          ),
        },
      ]}
    />
  );
}
