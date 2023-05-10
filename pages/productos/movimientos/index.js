import { useState } from "react";
import { Grid } from "@mui/material";

import { getFechaString } from "@helpers/dates";
import DialogContenido from "@components/forms/dialogContenido";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import {
  ModeloMovimientos,
  valoresInicialesMovimientos,
} from "@modelos/ModeloProductos";
export default function MovimientosProducto({
  producto,
  setOpen,
  open,
  callbackchange,
}) {
  const [where, setWhere] = useState([]);
  const order = ["fecha_timestamp", "desc"];

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
      field: "label_cliente",
      headerName: "Cliente/Proveedor",
      width: 300,
    },
    {
      field: "coleccion",
      headerName: "Coleccion",
      width: 120,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
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
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item xs={12}>
          <ABMColeccion
            coleccion={`productos/${producto?.id}/movimientos`}
            columns={columns}
            orderBy={order}
            where={where}
            maxWidth="md"
            callbackclick={callbackclick}
            icono={"fas fa-users"}
            Modelo={ModeloMovimientos}
            valoresIniciales={valoresInicialesMovimientos}
            preData={{ idProducto: producto?.id }}
            titulo={`${producto?.nombre} / Movimientos`}
            Form={Form}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
