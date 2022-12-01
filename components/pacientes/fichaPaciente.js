import MuestraImagen from "@components/forms/muestraImagen";
import { capitalize } from "@helpers/Strings";
import { Grid, Icon, IconButton, Paper, Typography } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import {
  Modelo as ModeloRecetas,
  valoresIniciales as valoresInicialesRecetas,
} from "@modelos/ModeloRecetas";
import ABMColeccion from "@components/forms/ABMcollection";
import FormRecetas from "@components/recetas/_form";
import { getFechaString } from "@helpers/dates";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import ModeloTurnos, {
  valoresIniciales as valoresInicialesTurnos,
} from "@modelos/ModeloTurnos";
import FormTurnos from "@components/turnos/_form";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
export function DataPaciente({ paciente }) {
  return (
    <Grid container spacing={2}>
      <Grid item md={1}>
        <MuestraImagen border={3} w={70} h={70} pathImagen={paciente.foto} />
      </Grid>
      <Grid item md={11}>
        <Grid item md={10}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {`${paciente.apellido}`.toUpperCase()}{" "}
            {` ${capitalize(paciente.nombre)}`}
          </Typography>
        </Grid>

        <Grid item md={12}>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            DNI {paciente.dni} - NRO AFILIADO {paciente.nroAfiliado} - O.S{" "}
            {paciente.label_obraSocial} - TEL. {paciente.telefono} - EMAIL{" "}
            {paciente.email}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
export function TurnosPaciente({ paciente, callbackchange }) {
  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const columns = [
    {
      field: "fechaTurno",
      headerName: "Fecha",
      width: 200,
      renderCell: (params) => getFechaString(params.value, "DD/MM/YYYY HH:mm"),
    },
    {
      field: "nombreConsultorio",
      headerName: "Consltorio",
      width: 300,
      // renderCell: (params) => getFechaString(params.value, "DD/MM/YYYY HH:mm"),
    },
  ];
  const order = ["fecha", "desc"];

  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  return (
    <Grid container spacing={2}>
      <Grid sx={{ height: "100vh" }} item md={12}>
        <Paper elevation={8} sx={{ p: 2, height: "100%" }}>
          <ABMColeccion
            hideNew={true}
            acciones={[]}
            coleccion={`turnos`}
            columns={columns}
            where={[
              ["paciente", "==", paciente.id],
              parentData
                ? ["idUsuario", "==", localStorage.getItem("usermod")]
                : ["usermod", "==", fuego.auth().currentUser?.uid],
            ]}
            labelNuevo="nueva"
            preData={{}}
            order={order}
            maxWidth={"md"}
            callbackchange={cambiaSeleccion}
            // callbackclick={callbackclick}
            icono={"fas fa-"}
            Modelo={ModeloTurnos}
            valoresIniciales={valoresInicialesTurnos}
            // dataForm={{ mod }}
            titulo={`TURNOS`}
            Form={FormTurnos}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
export function ListaRecetas({ callbackchange, paciente, mod }) {
  const [seleccion, setSeleccion] = useState(null);
  const idPlantilla = mod.config?.plantillaRecetas;
  const [dataImpresion, setDataImpresion] = useState();

  const getDetalleReceta = (receta) => {
    let detalle = "";
    receta.medicamentos?.forEach((medicamento) => {
      detalle += ` ${medicamento.label_idMedicamento},`;
    });
    receta.indicaciones?.forEach((indicacion) => {
      detalle += ` ${indicacion.label_idIndicacion},`;
    });

    receta.estudios?.forEach((estudio) => {
      detalle += ` ${estudio.label_idEstudio},`;
    });
    receta.prestaciones?.forEach((prestacion) => {
      detalle += ` ${prestacion.label_idPrestacion},`;
    });
    return detalle;
  };
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const [openImpresion, setOpenImpresion] = useState(false);
  const order = ["fecha_timestamp", "desc"];

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "tipo",
      headerName: "Tipo Receta",
      width: 130,
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 300,
      renderCell: (params) => renderCellExpandData(params, getDetalleReceta),
    },
  ];
  const setIndicaciones = (indicaciones) => {
    let aux = indicaciones;
    for (let i = 0; i < aux.length; i++)
      aux[i].detalle = aux[i].detalle.replace(/\n/g, "<br>");

    return aux;
  };
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-copy",
      label: "Copiar Receta...",
      fn: (row) => {
        setSeleccion(row);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: async (row) => {
        // if (row.label_tipo === "INDICACION")
        //   row.indicaciones = setIndicaciones(row.indicaciones);
        setSeleccion(row);

        console.log("row", row);
        setDataImpresion({ ...row, paciente });
        setOpenImpresion(true);
      },
    },
  ];
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  const callbackNuevaReceta = (data) => {
    setDataImpresion({ ...data, paciente });
    setOpenImpresion(true);
  };
  return (
    <Grid container>
      <Grid item md={12}>
        <ABMColeccion
          acciones={acciones}
          callbackSuccessNew={callbackNuevaReceta}
          coleccion={`pacientes/${paciente.id}/recetas`}
          columns={columns}
          where={[
            parentData
              ? ["idUsuario", "==", localStorage.getItem("usermod")]
              : ["usermod", "==", fuego.auth().currentUser?.uid],
          ]}
          labelNuevo="nueva receta"
          dataForm={{ paciente }}
          preData={{ paciente }}
          orderBy={order}
          maxWidth={"md"}
          callbackchange={cambiaSeleccion}
          // callbackclick={callbackclick}
          icono={"fas fa-"}
          Modelo={ModeloRecetas}
          valoresIniciales={valoresInicialesRecetas}
          // dataForm={{ mod }}
          titulo={`RECETAS`}
          Form={FormRecetas}
        />
      </Grid>
      <ImpresionDialog
        titulo="IMPRESIÓN RECETA"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="RECETA "
        plantillaEmail={mod.config?.plantillaEmailReceta}
        attachments={[{ filename: "RECETAS.pdf", data: plantilla }]}
        data={dataImpresion}
        plantilla={plantilla}
      />
    </Grid>
  );
}

export function FichaPaciente({ paciente, mod }) {
  return (
    <Grid container spacing={3}>
      <Grid item md={12}>
        <DataPaciente paciente={paciente} />
      </Grid>
      <Grid item md={6}>
        <TurnosPaciente paciente={paciente} />
      </Grid>
      <Grid item md={6}>
        <ListaRecetas mod={mod} paciente={paciente} />
      </Grid>
    </Grid>
  );
}
