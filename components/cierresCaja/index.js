import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloCierreCaja";
import { Icon, Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import Tooltip from "@mui/material/Tooltip";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { formatMoney } from "@helpers/numbers";
import { QueryApi } from "@helpers/queryApi";
import PagosCierresCaja from "./pagos";
export const cols = [
  {
    field: "fecha",
    headerName: "Fecha",
    width: 85,
    type: "date",
    renderCell: (params) => getFechaString(params.value),
  },
  {
    field: "importeAbre",
    headerName: "$ Abre",
    width: 120,
    renderCell: (params) => formatMoney(params.value),
  },

  {
    field: "importeItems",
    headerName: "$ Items",
    width: 190,
    renderCell: (params) => formatMoney(params.value),
  },
  {
    field: "total",
    headerName: "$ TOTAL",
    width: 120,
    renderCell: (params) =>
      formatMoney(
        Number(params.row.importeAbre) +
          (params.row.importeItems ? params.row.importeItems : 0)
      ),
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 100,
  },
];
export default function CuentaSocio({ data, mod }) {
  const order = ["fecha"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `CIERRES DE CAJA`;
  const idPlantilla = mod.config?.plantillaCierreCaja;
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
    {
      esFuncion: true,
      icono: "fas fa-check-double",
      label: "Re-Chequeo",
      fn: (data) => {
        setDataConsulta({ url: "/api/cierresCaja/rechequeo", data });
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-list",
      label: "Pagos",
      fn: (row) => {
        setSeleccion(row);
        setOpenPagos(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: (row) => {
        setDataImpresion(row);
        setOpenImpresion(true);
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
          coleccion={`cierresCaja`}
          columns={cols}
          where={[
            parentData
              ? ["idUsuario", "==", localStorage.getItem("usermod")]
              : ["usermod", "==", fuego.auth().currentUser?.uid],
          ]}
          labelNuevo="Agregar cierre de caja"
          preData={{}}
          order={order}
          maxWidth={"md"}
          getRowClassName={getRowClassName}
          icono={icono}
          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <ImpresionDialog
        titulo="IMPRESIÓN CIERRE"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="CIERRE DE CAJA "
        data={dataImpresion}
        plantilla={plantilla}
        // emailDefault={dataImpresion?.socio?.email}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
      <PagosCierresCaja
        open={openPagos}
        setOpen={setOpenPagos}
        data={seleccion}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
