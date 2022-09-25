import { Grid, Stack } from "@mui/material";
import CheckboxForm from "@components//forms/checkbox";
import Input from "@components//forms/input";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectCentroCosto from "@components/centroCostos/select";
import SelectFecha from "@components/forms/selectorFecha";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormMedicamentos from "./_formMedicamentos";
import FormEstudios from "./_formEstudios";
import FormPrestaciones from "./_formPrestaciones";
import {
  ModeloEstudios,
  valoresInicialesEstudios,
  ModeloMedicamentos,
  valoresInicialesMedicamentos,
  ModeloPrestaciones,
  valoresInicialesPrestaciones,
} from "@modelos/ModeloRecetas";
import TabsFormik from "@components/forms/tab";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>

      <Grid item md={12}>
        <TabsFormik
          label="MEDICAMENTOS"
          vistas={[
            {
              label: "medicamentos",
              nro: 0,
              vista: (
                <Grid item md={12}>
                  <DataGridFormikItems
                    label="Medicamentos"
                    Modelo={ModeloMedicamentos}
                    valoresIniciales={valoresInicialesMedicamentos}
                    FormularioItem={FormMedicamentos}
                    campo="medicamentos"
                    columns={[
                      {
                        field: "label_idMedicamento",
                        headerName: "Nombre Medicamento",
                        width: 190,
                      },
                      {
                        field: "detalle",
                        headerName: "Detalle",
                        width: 390,
                      },
                    ]}
                  />
                </Grid>
              ),
            },
            {
              label: "ESTUDIOS",
              nro: 1,
              vista: (
                <Grid item md={12}>
                  <DataGridFormikItems
                    label="Estudios"
                    Modelo={ModeloEstudios}
                    valoresIniciales={valoresInicialesEstudios}
                    FormularioItem={FormEstudios}
                    campo="estudios"
                    columns={[
                      {
                        field: "label_idEstudio",
                        headerName: "Estudio",
                        width: 350,
                      },
                      {
                        field: "detalle",
                        headerName: "Detalle",
                        width: 350,
                      },
                    ]}
                  />
                </Grid>
              ),
            },
            {
              label: "PRESTACIONES",
              nro: 2,
              vista: (
                <Grid item md={12}>
                  <DataGridFormikItems
                    label=""
                    Modelo={ModeloPrestaciones}
                    valoresIniciales={valoresInicialesPrestaciones}
                    FormularioItem={FormPrestaciones}
                    campo="prestaciones"
                    columns={[
                      {
                        field: "label_idPrestacion",
                        headerName: "Prestacion",
                        width: 350,
                      },
                      {
                        field: "detalle",
                        headerName: "Detalle",
                        width: 350,
                      },
                    ]}
                  />
                </Grid>
              ),
            },
          ]}
        />
      </Grid>

      <Grid item md={12}>
        <Input label="Detalle" campo="detalle" />
      </Grid>
    </Grid>
  );
}
