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
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getWherePermiso } from "@hooks/useUser";

export const cols = [
  {
    field: "agregarActividad",
    headerName: "",
    width: 12,
    renderCell: (params) =>
      params.value ? (
        <Tooltip title={`Enviado a modulo actividades`}>
          <Icon class="fas fa-futbol" />
        </Tooltip>
      ) : (
        ""
      ),
  },
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

  {
    field: "estado",
    headerName: "",
    width: 0,
    renderCell: (params) => {
      switch (params.value) {
        case "BAJA (ultimo mes)":
          return (
            <Icon
              title={`Mensualizacion de BAJA con ultimo mes`}
              className="fas fa-dot-circle"
              sx={{ color: "yellow" }}
            />
          );
        case "BAJA DEFINITIVA":
          return (
            <Icon
              title={`Mensualizacion de BAJA`}
              className="fas fa-dot-circle"
              sx={{ color: "yellow" }}
            />
          );

        case "ALTA":
          return (
            <Icon
              title={`Mensualizacion ACTIVA`}
              className="fas fa-dot-circle"
              sx={{ color: "green" }}
            />
          );
        case "SUSPENDIDA":
          return (
            <Icon
              title={`Mensualizacion SUSPENDIDA`}
              className="fas fa-dot-circle"
              sx={{ color: "orange" }}
            />
          );
      }
    },
  },
  {
    field: "fechaInicio",
    headerName: "Prox.Cuota",
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
export default function CuentaSocio({ data }) {
  const order = ["fecha"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `COMPROMISOS MENSUALES `;
  const config = UseConfigModulo("socios");
  const idPlantilla = config?.plantillaMensualizacion;
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
          where={getWherePermiso(`socios/${data?.id}/${subColeccion}`)}
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
          dataForm={{ socio: data }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <ImpresionDialog
        titulo="IMPRESIÓN MENSUALIZACION"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="MENSUALIZACION "
        data={dataImpresion}
        plantilla={plantilla}
        emailDefault={dataImpresion?.socio?.email}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
