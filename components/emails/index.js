import { getFechaString } from "@helpers/dates";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => `${getFechaString(params.value)}`,
    },
    {
      field: "asunto",
      headerName: "Asunto",
      width: 220,
    },
    {
      field: "destinatario",
      headerName: "Destinatario",
      width: 300,
      renderCell: (params) => `${params.value}`,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo="para enviar"
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
