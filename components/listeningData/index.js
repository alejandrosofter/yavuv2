import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const order = ["nombre", "desc"];
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 220,
    },
    {
      field: "coleccion",
      headerName: "Coleccion",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
    {
      field: "cantidadProcesada",
      headerName: "Procesados",
      width: 200,
      renderCell: (params) => `${params.value} - ultimo ${params.row.last}`,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
  ];
  let fnAcciones = {
    chequear: (data) => {
      console.log(data);
      setDataConsulta({ url: "/api/listeningData/chequear", data });
    },
    stopProceso: (data) => {
      setDataConsulta({ url: "/api/listeningData/stopProceso", data });
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        titulo={mod.label}
        subTitulo="para recoleccion de data"
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
