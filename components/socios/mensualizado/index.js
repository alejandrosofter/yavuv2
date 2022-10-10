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
import { pink } from "@mui/material/colors";
import { QueryApi } from "@helpers/queryApi";
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

  {
    field: "estado",
    headerName: "",
    width: 0,
    renderCell: (params) => {
      switch (params.value) {
        case "BAJA":
          return (
            <Icon
              title={`Mensualizacion de BAJA`}
              className="fas fa-dot-circle"
              sx={{ color: "red" }}
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
  // {
  //   field: "fecha",
  //   headerName: "Fecha",
  //   width: 85,
  //   type: "date",
  //   renderCell: (params) => getFechaString(params.value),
  // },
  {
    field: "ultimaCuota",
    headerName: "Ult.cuota",
    width: 85,
    type: "date",
    renderCell: (params) => getFechaString(params.value),
  },
  {
    field: "fechaInicio",
    headerName: "Prox.Cuota",
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
  // {
  //   field: "idProducto_importe",
  //   headerName: "$ Importe",
  //   width: 110,
  //   renderCell: (params) => formatMoney(params.value),
  // },

  {
    field: "label_tipoPeriodo",
    headerName: "Tipo Periodo",
    width: 160,
    renderCell: (params) =>
      renderCellExpandData(params, (row) => `${row.label_tipoPeriodo}`),
  },
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
        setDataImpresion(row);
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
          dataForm={{ mod }}
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
