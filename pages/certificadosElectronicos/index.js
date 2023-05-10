import ABMColeccion from "@components/forms/ABMcollection";

import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Modelo, {
  valoresIniciales,
} from "@modelos/ModeloCertificadosElectronicos";
import Form from "@components/certificadosElectronicos/_form";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { WindowSharp } from "@mui/icons-material";
import Dialogo from "@components/forms/dialogo";
import ConfirmDialog from "@components/forms/confirmDialog";
export default function ListadoCertificadosElectronicos({
  callbackchange,
  mod,
}) {
  const [openDialog, setOpenDialog] = useState();
  const order = ["fechaVto_timestamp", "asc"];

  const cambiaSeleccion = (data) => {
    if (callbackchange) {
      callbackchange(data);
    }
  };
  const columns = [
    {
      field: "fechaVto",
      headerName: "Fecha Vto",
      width: 100,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "cuit",
      headerName: "Cuit",
      width: 100,
    },
    {
      field: "nroPuntoVenta",
      headerName: "Punto de Venta",
      width: 150,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 200,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-download",
      label: "Descargar Pedido",

      fn: (data) => {
        //download file url
        if (data.filePedido) window.open(data.filePedido.url, "_blank");
      },
    },
  ];
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  return (
    <Grid container>
      <Grid item md={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`certificadosElectronicos`}
          columns={columns}
          hidePaginador={true}
          rowsPerPage={100}
          where={[
            parentData
              ? ["idUsuario", "==", localStorage.getItem("usermod")]
              : ["usermod", "==", fuego.auth().currentUser?.uid],
          ]}
          labelNuevo="nueva"
          preData={{}}
          orderBy={order}
          maxWidth={"md"}
          callbackchange={cambiaSeleccion}
          // callbackclick={callbackclick}
          icono={"fas fa-certificate"}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          dataForm={{ mod }}
          titulo={`CERTIFICADOS ELECTRONICOS`}
          Form={Form}
        />
        <ConfirmDialog
          open={openDialog}
          setOpen={setOpenDialog}
          mensaje="Al parecer no hay pedido.. vuelve a crear un certificado"
        />
      </Grid>
    </Grid>
  );
}
