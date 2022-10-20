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
import FormIndicaciones from "./_formIndicaciones";
import {
  ModeloEstudios,
  valoresInicialesEstudios,
  ModeloMedicamentos,
  valoresInicialesMedicamentos,
  ModeloPrestaciones,
  valoresInicialesPrestaciones,
  valoresInicialesIndicacion,
  ModeloIndicacion,
} from "@modelos/ModeloRecetas";

import TabsFormik from "@components/forms/tab";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectFecha label="Fecha Receta" campo="fechaReceta" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["MEDICAMENTO", "ESTUDIO", "PRESTACION", "INDICACION"]}
          label="Tipo Receta"
          campo="tipo"
        />
      </Grid>
      {values.tipo == "MEDICAMENTO" && (
        <Grid item md={12}>
          <DataGridFormikItems
            label="Medicamentos"
            Modelo={ModeloMedicamentos}
            valoresIniciales={valoresInicialesMedicamentos}
            FormularioItem={FormMedicamentos}
            campo="medicamentos"
            columns={[
              {
                field: "cantidad",
                headerName: "Cantidad",
                width: 80,
              },
              {
                field: "label_idMedicamento",
                headerName: "Nombre Medicamento",
                width: 290,
              },
              {
                field: "label_idPosologia",
                headerName: "Posologia",
                width: 190,
              },
            ]}
          />
        </Grid>
      )}
      {values.tipo == "ESTUDIO" && (
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
      )}
      {values.tipo == "INDICACION" && (
        <Grid item md={12}>
          <DataGridFormikItems
            label=""
            // preData={{ }}
            Modelo={ModeloIndicacion}
            valoresIniciales={valoresInicialesIndicacion}
            FormularioItem={FormIndicaciones}
            campo="indicaciones"
            columns={[
              {
                field: "label_idIndicacion",
                headerName: "Indicacion",
                width: 450,
              },
            ]}
          />
        </Grid>
      )}
      {values.tipo == "PRESTACION" && (
        <Grid item md={12}>
          <DataGridFormikItems
            label=""
            preData={{ obraSocial: values.obraSocial }}
            Modelo={ModeloPrestaciones}
            valoresIniciales={valoresInicialesPrestaciones}
            FormularioItem={FormPrestaciones}
            campo="prestaciones"
            columns={[
              {
                field: "cantidad",
                headerName: "Cantidad",
                width: 80,
              },
              {
                field: "label_idPrestacion",
                headerName: "Prestacion",
                width: 450,
              },
              {
                field: "detalle",
                headerName: "Detalle",
                width: 150,
              },
            ]}
          />
        </Grid>
      )}

      <Grid item md={2}>
        <SelectFecha label="Fecha Diagnostico" campo="fechaDiagnostico" />
      </Grid>
      <Grid item md={12}>
        <Input label="Diagnostico" campo="diagnostico" />
      </Grid>
      <Grid item md={12}>
        <Input label="Observacion (opcional)" campo="observacion" />
      </Grid>
    </Grid>
  );
}
