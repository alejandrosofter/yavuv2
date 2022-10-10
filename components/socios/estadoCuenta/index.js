import {
  ModeloEstadoCuenta,
  valoresInicialesEstadoCuenta,
} from "@modelos/ModeloSocios";
import { fuego } from "@nandorojo/swr-firestore";
import {
  Icon,
  Grid,
  Tooltip,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import { useState } from "react";
import NuevaDeuda from "../movimientosCuenta/nuevo";
const getColorDebito = (estado) => {
  let color = "";
  if (estado === "PENDIENTE") color = "#2a2121de";
  if (estado === "ACE") color = "#29ab29";
  if (estado === "PRE-DEBITO") color = "#e99e40";
  console.log(color);
  return color;
};
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
    field: "tipo",
    headerName: "Tipo",
    width: 120,
    // renderCell: (params) => formatMoney(params.value),
  },
  {
    field: "detalle",
    headerName: "Detalle",
    width: 405,
    renderCell: (params) =>
      renderCellExpandData(
        params,
        (row) => `${row.detalle ? row.detalle : ""}`
      ),
  },

  {
    field: "importeTotal",
    headerName: "$ Total",
    width: 90,
    renderCell: (params) => formatMoney(params.value),
  },
  {
    field: "importeSaldo",
    headerName: "$ Saldo",
    width: 90,
    renderCell: (params) => formatMoney(params.value ? params.value : 0),
  },
];
export default function EstadoCuentaSocio({ data, mod }) {
  const [openStatusDebito, setOpenStatusDebito] = useState(false);
  const [openAgregarDeuda, setOpenAgregarDeuda] = useState(false);
  const [seleccion, setSeleccion] = useState(false);
  const order = ["fecha_timestamp", "desc"];
  const subColeccion = "estadoCuenta";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `ESTADO DE LA CUENTA`;

  const mostrarAgregarDeuda = () => {
    setOpenAgregarDeuda(true);
  };
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-history",
      label: "Historial Debitos",
      fn: (row) => {
        setSeleccion(row);
        console.log(row);
        setOpenStatusDebito(true);
      },
    },
  ];
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  //agregar
  return (
    <Grid container>
      {/* <Grid item xs={10}></Grid> */}
      <Grid item xs={12}>
        <Button onClick={mostrarAgregarDeuda} variant="outlined" size="small">
          AGREGAR DEUDA
        </Button>
      </Grid>
      <Grid item xs={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          orderBy={order}
          where={[
            parentData
              ? ["idUsuario", "==", localStorage.getItem("usermod")]
              : ["usermod", "==", fuego.auth().currentUser?.uid],
          ]}
          maxWidth={"md"}
          preData={{}}
          labelNuevo="agregar estado"
          icono={icono}
          Modelo={ModeloEstadoCuenta}
          valoresIniciales={valoresInicialesEstadoCuenta}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <NuevaDeuda
        idSocio={data?.id}
        open={openAgregarDeuda}
        setOpen={setOpenAgregarDeuda}
      />
    </Grid>
  );
}
