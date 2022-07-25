import { formatMoney } from "@helpers/numbers";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";

export default function Modulo({ mod }) {
  const order = "nombre";
  const columns = [
    {
      field: "cantidad",
      headerName: "Cant.",
      width: 60,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 250,
    },
    {
      field: "esServicio",
      headerName: "Es Servicio?",
      width: 120,
      renderCell: (params) => (params.value ? "Si" : "No"),
    },
    {
      field: "label_idCentroCosto",
      headerName: "CC",
      width: 150,
    },
    {
      field: "importe",
      headerName: "Importe",
      width: 150,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo=""
      icono={mod.icono}
      limit={50}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
