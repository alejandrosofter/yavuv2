import ABMColeccion from "@components/forms/ABMcollection2";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import Modelo, {
  valoresIniciales,
} from "@modelos/ModeloComprobantesElectronicos";
import Form from "@components/cobros/_form";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({ mod, parentData = false }) {
  useLayout({
    label: "Comprobantes",
    titulo: "COMPROBANTES",
    icon: "fas fa-file-invoice",
    acciones: [
      {
        label: "Comprobantes",
        icono: "fas fa-file-invoice",
        url: "/comprobantesElectronicos",
      },
      {
        label: "Informes",
        icono: "fas fa-newspaper",
        url: "/comprobantesElectronicos/informes",
      },
    ],
  });
  const [dataConsulta, setDataConsulta] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [openImpresion, setOpenImpresion] = useState(false);
  const config = UseConfigModulo("comprobantesElectronicos");
  const idPlantilla = config?.planillaComprobanteDigital;
  const plantillaEmail = config?.emailComprobanteDigital;
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });

  const getImporteTotal = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total +=
        Number(items[i].importe) * Number(items[i].cantidad) -
        Number(items[i].importeBonificacion ? items[i].importeBonificacion : 0);
    }
    return total;
  };
  const columns = [
    {
      accessorKey: "CbteDesde",
      header: "Nro",
      size: 100,
    },
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 100,
      filterFn: (row, id, filterValue) => {
        // console.log(
        //   `importe total ${getImporteTotal(row.getValue(id))} == ${filterValue}`
        // );
        return getFechaString(row.getValue(id)) === filterValue;
      },
      Cell: ({ cell }) =>
        getFechaString(cell.getValue() ? cell.getValue() : ""),
    },
    {
      accessorKey: "label_tipoComprobante",
      header: "Tipo Comp.",
      size: 150,
      Cell: ({ cell }) =>
        cell.getValue()
          ? `${cell.getValue()}`
          : `${cell.row.original.nombreTipoComprobante}`,
    },
    {
      accessorKey: "razonSocial",
      header: "Razon Social",
      size: 200,
    },
    // {
    //   field: "label_tipoComprobante",
    //   headerName: "Tipo Comprobante",
    //   width: 150,
    // },

    {
      accessorKey: "email",
      header: "Email",
      size: 190,
    },
    {
      accessorKey: "nroCae",
      header: "CAE",
      size: 120,
      Cell: ({ cell }) =>
        cell.row.original?.nroCae
          ? cell.row.original.nroCae
          : cell.row.original?.error,
    },
    {
      accessorKey: "items",
      header: "$ Importe",
      size: 150,
      filterFn: (row, id, filterValue) => {
        // console.log(
        //   `importe total ${getImporteTotal(row.getValue(id))} == ${filterValue}`
        // );
        return getImporteTotal(row.getValue(id)) === Number(filterValue);
      },

      Cell: ({ cell }) =>
        formatMoney(getImporteTotal(cell.getValue() ? cell.getValue() : "")),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
    },
  ];
  let fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-file-invoice",
      label: "Subir AFIP",
      fn: (data) => {
        setDataConsulta({
          url: "/api/comprobantesElectronicos/subirAfip",
          data,
        });
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",

      fn: (data) => {
        setOpenImpresion(true);
        setDataImpresion(data);
      },
    },
  ];

  return (
    <>
      <ABMColeccion
        coleccion={`comprobantesElectronicos`}
        columns={columns}
        hideNew={true}
        acciones={fnAcciones}
        orderBy={["fecha_timestamp", "desc"]}
        limit={10}
        maxWidth="lg"
        gridOptions={{
          initialState: { showColumnFilters: true },
        }}
        where={getWherePermiso("comprobantesElectronicos")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        titulo={`COMPROBANTES ELECTRONICOS`}
        Form={Form}
      />

      <ImpresionDialog
        titulo="COMPARTIR COMPROBANTE"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COMPROBANTE DE PAGO"
        data={{ ...dataImpresion, email: dataImpresion?.email }}
        plantilla={plantilla}
        emailDefault={dataImpresion?.email}
        plantillaEmail={plantillaEmail}
        attachments={[{ filename: "COMPROBANTE.pdf", data: plantilla }]}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
