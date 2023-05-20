import ABMColeccion from "@components/forms/ABMcollection2";

import { Button, Grid, Icon, Typography } from "@mui/material";
import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Modelo, {
  valoresIniciales,
} from "@modelos/ModeloCertificadosElectronicos";
import Form from "@pages/certificadosElectronicos/_form";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { WindowSharp } from "@mui/icons-material";
import Dialogo from "@components/forms/dialogo";
import ConfirmDialog from "@components/forms/confirmDialog";
import { getWherePermiso } from "@hooks/useUser";
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
      accessorKey: "fechaVto",
      header: "Fecha Vto",
      size: 100,
      Cell: ({ cell }) => getFechaString(cell.getValue()),
    },
    {
      header: "Cuit",
      accessorKey: "cuit",
      size: 100,
    },
    {
      accessorKey: "nroPuntoVenta",
      header: "Punto de Venta",
      size: 150,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 200,
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

  return (
    <Grid container>
      <Grid item md={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`certificadosElectronicos`}
          columns={columns}
          hidePaginador={true}
          rowsPerPage={100}
          where={getWherePermiso(`certificadosElectronicos`)}
          labelNuevo="nueva"
          preData={{}}
          orderBy={order}
          maxWidth={"md"}
          callbackchange={cambiaSeleccion}
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
