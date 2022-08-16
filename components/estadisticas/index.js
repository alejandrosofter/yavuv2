import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { useState } from "react";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();

  const [openEnviar, setOpenEnviar] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [openDeudas, setOpenDeudas] = useState();
  const order = ["updated", "desc"];

  const columns = [
    {
      field: "updated",
      headerName: "Ultima Actualizacion",
      width: 150,
      renderCell: (params) => getFechaString(params.value, "DD/MM/YYYY HH:mm"),
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 120,
    },
    {
      field: "periodicidad",
      headerName: "Periodo",
      width: 120,
    },
    {
      field: "campos",
      headerName: "Campos",
      width: 420,
      renderCell: (params) =>
        //return comma separated list of campos
        params.value
          ? params.value
              .map((campo) => `${campo.nombre} (${campo.asignacion})`)
              .join(", ")
          : "sin campos",
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 80,
    },
  ];

  let fnAcciones = {
    aplicar: (data) => {
      setDataConsulta({ url: "/api/estadisticas/aplicar", data });
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        coleccion={mod.coleccion}
        titulo={mod.label}
        subTitulo=""
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
