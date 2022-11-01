import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloCierreCaja";
import { Icon, Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import Tooltip from "@mui/material/Tooltip";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "../socios/mensualizado/_form";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { formatMoney } from "@helpers/numbers";
import { QueryApi } from "@helpers/queryApi";
import TitulosFormularios from "@components/forms/tituloFormularios";
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
    field: "bajaServicio",
    headerName: "",
    width: 15,
    renderCell: (params) =>
      params.value ? (
        <Tooltip
          title={`Tiene baja del servicio para ${getFechaString(
            params.row.fechaBaja
          )}`}
        >
          <Icon class="fas fa-bell" />
        </Tooltip>
      ) : (
        ""
      ),
  },

  {
    field: "fechaInicio",
    headerName: "Proxima Cuota",
    width: 120,
    type: "date",
    renderCell: (params) => getFechaString(params.value),
  },
  {
    field: "socio",
    headerName: "SOCIO",
    width: 220,
    type: "date",
    renderCell: (params) =>
      `${params.row?.apellido} ${params.row?.nombre}`.toUpperCase(),
  },

  {
    field: "label_idProducto",
    headerName: "Producto",
    width: 290,
    renderCell: (params) =>
      renderCellExpandData(params, (row) => `${row.label_idProducto}`),
  },

  {
    field: "label_tipoPeriodo",
    headerName: "Tipo Periodo",
    width: 160,
    renderCell: (params) =>
      renderCellExpandData(params, (row) => `${row.label_tipoPeriodo}`),
  },
];
export default function MensualizadosIndex({ data, mod }) {
  const order = ["fechaInicio_timestamp", "asc"];
  const icono = "fas fa-stopwatch";
  const titulo = `MENSUALIZADOS`;
  const idPlantilla = mod.config?.plantillaCierre;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [seleccion, setSeleccion] = useState();
  const [openPagos, setOpenPagos] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const getRowClassName = (params) => {
    if (params.row.suspendida) return "disabled";
  };
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-share-alt",
    //   label: "Compartir",
    //   fn: async (row) => {
    //     setDataImpresion(row);
    //     setOpenImpresion(true);
    //   },
    // },
  ];
  console.log(localStorage.getItem("usermod"), fuego.auth().currentUser?.uid);
  const parentData =
    localStorage.getItem("usermod") === fuego.auth().currentUser?.uid;
  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          acciones={acciones}
          coleccion={`mensualizados`}
          columns={cols}
          where={[
            parentData
              ? ["idUsuario", "==", localStorage.getItem("usermod")]
              : ["usermod", "==", fuego.auth().currentUser?.uid],
          ]}
          hideNew={true}
          preData={{}}
          limit={50}
          orderBy={order}
          maxWidth={"md"}
          getRowClassName={getRowClassName}
          icono={icono}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          dataForm={{ mod }}
          titulo={"SOCIOS MENSUALIZADOS"}
          Form={Form}
        />
      </Grid>
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
