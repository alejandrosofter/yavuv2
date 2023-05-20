import { useState } from "react";
import { Grid } from "@mui/material";

import { getFechaString } from "@helpers/dates";
import DialogContenido from "@components/forms/dialogContenido";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import {
  ModeloAsistencias,
  valoresInicialesAsistencias,
} from "@modelos/ModeloGrupos";
import FiltroAsistencias from "./filtro";
export default function ListaAsistenciaGrupo({
  actividad,
  grupo,
  setOpen,
  open,
  callbackchange,
}) {
  const [where, setWhere] = useState([]);
  const order = ["fecha", "asc"];

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
      field: "fecha",
      headerName: "Fecha",
      width: 150,
      renderCell: (params) => getFechaString(params.value),
    },

    {
      field: "integrantesAsistencia",
      headerName: "Asisten",
      width: 150,
      renderCell: (params) => `${params.value ? params.value.length : "0"} `,
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
      icono: "fas fa-pencil",
      label: "Editar",
      fn: (row) => {
        setSeleccion(row);
        setOpenEditar(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-trash",
      label: "Quitar",
      color: "red",
      fn: (row) => {
        quitarDocumento(row).then(() => {});
      },
    },
  ];
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="sm"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item xs={12}>
          <FiltroAsistencias setWhere={setWhere} />
          <ABMColeccion
            coleccion={`actividades/${actividad?.id}/grupos/${grupo?.id}/asistencias`}
            columns={columns}
            order={order}
            where={where}
            callbackclick={callbackclick}
            icono={"fas fa-users"}
            Modelo={ModeloAsistencias}
            valoresIniciales={valoresInicialesAsistencias}
            dataForm={{ grupo, actividad }}
            titulo={`${actividad?.nombreActividad} / ${grupo?.nombreGrupo} / Asistencias`}
            Form={Form}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
