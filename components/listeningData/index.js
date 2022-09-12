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
      width: 180,
      renderCell: (params) => `${params.value}`,
    },

    {
      field: "campoOrder",
      headerName: "Campo Order",
      width: 120,
    },
    {
      field: "campoValue",
      headerName: "Campo Valor",
      width: 120,
    },
    {
      field: "campoLabel",
      headerName: "Campo Label",
      width: 120,
    },
    {
      field: "cantidadProcesada",
      headerName: "Procesados",
      width: 100,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
  ];
  let fnAcciones = {
    checkTodos: (data) => {
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
        parentData={true}
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
