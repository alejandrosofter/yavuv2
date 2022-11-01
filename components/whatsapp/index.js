import ABMColeccion from "@components/forms/ABMcollection";
import {
  ModeloWhatsappMensaje,
  valoresInicialesWhatsappMensaje,
} from "@modelos/ModeloWhatsapp";
import { Grid, Typography } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";

import StatusWhatsapp from "./status";
import TestMessage from "./testMesage";
import Form from "./_form";
export default function WhatsApp() {
  const [dataSesion, setDataSesion] = useState();
  const cambiaSesion = (sesion) => {
    setDataSesion(sesion);
  };

  const columns = [
    {
      field: "mensaje",
      headerName: "Mensaje",
      width: 500,
    },
    {
      field: "nro",
      headerName: "Nro",
      width: 150,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Inscriptos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenInscriptos(true);
    //   },
    // },
  ];
  return (
    <Grid spacing={2} container>
      <Grid item md={6}>
        <StatusWhatsapp onchangeSession={cambiaSesion} />
      </Grid>

      <Grid item md={12}>
        <ABMColeccion
          coleccion={`whatsapp/${fuego.auth().currentUser?.uid}/mensajes`}
          columns={columns}
          acciones={acciones}
          labelNuevo="Nuevo Mensaje Whatsapp"
          orderBy={["fecha_timestamp", "desc"]}
          icono={"fas fa-users"}
          maxWidth="md"
          Modelo={ModeloWhatsappMensaje}
          valoresIniciales={valoresInicialesWhatsappMensaje}
          titulo={`MENSAJES WSAP`}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
