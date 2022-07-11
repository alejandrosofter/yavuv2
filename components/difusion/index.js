import { getFechaString } from "@helpers/dates";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import axios from "axios";
import { useState } from "react";
import { TestDifusion } from "./test";

export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const [open, setOpen] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "asunto",
      headerName: "Asunto",
      width: 400,
    },
    {
      field: "label_modulo",
      headerName: "Modulo",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
    {
      field: "label_condicion",
      headerName: "Condicion",
      width: 100,
      renderCell: (params) => `${params.value}`,
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
      axios
        .get("/api/difusion/aplicar", {
          params: { id: data.id },
        })
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    test: (data, id) => {
      setOpen(true);
      setDataSeleccion(data);
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        titulo={mod.label}
        subTitulo="de algo que tu quieras"
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
      <TestDifusion data={dataSeleccion} open={open} setOpen={setOpen} />
    </>
  );
}
