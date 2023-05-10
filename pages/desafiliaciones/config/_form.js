import TabsFormik, { TabPanel } from "@components/forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import { Typography } from "@mui/material";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import { ModeloMotivos } from "@modelos/ModeloSocios";
import FormMotivos from "./_formMotivos";
export default function FormConfig({}) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Motivos",
          nro: 0,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Motivos Estados"
                Modelo={ModeloMotivos}
                FormularioItem={FormMotivos}
                campo="itemsMotivosEstados"
                columns={[
                  { field: "detalle", headerName: "Detalle", width: 330 },
                  {
                    field: "estado",
                    headerName: "Asociado a ...",
                    width: 130,
                  },
                ]}
              />
            </Grid>
          ),
        },
      ]}
    />
  );
}
