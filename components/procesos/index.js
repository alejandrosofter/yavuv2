import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const [dataConsulta, setDataConsulta] = useState();
  let fnAcciones = {
    iniciar: (data, id) => {
      setDataConsulta({ url: "/api/procesos/iniciar", data });
    },
    stop: (data, id) => {
      setDataConsulta({ url: "/api/procesos/stop", data });
    },
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "coleccion",
      headerName: "Coleccion",
      width: 120,
    },
    {
      field: "cantidadLote",
      headerName: "Cant Lote",
      width: 100,
    },
    {
      field: "topicName",
      headerName: "Topic",
      width: 180,
    },

    {
      field: "cantidadProcesada",
      headerName: "Procesados",
      width: 100,
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 150,
    },
  ];
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        titulo={mod.label}
        subTitulo="generales"
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
