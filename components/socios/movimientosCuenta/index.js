import {
  ModeloMovimientoCuenta,
  valoresInicialesMovimiento,
} from "@modelos/ModeloSocios";
import { Icon, Grid, Tooltip, Typography } from "@mui/material";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import ABMColeccion from "@components/forms/ABMcollection";
const getColorDebito = (estado) => {
  let color = "";
  if (estado === "PENDIENTE") color = "#2a2121de";
  if (estado === "ACE") color = "#29ab29";
  console.log(color);
  return color;
};
import Form from "./_formMovimientoCuenta";
export const cols = [
  {
    field: "fecha",
    headerName: "Fecha",
    width: 80,
    renderCell: (params) =>
      params.value ? (
        <Tooltip title={`CON VTO el ${getFechaString(params.row.fechaVto)}`}>
          <Typography>{`${getFechaString(params.row.fecha)}`}</Typography>
        </Tooltip>
      ) : (
        ""
      ),
  },
  {
    field: "hijo",
    headerName: "",
    width: 15,
    renderCell: (params) =>
      params.value ? (
        <Tooltip title={`${params.value.apellido} ${params.value.nombre}`}>
          <Icon class="fas fa-users" />
        </Tooltip>
      ) : (
        ""
      ),
  },
  {
    field: "label_idProducto",
    headerName: "Servicio/Producto",
    width: 165,
    renderCell: (params) =>
      renderCellExpandData(
        params,
        (row) => `${row.label_idProducto} ${row.detalle ? row.detalle : ""}`
      ),
  },

  {
    field: "importe",
    headerName: "$ Importe",
    width: 90,
    renderCell: (params) => formatMoney(params.value),
  },
  {
    field: "importeBonificacion",
    headerName: "$ BONIF.",
    width: 90,
    renderCell: (params) => formatMoney(params.value ? params.value : 0),
  },
  {
    field: "total",
    headerName: "$ TOTAL",
    width: 90,
    renderCell: (params) => {
      const importe =
        (params.row.importe ? params.row.importe : 0) -
        (params.row.importeBonificacion ? params.row.importeBonificacion : 0);
      return formatMoney(importe);
    },
  },
  {
    field: "esPorDebitoAutomatico",
    headerName: "",
    width: 0,
    renderCell: (params) =>
      params.value ? (
        <Icon
          sx={{ color: getColorDebito(params.row.estadoDebito) }}
          title={`${
            params.row.estadoDebito ? params.row.estadoDebito : "Sin novedad"
          }`}
          className="fas fa-credit-card"
        />
      ) : (
        ""
      ),
  },
  {
    field: "estado",
    headerName: "",
    width: 0,
    renderCell: (params) => {
      switch (params.value) {
        case "PENDIENTE":
          return (
            <Icon
              title={params.value}
              className="fas fa-dot-circle"
              sx={{ color: "red" }}
            />
          );

        case "CANCELADO":
          return (
            <Icon
              title={params.value}
              className="fas fa-dot-circle"
              sx={{ color: "green" }}
            />
          );
        default:
          return (
            <Icon
              title={params.value}
              className="fas fa-dot-circle"
              sx={{ color: "yellow" }}
            />
          );
      }
    },
  },
];
export default function CuentaSocio({ data, mod }) {
  const order = ["fecha", "desc"];
  const subColeccion = "movimientosCuenta";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `MOVIMIENTOS DE LA CUENTA`;

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          preData={{}}
          maxWidth={"md"}
          icono={icono}
          Modelo={ModeloMovimientoCuenta}
          valoresIniciales={valoresInicialesMovimiento}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
