import ABMColeccion2 from "@components/forms/ABMcollection2";
import DialogContenido from "@components/forms/dialogContenido";

import Form from "@pages/comprobantesElectronicos/_form";
import { Button, Grid, Typography } from "@mui/material";
import { fuego, useCollection, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useRef, useState } from "react";
import { addQueryApi } from "@helpers/db";
import ModeloComprobantesElectronicos, {
  valoresIniciales,
} from "@modelos/ModeloComprobantesElectronicos";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import Dialogo from "@components/forms/dialogo";
import { GamesSharp, PasswordOutlined } from "@mui/icons-material";
export default function GenerarComprobantesCierreDialog({
  open,
  setOpen,
  seleccion,
  parentData,
}) {
  const tableInstanceRef = useRef();
  const [dataConsulta, setDataConsulta] = useState();
  const [openConfirma, setOpenConfirma] = useState(false);

  const order = ["label_cliente", "asc"];

  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      Cell: ({ cell }) => `${getFechaString(cell.row.original.fecha)}`,
      size: 100,
    },
    {
      accessorKey: "label_cliente",
      header: "Socio",
      filterFn: "includesString",
      //   Cell: ({ cell }) =>
      //     `${cell.row.original.apellido}, ${cell.row.original.nombre}`,
      size: 200,
    },
    {
      accessorKey: "error",
      header: "Error",
      size: 290,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      filterFn: "includesString",
      // Cell: ({ cell }) => `${getFechaString(cell.row.original.ultimaCuota)}`,
      size: 110,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-file-invoice",
      label: "Subir AFIP",
      fn: (data) => {
        addQueryApi("subirComprobanteAfip", data);
      },
    },
  ];

  const confirmaGeneracion = async () => {
    // setDataConsulta({
    //   url: "/api/cierresCaja/generarFacturas",
    //   data: seleccion,
    // });
    if (seleccion)
      addQueryApi("generarFacturas", {
        ...seleccion,
      }).then((res) => {
        setOpen(false);
      });
  };
  const facturar = async () => {
    setOpenConfirma(true);
  };
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="md"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={12}>
          <Typography variant="h2">FACTURAR CIERRE DE CAJA</Typography>
        </Grid>
        <Grid item md={10}>
          <Typography variant="h5">COMPROBANTES RECHAZADOS </Typography>
          <Typography variant="h6"> (para corregir y reenviar)</Typography>
        </Grid>
        <Grid item={2}>
          <Button
            fullWidth={true}
            variant="contained"
            color="primary"
            onClick={facturar}
          >
            Facturar
          </Button>
        </Grid>
        <Grid item md={12}>
          <ABMColeccion2
            coleccion={`comprobantesElectronicos`}
            columns={columns}
            acciones={acciones}
            maxWidth={"md"}
            where={[
              parentData
                ? ["idUsuario", "==", localStorage.getItem("usermod")]
                : ["usermod", "==", fuego.auth().currentUser?.uid],

              ["estado", "in", ["RECHAZADO", "PROCESANDO"]],
            ]}
            gridOptions={{
              // renderTopToolbarCustomActions: () => <Grid container></Grid>,
              tableInstanceRef,
              //   muiSelectCheckboxProps: ({ row }) => {

              //     return {
              //       color: "secondary",
              //       disabled: true,
              //     };
              //   },
              initialState: { showColumnFilters: false },
              // enableRowSelection: true,
              filterFns: {
                filtroFecha: (row, id, filterValue) => {
                  const date = new Date(row.original[id].seconds * 1000);
                  const dateFiltro = new Date(filterValue);

                  //si es fecha invalida
                  if (isNaN(dateFiltro.getTime())) return true;
                  //comparo fechas
                  return (
                    date.getDate() === dateFiltro.getDate() &&
                    date.getMonth() === dateFiltro.getMonth() &&
                    date.getFullYear() === dateFiltro.getFullYear()
                  );
                },
              },
              // getRowId: (row) => row.id,
            }}
            order={order}
            // callbackclick={callbackclick}
            icono={"fas fa-users"}
            Modelo={ModeloComprobantesElectronicos}
            valoresIniciales={valoresIniciales}
            preData={{
              cierreCaja: seleccion,
            }}
            dataForm={{
              showSelectSocio: true,
            }}
            hideNew={true}
            titulo={`COMPROBANTES RECHAZADOS`}
            Form={Form}
          />
        </Grid>
      </Grid>
      <QueryApi dataConsulta={dataConsulta} />
      <Dialogo
        open={openConfirma}
        setOpen={setOpenConfirma}
        titulo="Confirmar"
        callbackAcepta={confirmaGeneracion}
        detalle={`Relamente deseas generar los comprobantes para este cierre de caja? 
          ... al hacerlo se imputaran los comprobantes y se enviaran por correo. ${
            tableInstanceRef.current?.getSelectedRowModel().rows.length > 0
              ? `TIENE ${
                  tableInstanceRef.current?.getSelectedRowModel().rows.length
                } COMPROBANTES RECHAZADOS PARA RE-ENVIAR!`
              : ``
          } `}
      />
    </DialogContenido>
  );
}
