import ColeccionTable from "@components/forms/coleccionTable";
import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import EditarActividad from "./editar";
import NuevaActividad from "./nuevo";

export default function ListaActividades({ callbackchange, mod }) {
  const [seleccion, setSeleccion] = useState(null);
  const [openEditar, setOpenEditar] = useState(null);
  const [openNuevo, setOpenNuevo] = useState(null);
  const order = ["nombreActividad", "asc"];

  const callbackclick = (params) => {
    cambiaSeleccion(params.row);
  };
  const quitarDocumento = (doc) => {
    return fuego.db.collection("actividades").doc(doc.id).delete();
  };
  let fnAcciones = {
    aplicar: (data) => {
      console.log(data);
    },
    imprimir: (data) => {},
  };
  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const columns = [
    {
      field: "nombreActividad",
      headerName: "Actividad",
      width: 250,
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
        quitarDocumento(row).then(() => {
          console.log("Documento eliminado");
        });
      },
    },
  ];
  return (
    <Grid container>
      <Grid item md={9}>
        <Typography variant="h6" gutterBottom>
          ACTIVIDADES
        </Typography>
      </Grid>
      <Grid item md={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenNuevo(true)}
        >
          <Icon fontSize="small" className="fas fa-plus" />
        </Button>
      </Grid>
      <Grid item md={12}>
        <ColeccionTable
          acciones={acciones}
          columns={columns}
          callbackclick={callbackclick}
          coleccion={`actividades`}
        />
      </Grid>
      <EditarActividad
        mod={mod}
        open={openEditar}
        setOpen={setOpenEditar}
        doc={seleccion}
      />
      <NuevaActividad mod={mod} open={openNuevo} setOpen={setOpenNuevo} />
    </Grid>
  );
}
