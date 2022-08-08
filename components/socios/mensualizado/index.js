import { useState, useCallback } from "react";
import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { Icon, Grid } from "@mui/material";

import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import Tooltip from "@mui/material/Tooltip";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
export const cols = [
  {
    field: "esPorDebitoAutomatico",
    headerName: "",
    width: 15,
    renderCell: (params) =>
      params.value ? (
        <Tooltip title={`Es por Débito automático`}>
          <Icon class="fas fa-credit-card" />
        </Tooltip>
      ) : (
        ""
      ),
  },
  // {
  //   field: "hijo",
  //   headerName: "",
  //   width: 20,
  //   renderCell: (params) =>
  //     params.value ? (
  //       <Tooltip title={`${params.value.apellido} ${params.value.nombre}`}>
  //         <Icon class="fas fa-users" />
  //       </Tooltip>
  //     ) : (
  //       ""
  //     ),
  // },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 85,
    type: "date",
    renderCell: (params) => getFechaString(params.value),
  },

  {
    field: "label_idProducto",
    headerName: "Producto",
    width: 190,
    renderCell: (params) =>
      renderCellExpandData(params, (row) => `${row.label_idProducto}`),
  },
  {
    field: "idProducto_importe",
    headerName: "$ Importe",
    width: 110,
    renderCell: (params) => formatMoney(params.value),
  },

  {
    field: "label_tipoPeriodo",
    headerName: "Tipo Periodo",
    width: 110,
    renderCell: (params) =>
      renderCellExpandData(params, (row) => `${row.label_tipoPeriodo}`),
  },
];
export default function CuentaSocio({ data, mod }) {
  const order = ["fecha"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `MENSUAL `;

  const getRowClassName = (params) => {
    if (params.row.suspendida) return "disabled";
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          preData={{
            idSocio: data?.id,
            apellido: data?.apellido,
            nombre: data?.nombre,
            dni: data?.dni,
            nroSocio: data?.nroSocio,
          }}
          order={order}
          maxWidth={"md"}
          getRowClassName={getRowClassName}
          // callbackclick={callbackclick}
          icono={icono}
          Modelo={ModeloMensualizado}
          valoresIniciales={valoresMensualizado}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
    </Grid>
  );
}
