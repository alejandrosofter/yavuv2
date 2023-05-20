import { useState } from "react";
import { Grid } from "@mui/material";
import { getFechaString } from "@helpers/dates";
import DialogContenido from "@components/forms/dialogContenido";
import ColeccionTable from "@components/forms/coleccionTable";
import { defaultOrderByFn } from "react-table";
import { formatMoney } from "@helpers/numbers";
import TitulosFormularios from "@components/forms/tituloFormularios";
export default function PagosCierresCaja({
  data,
  setOpen,
  open,
  callbackchange,
}) {
  const order = ["importe", "asc"];
  const coleccion = `cierresCaja/${data?.id}/pagos`;
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
      field: "label_cliente",
      headerName: "Socio",
      width: 200,
    },
    {
      field: "importe",
      headerName: "Importe",
      width: 100,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "importeTotal",
      headerName: "$ TOTAL",
      width: 100,
      renderCell: (params) => formatMoney(params.value),
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Resultados",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenIntegrantes(true);
    //   },
    // },
  ];
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="sm"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item md={12}>
          <TitulosFormularios
            titulo="PAGOS"
            icono={"fas fa-money-bill"}
            subTitulo={"de cierre caja diaria"}
          />
        </Grid>
        <Grid item md={12}>
          <ColeccionTable
            acciones={acciones}
            callbackclick={callbackclick}
            columns={columns}
            orderBy={order}
            coleccion={coleccion}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
