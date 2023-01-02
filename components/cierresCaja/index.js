import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloCierreCaja";
import { Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { formatMoney } from "@helpers/numbers";
import { QueryApi } from "@helpers/queryApi";
import PagosCierresCaja from "./pagos";
import { groupBy, orderArray } from "@helpers/arrays";
import Dialogo from "@components/forms/dialogo";
import { addQueryApi } from "@helpers/db";
export const cols = [
  {
    field: "fecha",
    headerName: "Fecha",
    width: 85,
    renderCell: (params) => getFechaString(params.value, "DD/MM hh:mm"),
  },

  {
    field: "total",
    headerName: "Detalle",
    width: 320,
    renderCell: (params) =>
      params.value === 0
        ? "No hay registros de cobros"
        : params.value
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
  const order = ["fecha_timestamp", "desc"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `CIERRES DE CAJA`;
  const idPlantilla = mod.config?.plantillaCierre;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [openConfirma, setOpenConfirma] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [seleccion, setSeleccion] = useState();
  const [openPagos, setOpenPagos] = useState();
  const [loading, setLoading] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const getRowClassName = (params) => {
    if (params.row.suspendida) return "disabled";
  };
  const getDataImpresion = async (row) => {
    let formasDePago = [];
    setLoading(true);
    await fuego.db
      .collection(`cierresCaja/${row.id}/cierresFormaPago`)
      .get()
      .then(async (docCierre) => {
        for (let i = 0; i < docCierre.docs.length; i++) {
          formasDePago.push({
            ...docCierre.docs[i].data(),
            id: docCierre.docs[i].id,
          });
          // const items = await fuego.db
          //   .collection(
          //     `cierresCaja/${row.id}/cierresFormaPago/${docCierre.docs[i].id}/items`
          //   )
          //   .get()
          //   .then((docItems) => {
          //     return docItems.docs.map((doc) => doc.data());
          //   });
          // formasDePago.push({
          //   ...docCierre.docs[i].data(),
          //   items,
          // });
        }
        setLoading(false);
      });
    return formasDePago;
  };
  const confirmaGeneracion = async () => {
    // setDataConsulta({
    //   url: "/api/cierresCaja/generarFacturas",
    //   data: seleccion,
    // });
    if (seleccion) addQueryApi("generarFacturas", seleccion);
  };
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-file-invoice",
      label: "Generar Facturas",
      fn: (data) => {
        setSeleccion(data);
        setOpenConfirma(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-check-double",
      label: "Re-Chequeo",
      fn: (data) => {
        setDataConsulta({ url: "/api/cierresCaja/rechequeo", data });
      },
    },
    // {
    //   esFuncion: true,
    //   icono: "fas fa-list",
    //   label: "Pagos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenPagos(true);
    //   },
    // },
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: async (row) => {
        const formasDePago = await getDataImpresion(row);
        const data = groupBy(
          formasDePago,
          (item) => {
            return item.label_formaPago;
          },
          true
        );
        let items = [];
        //loop object data
        for (const [key, value] of Object.entries(data)) {
          items.push({
            label_formaPago: key,
            items: orderArray(value, "fecha"),
            importe: value.reduce((a, b) => a + Number(b.importe), 0),
            total: value.reduce((a, b) => a + Number(b.importeTotal), 0),
          });
        }
        // console.log({ ...row, items, user: fuego.auth().currentUser });
        setDataImpresion({ ...row, items, user: fuego.auth().currentUser });
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
          orderBy={order}
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
      <Dialogo
        open={openConfirma}
        setOpen={setOpenConfirma}
        titulo="Confirmar"
        callbackAcepta={confirmaGeneracion}
        detalle={
          "Relamente deseas generar los comprobantes para este cierre de caja? ... al hacerlo se imputaran los comprobantes y se enviaran por correo"
        }
      />
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
