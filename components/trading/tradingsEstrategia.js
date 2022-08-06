import { Grid } from "@mui/material";

import { getFechaString } from "@helpers/dates";
import DialogContenido from "@components/forms/dialogContenido";

import { formatMoney, formatPorcentual } from "@helpers/numbers";
import ColeccionTable from "@components/forms/coleccionTable";
import TitulosFormularios from "@components/forms/tituloFormularios";
export default function TradingsEstrategia({ row, setOpen, open }) {
  const order = ["updateTime", "desc"];
  const coleccion = `estrategiasTrading/${row?.id}/tradings`;

  const columns = [
    {
      field: "fechaInicio",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) =>
        getFechaString(new Date(params.value), `DD/MM hh:mm`),
    },

    {
      field: "evento",
      headerName: "Evento",
      width: 80,
    },
    {
      field: "importe",
      headerName: "$ Operacion",
      width: 110,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "unRealizedProfit",
      headerName: "$ Ganacia",
      width: 110,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "porcentajeGanancia",
      headerName: "% ganancia",
      width: 90,
      renderCell: (params) => formatPorcentual(params.value),
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
  const getRowClassName = (params) => {
    if (Number(params.row.unRealizedProfit) < 0) return "warning";
  };
  if (!row) return null;
  return (
    <DialogContenido
      fullWidth={true}
      maxWidth="sm"
      open={open}
      setOpen={setOpen}
    >
      <Grid container>
        <Grid item xs={12}>
          <TitulosFormularios titulo="TRADINGS " subTitulo={"ESTRATEGIA"} />{" "}
        </Grid>
        <Grid item xs={12}>
          <ColeccionTable
            columns={columns}
            orderBy={order}
            getRowClassName={getRowClassName}
            coleccion={coleccion}
          />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
