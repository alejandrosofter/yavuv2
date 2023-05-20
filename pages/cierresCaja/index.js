import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloCierreCaja";
import { Grid } from "@mui/material";
import { fuego } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import ABMColeccion from "@components/forms/ABMcollection2";
import Form from "@components/cierresCaja/_form";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { QueryApi } from "@helpers/queryApi";
import PagosCierresCaja from "@components/cierresCaja/pagos";
import { groupBy, objectToArray, orderArray } from "@helpers/arrays";

import GenerarComprobantesCierreDialog from "@components/cierresCaja/generarFacturas";
import { getWherePermiso } from "@hooks/useUser";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
export const columns = [
  {
    accessorKey: "fecha",
    header: "Fecha",
    size: 85,
    Cell: ({ cell }) => {
      return getFechaString(cell.getValue(), "DD/MM hh:mm");
    },
  },
  {
    accessorKey: "total",
    header: "Detalle",
    size: 320,
    Cell: ({ cell }) =>
      cell.getValue() === 0
        ? "No hay registros de cobros"
        : cell.getValue()
        ? `Se registraron ${cell.getValue()} pagos en el cierre de caja`
        : "Aguarde...",
  },
  {
    accessorKey: "label_puntoVenta",
    header: "Punto Venta",
    size: 150,
  },

  {
    accessorKey: "statusFiscal",
    header: "Estado Fiscal",
    Cell: ({ cell }) => (cell.getValue() ? cell.getValue() : `No Fiscalizado`),
    size: 150,
  },
  {
    accessorKey: "estado",
    header: "Estado",
    size: 100,
  },
];
export default function Page({}) {
  useLayout({
    label: "Cierre de Caja",
    titulo: "CIERRE DE CAJA",
    icon: "fas fa-file-invoice-dollar",
    acciones: [
      {
        label: "Cierres",
        icono: "fas fa-file-invoice-dollar",
        url: "/cierresCaja",
      },
      {
        label: "Config",
        icono: "fas fa-cog",
        url: "/cierresCaja/config",
      },
    ],
  });
  const order = ["fecha_timestamp", "desc"];
  const subColeccion = "mensualizado";
  const icono = "fas fa-file-invoice-dollar";
  const titulo = `CIERRES DE CAJA`;
  const config = UseConfigModulo("cierresCaja");
  const idPlantilla = config?.plantillaCierre;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [openGenerarComprobantes, setOpenGenerarComprobantes] = useState(false);
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
  const getDataImpositivo = (row) => {
    const dataImpositivo = groupBy(
      row.comprobantes ? row.comprobantes : [],
      (item) => {
        return item.label_tipoComprobante;
      },
      true
    );
    // ;
    //concat value
    let impositivo = [];
    let i = 0;

    for (const [key, value] of Object.entries(dataImpositivo)) {
      impositivo[i] = {
        nrosComprobantes: value
          .map((item) => item.nroComprobante)
          //order
          .sort((a, b) => a - b)
          .join(", "),
        importeGravado: value.reduce(
          (a, b) => a + Number(b.ImpIVA) + Number(b.ImpNeto),
          0
        ),
        importeExento: value.reduce((a, b) => a + Number(b.ImpOpEx), 0),
        label: key,
      };
      i++;
    }
    return impositivo;
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
        }
        setLoading(false);
      });
    return formasDePago;
  };
  const getDataProductos = (data) => {
    let productos = data
      .map((item) => {
        return item.deudas?.map((deuda) => ({
          ...deuda,
          formaPago: item.formaPago,
          label_formaPago: item.label_formaPago,
        }));
      })
      .flat();

    // delete repited id items
    productos = productos.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );
    //order
    productos = orderArray(productos, ["label_formaPago", "asc"]);
    return productos;
  };
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-file-invoice",
      label: "Generar Facturas",
      fn: (data) => {
        setSeleccion(data);
        setOpenGenerarComprobantes(true);
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
        const dataImpresion = await getDataImpresion(row);
        const data = groupBy(
          dataImpresion,
          (item) => {
            return item.label_formaPago;
          },
          true
        );
        console.log(row);
        const impositivo = getDataImpositivo(row);
        let itemsProductos = objectToArray(
          groupBy(
            getDataProductos(dataImpresion),
            (item) => {
              return item.idProducto;
            },
            true
          )
        );

        itemsProductos = itemsProductos.map((item) => {
          return {
            label_idProducto: item[0].label_idProducto,
            idProducto: item[0].idProducto,
            cantidad: item.reduce((a, b) => a + Number(b.cantidad), 0),
            importe: item.reduce((a, b) => a + Number(b.importe), 0),
            importeFinal: item.reduce(
              (a, b) =>
                a +
                Number(b.importe) * Number(b.cantidad) -
                Number(b.importeBonificacion),
              0
            ),
            importeBonificacion: item.reduce(
              (a, b) => a + Number(b.importeBonificacion),
              0
            ),
          };
        });

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

        setDataImpresion({
          ...row,
          items,
          itemsProductos,
          user: fuego.auth().currentUser,
          impositivo,
        });
        setOpenImpresion(true);
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`cierresCaja`}
          columns={columns}
          hideNew={false}
          labelNuevo="Nuevo Cierre de Caja"
          acciones={acciones}
          orderBy={["fecha_timestamp", "desc"]}
          limit={10}
          maxWidth="lg"
          gridOptions={{
            initialState: { showColumnFilters: true },
          }}
          where={getWherePermiso("cierresCaja")}
          // callbackclick={callbackclick}

          Modelo={Modelo}
          valoresIniciales={valoresIniciales}
          titulo={`CIERRES DE CAJA`}
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
      <GenerarComprobantesCierreDialog
        open={openGenerarComprobantes}
        setOpen={setOpenGenerarComprobantes}
        seleccion={seleccion}
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
