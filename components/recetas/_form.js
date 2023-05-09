import { Grid, Stack } from "@mui/material";
import CheckboxForm from "@components//forms/checkbox";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "../forms/selectEstaticFormik";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import SelectCentroCosto from "@components/centroCostos/select";
import SelectFecha from "@components/forms/selectorFecha";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormMedicamentos from "./_formMedicamentos";
import FormEstudios from "./_formEstudios";
import FormPrestaciones from "./_formPrestaciones";
import FormIndicaciones from "./_formIndicaciones";
import FormAnteojos from "./_formAnteojos";
import {
  ModeloEstudios,
  ModeloAnteojos,
  valoresInicialesAnteojos,
  valoresInicialesEstudios,
  ModeloMedicamentos,
  valoresInicialesMedicamentos,
  ModeloPrestaciones,
  valoresInicialesPrestaciones,
  valoresInicialesIndicacion,
  ModeloIndicacion,
} from "@modelos/ModeloRecetas";
export const getValor = (params, campo, ojo, lejosCerca, postchar = "") => {
  const aux = params.row[`${campo}_${ojo}_${lejosCerca}`];
  if (aux) return `${aux} ${postchar}`;
  return "";
};
export function getDetalleLente(params, lejosCerca, label = "") {
  if (!params.row) params.row = params;
  if (!params.row[`select_${lejosCerca}`]) return "";

  const derecho = getDataOjo(params, "derecho", lejosCerca);
  const izquierdo = getDataOjo(params, "izquierdo", lejosCerca);
  return !params.row[`select_cerca`]
    ? ``
    : `${label} OD:${derecho} | OI:${izquierdo} | `;
}
export function getDetalleAnteojo(params, esData) {
  if (esData) params = { row: params };
  const cerca = getDetalleLente(params, "cerca", "CERCA ");
  const lejos = getDetalleLente(params, "lejos", "LEJOS ");
  const intermedio = getDetalleLente(params, "intermedio", "INTERMEDIO");

  return `${cerca}${lejos}${intermedio}`;
}
export function getDataOjo(params, ojo, lejosCerca, label) {
  if (!params.row) params.row = params;
  if (params.row[`esNeutro_${ojo}_${lejosCerca}`])
    return `${label ? label : ""}  NEUTRO`;
  return `${label ? label : ""}  ${getValor(
    params,
    `esfera`,
    ojo,
    lejosCerca,
    "esf."
  )}
  ${getValor(params, `eje`, ojo, lejosCerca, `ej.`)} ${getValor(
    params,
    `cilindro`,
    ojo,
    lejosCerca,
    `° cil`
  )}  `;
}
export default function Form({ mod, setFieldValue, values, paciente }) {
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
          items={["MEDICAMENTO", "PRESTACION", "INDICACION", "ANTEOJOS"]}
          label="Tipo Receta"
          campo="tipo"
        />
      </Grid>
      {values.tipo == "MEDICAMENTO" && (
        <>
          <Grid item md={3}>
            <Switch label="Agregar Indicacion" campo="agregarIndicacion" />
          </Grid>
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
        </>
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
      {values.tipo == "ANTEOJOS" && (
        <Grid item md={12}>
          <DataGridFormikItems
            label="Anteojos"
            Modelo={ModeloAnteojos}
            valoresIniciales={valoresInicialesAnteojos}
            FormularioItem={FormAnteojos}
            maxWidth="lg"
            campo="anteojos"
            columns={[
              {
                field: "label_idEstudio",
                renderCell: (params) => {
                  return getDetalleAnteojo(params);
                },
                headerName: "Detalle",
                width: 650,
              },
            ]}
          />
        </Grid>
      )}
      {values.tipo == "INDICACION" && (
        <Grid item md={12}>
          <DataGridFormikItems
            label=""
            preData={{ paciente }}
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
                field: "nombre",
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

      <Grid item md={12}>
        <Input label="Diagnostico" campo="diagnostico" />
      </Grid>
      <Grid item md={12}>
        <Input label="Observacion (opcional)" campo="observacion" />
      </Grid>
    </Grid>
  );
}
