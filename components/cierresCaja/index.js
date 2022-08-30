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
    field: "total",
    headerName: "Detalle",
    width: 320,
    renderCell: (params) =>
      params.value
        ? `Se registraron ${params.value} pagos en el cierre de caja`
        : "Aguarde...",
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 100,
  },
];
export default function CuentaSocio({ data, mod }) {
  console.log(localStorage.getItem("usermod"));
  const order = ["fecha"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `CIERRES DE CAJA`;
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
  const getDataImpresion = async (row) => {
    let formasDePago = [];
    await fuego.db
      .collection(`cierresCaja/${row.id}/cierresFormaPago`)
      .get()
      .then(async (docCierre) => {
        for (let i = 0; i < docCierre.docs.length; i++) {
          console.log(
            `cierresCaja/${row.id}/cierresFormaPago/${docCierre.docs[i].id}/items`
          );
          const items = await fuego.db
            .collection(
              `cierresCaja/${row.id}/cierresFormaPago/${docCierre.docs[i].id}/items`
            )
            .get()
            .then((docItems) => {
              return docItems.docs.map((doc) => doc.data());
            });
          formasDePago.push({
            ...docCierre.docs[i].data(),
            items,
          });
        }
      });
    return formasDePago;
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
      fn: async (row) => {
        const formasDePago = await getDataImpresion(row);

        setDataImpresion({ ...row, formasDePago });
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
