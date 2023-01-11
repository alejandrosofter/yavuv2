import { useState } from "react";
import { Grid } from "@mui/material";
import InscriptosGrupo from "./inscriptos/index2";

import ListaAsistenciaGrupo from "./asistencias";
import ListaCierreAsistenciasGrupo from "./cierreAsistencias";
import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloGrupos";
import Form from "./_form";
export default function ListaGrupos({ actividad, callbackchange, mod }) {
  const order = ["nombreGrupo", "asc"];
  const [seleccion, setSeleccion] = useState(null);
  const [openCierreAsistencias, setOpenCierreAsistencias] = useState(null);
  const [openInscriptos, setOpenInscriptos] = useState(null);
  const [openAsistencias, setOpenAsistencias] = useState(null);

  const callbackclick = (params) => {
    cambiaSeleccion(params.row);
  };

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };

  const columns = [
    {
      field: "nombreGrupo",
      headerName: "Nombre Grupo",
      width: 250,
    },

    {
      field: "cantidadIntegrantes",
      headerName: "Cant. Integrantes",
      width: 150,
      renderCell: (params) => `${params.value ? params.value : "0"} `,
    },
    {
      field: "cupo",
      headerName: "Cupo",
      width: 100,
    },
    {
      field: "label_idProfesor",
      headerName: "Profesor",
      width: 200,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-users",
      label: "Inscriptos",

      fn: (row) => {
        setSeleccion(row);
        setOpenInscriptos(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-clock",
      label: "Asistencias",
      fn: (row) => {
        setSeleccion(row);
        setOpenAsistencias(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-history",
      label: "Cierre Asistencias",
      fn: (row) => {
        setSeleccion(row);
        setOpenCierreAsistencias(true);
      },
    },
  ];
  return (
    <Grid container>
      {actividad && (
        <Grid item xs={12}>
          <ABMColeccion
            coleccion={`actividades/${actividad?.id}/grupos`}
            columns={columns}
            acciones={acciones}
            order={order}
            rowsPerPage={100}
            hidePaginador={true}
            callbackclick={callbackclick}
            icono={"fas fa-users"}
            Modelo={Modelo}
            valoresIniciales={valoresIniciales}
            dataForm={{ grupo: seleccion }}
            titulo={`${actividad?.nombreActividad} /`}
            Form={Form}
          />
        </Grid>
      )}

      <InscriptosGrupo
        open={openInscriptos}
        setOpen={setOpenInscriptos}
        actividad={actividad}
        mod={mod}
        grupo={seleccion}
      />
      <ListaAsistenciaGrupo
        open={openAsistencias}
        setOpen={setOpenAsistencias}
        actividad={actividad}
        grupo={seleccion}
      />
      <ListaCierreAsistenciasGrupo
        open={openCierreAsistencias}
        setOpen={setOpenCierreAsistencias}
        actividad={actividad}
        grupo={seleccion}
      />
    </Grid>
  );
}
