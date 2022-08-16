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
      field: "comienzaAcumulado",
      headerName: "Comienza Acumulado",
      width: 150,
      renderCell: (params) => (params.value ? "Si" : "No"),
    },
    {
      field: "guardaRegistros",
      headerName: "Guarda Registros?",
      width: 150,
      renderCell: (params) => (params.value ? "Si" : "No"),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
  ];
  let fnAcciones = {
    aplicar: (data) => {
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
