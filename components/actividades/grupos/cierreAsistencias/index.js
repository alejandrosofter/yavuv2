import { useState } from "react";
import { Grid } from "@mui/material";
import {
  ModeloCierreAsistencias,
  valoresInicialesCierreAsistencias,
} from "@modelos/ModeloGrupos";
import { getFechaString } from "@helpers/dates";
import DialogContenido from "@components/forms/dialogContenido";
import ResultadosAsistencias from "./resultados";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
export default function ListaCierreAsistenciasGrupo({
  actividad,
  grupo,
  setOpen,
  open,
  callbackchange,
}) {
  const order = ["nombreGrupo", "asc"];
  const [seleccion, setSeleccion] = useState(null);
  const [openIntegrantes, setOpenIntegrantes] = useState(null);

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
      field: "fechaDesde",
      headerName: "Desde",
      width: 100,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "fechaHasta",
      headerName: "Hasta",
      width: 100,
      renderCell: (params) => getFechaString(params.value),
    },

    {
      field: "totalAsisten",
      headerName: "Resultados",
      width: 350,
      renderCell: (params) =>
        `GENERAN DEUDA ${
          params.row.totalAsisten ? params.row.totalAsisten : "0"
        } | NO GENERAN ${
          params.row.totalNoAsisten ? params.row.totalNoAsisten : "0"
        } `,
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
      label: "Resultados",
      fn: (row) => {
        setSeleccion(row);
        setOpenIntegrantes(true);
      },
    },
  ];
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={12}>
          <ABMColeccion
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/cierreAsistencias`}
            columns={columns}
            acciones={acciones}
            order={order}
            callbackclick={callbackclick}
            icono={"fas fa-users"}
            Modelo={ModeloCierreAsistencias}
            valoresIniciales={valoresInicialesCierreAsistencias}
            dataForm={{ grupo, actividad }}
            titulo={`${actividad?.nombreActividad} / ${grupo?.nombreGrupo} / Cierres`}
            Form={Form}
          />
        </Grid>

        <ResultadosAsistencias
          open={openIntegrantes}
          doc={seleccion}
          setOpen={setOpenIntegrantes}
          actividad={actividad}
          grupo={grupo}
          cierre={seleccion}
        />
      </Grid>
    </DialogContenido>
  );
}
