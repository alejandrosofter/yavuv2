import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import SelectFecha from "@components/forms/selectorFecha";
import DataGridFormikItems from "@components/forms/dataGridFormik";
import FormMedicamentos from "./_formMedicamentos";
import FormEstudios from "./_formEstudios";
import FormPrestaciones from "./_formPrestaciones";
import FormIndicaciones from "./_formIndicaciones";
import parse from "html-react-parser";
import FormAnteojos from "./_formAnteojos";
import { fuego, update, useCollection } from "@nandorojo/swr-firestore";
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
  ModeloDiagnostico,
  valoresInicialesDiagnostico,
} from "@modelos/ModeloRecetas";
import SelectOsPaciente from "./selectOs";
import { useEffect } from "react";
import FormDiagnostico from "./_formDiagnostico";
import { AutorizacionesPendientes } from "./autorizacionesPendientes";

export const getValor = (params, campo, ojo, lejosCerca, postchar = "") => {
  const aux = params.row[`${campo}_${ojo}_${lejosCerca}`];
  if (aux) return `${aux} ${postchar}`;
  return "";
};
export function getDetalleLente(params, lejosCerca, label = "") {
  if (!params.row) params.row = params;
  if (lejosCerca === "ambos") return getDataOjo(params, "ambos", lejosCerca);
  const derecho = getDataOjo(params, "derecho", lejosCerca);
  const izquierdo = getDataOjo(params, "izquierdo", lejosCerca);
  return `${label} OD:${derecho} | OI:${izquierdo} | `;
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

export default function Form({ setFieldValue, values, paciente }) {
  const cambiaOs = (value, item) => {
    if (!item) return;
    setFieldValue("obraSocialSeleccion", item);
  };
  useEffect(() => {
    if (paciente)
      setFieldValue("paciente", {
        id: paciente.id,
        nombre: paciente.nombre,
        apellido: paciente.apellido,
        dni: paciente.dni,
      });
  }, [paciente]);
  const changeStateAutorizacion = (item, estado) => {
    if (!item) return;
    update(`recetasAutorizacion/${item.id}`, { estado });
  };
  const onAccept = (item) => {
    let prestaciones = values.prestaciones ? [...values.prestaciones] : [];

    prestaciones.push(item);
    setFieldValue("prestaciones", prestaciones);
    changeStateAutorizacion(item, "ACEPTADO");
  };
  const onCancel = (item) => {
    changeStateAutorizacion(item, "CANCELADO");
  };

  return (
    <Grid container spacing={2}>
      <Grid item md={3}>
        <SelectFecha label="Fecha Registro" campo="fecha" />
      </Grid>
      <Grid item md={3}>
        <SelectFecha label="Fecha Receta" campo="fechaReceta" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={[
            "MEDICAMENTO",
            "PRESTACION",
            "INDICACION",
            "ANTEOJOS",
            "DIAGNOSTICO",
          ]}
          label="Tipo Receta"
          campo="tipo"
        />
      </Grid>
      <Grid item md={3}>
        <Switch label="Consulta Particular" campo="esParticular" />
      </Grid>

      {values.tipo == "DIAGNOSTICO" && (
        <>
          <Grid item md={12}>
            <DataGridFormikItems
              label="Diagnosticos"
              Modelo={ModeloDiagnostico}
              valoresIniciales={valoresInicialesDiagnostico}
              FormularioItem={FormDiagnostico}
              campo="diagnosticos"
              columns={[
                {
                  field: "label_idDiagnostico",

                  headerName: "Diagnostico",
                },
              ]}
            />
          </Grid>
        </>
      )}
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
          <AutorizacionesPendientes
            paciente={paciente}
            onAccept={onAccept}
            onCancel={onCancel}
          />

          <DataGridFormikItems
            label=""
            preData={{ paciente }}
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
                renderCell: (params) => {
                  return params.value ? parse(params.value) : "";
                },
              },
              {
                field: "label_sendTo",
                headerName: "Enviar a ...",
                width: 200,
                // renderCell: (params) => {
                //   return params.value ? "Si" : "No";
                // },
              },
              // {
              //   field: "detalle",
              //   headerName: "Detalle",
              //   width: 150,
              // },
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
