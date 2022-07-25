import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { getFechaString } from "../../helpers/dates";
import { formatMoney } from "../../helpers/numbers";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
import { useState } from "react";
import ImpresionDialog from "../forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
export default function Modulo({ mod }) {
  const order = ["nombreActividad", "asc"];

  let fnAcciones = {
    aplicar: (data) => {
      console.log(data);
    },
    imprimir: (data) => {
      setOpenImpresion(true);
      setDataImpresion(data);
    },
  };
  const columns = [
    {
      field: "label_idActividadPadre",
      headerName: "Grupo",
      width: 100,
    },
    {
      field: "nombreActividad",
      headerName: "Actividad",
      width: 150,
    },

    {
      field: "label_idProducto",
      headerName: "Servicio Asociado",
      width: 250,
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 400,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];

  return (
    <DataGridFirebase
      fnAcciones={fnAcciones}
      titulo={mod.label}
      subTitulo="al club"
      icono={mod.icono}
      limit={50}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
