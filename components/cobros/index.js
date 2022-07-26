import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { getFechaString } from "../../helpers/dates";
import { formatMoney } from "../../helpers/numbers";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
import ImpresionDialog from "@components/forms/impresion";
import { useState } from "react";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { Typography } from "@mui/material";
import { parse } from "handlebars";
export default function Modulo({ mod }) {
  const idPlantilla = mod.config?.plantillaCobro;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const fnLabelDetalle = (item, nro) => {
    const bonif = Number(
      item.importeBonificacion ? item.importeBonificacion : 0
    );
    const importe = (item.importe * item.cantidad - bonif).toFixed(2);
    const hijo = item.hijo
      ? ` (${item.hijo.apellido.toUpperCase()} ${item.hijo.nombre})`
      : "";
    return `${nro}.- ${getFechaString(item.fechaVto)} - ${
      item.label_idProducto
    }  ${item.detalle ? item.detalle : ""} ${hijo} $${importe}, `;
  };
  const getDetalle = (row) => {
    const items = row.deudas;
    let aux = "";
    if (items)
      for (let i = 0; i < items.length; i++) {
        aux += fnLabelDetalle(items[i], i + 1);
      }
    //return parse html
    parse;
    return aux;
  };
  let fnAcciones = {
    compartir: (data) => {
      setOpenImpresion(true);
      setDataImpresion(data);
    },
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => {
        return getFechaString(params.value);
      },
    },
    {
      field: "label_cliente",
      headerName: "Cliente",
      width: 250,
    },
    {
      field: "deudas",
      headerName: "Detalle",
      width: 300,
      renderCell: (params) => renderCellExpandData(params, getDetalle),
    },
    {
      field: "importe",
      headerName: "$ Importe",
      width: 120,
      renderCell: (params) => {
        return formatMoney(params.value);
      },
    },
    {
      field: "importeBonificacion",
      headerName: "$ Bonif.",
      width: 150,
      renderCell: (params) => {
        return formatMoney(params.value);
      },
    },
    {
      field: "importePaga",
      headerName: "$ Paga.",
      width: 150,
      renderCell: (params) => {
        return formatMoney(params.value);
      },
    },
  ];
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        titulo={mod.label}
        subTitulo=" generales"
        icono="fas fa-funnel-dollar"
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={["fecha", "desc"]}
        columns={columns}
      />

      <ImpresionDialog
        titulo="PANEL COMPARTIR COBRO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COBRO "
        data={dataImpresion}
        plantilla={plantilla}
        emailDefault={dataImpresion?.socio?.email}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
    </>
  );
}
