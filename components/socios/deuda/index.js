import { useState, useCallback } from "react";
import { ModeloMensualizado, valoresMensualizado } from "@modelos/ModeloSocios";
import { Icon, Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import Tooltip from "@mui/material/Tooltip";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";

import { QueryApi } from "@helpers/queryApi";

export const cols = [
  {
    field: "estado",
    headerName: "",
    width: 0,
    renderCell: (params) => {
      switch (params.value) {
        case "PENDIENTE":
          return (
            <Icon
              title={`Deuda pendiente`}
              className="fas fa-dot-circle"
              sx={{ color: "red" }}
            />
          );
        case "CANCELADA":
          return (
            <Icon
              title={`Pagada`}
              className="fas fa-dot-circle"
              sx={{ color: "green" }}
            />
          );
      }
    },
  },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 125,
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

  // {
  //   field: "label_tipoPeriodo",
  //   headerName: "Tipo Periodo",
  //   width: 160,
  //   renderCell: (params) =>
  //     renderCellExpandData(params, (row) => `${row.label_tipoPeriodo}`),
  // },
];
export default function CuentaSocio({ data, mod }) {
  const order = ["fecha"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `COMPROMISOS MENSUALES `;
  const idPlantilla = mod.config?.plantillaMensualizacion;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const getRowClassName = (params) => {
    // if (params.row.suspendida) return "disabled";
  };
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: (row) => {
        const socio = JSON.parse(localStorage.getItem("socioSeleccion"));

        setDataImpresion({ ...row, socio });
        setOpenImpresion(true);
      },
    },

    {
      esFuncion: true,
      icono: "fas fa-envelope",
      label: "Re-Enviar a su Actividad",
      fn: (row) => {
        console.log(row);
        setDataConsulta({
          url: "/api/mensualizados/reEnviarActividad",
          data: row,
        });
      },
    },
  ];
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          rowsPerPage={100}
          hidePaginador={true}
          where={[
            parentData
              ? ["idUsuario", "==", localStorage.getItem("usermod")]
              : ["usermod", "==", fuego.auth().currentUser?.uid],
          ]}
          labelNuevo="Agregar compromiso mensual"
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
          dataForm={{ mod, socio: data }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
