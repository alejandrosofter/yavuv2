import { formatMoney } from "../../helpers/numbers";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { getFechaString } from "../../helpers/dates";

export default function Modulo({ mod }) {
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "label_idCentroCosto",
      headerName: "CC",
      width: 200,
    },
    {
      field: "label_idEntidad",
      headerName: "Proveedor",
      width: 200,
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 250,
    },
    {
      field: "importeTotal",
      headerName: "$ Importe",
      width: 100,
      renderCell: (params) => formatMoney(params.value ? params.value : 0),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  const order = ["fecha", "desc"];
  return (
    <DataGridFirebase
      // fnAcciones={fnAcciones}
      titulo={mod.label}
      subTitulo="generales"
      parentData={true}
      icono={mod.icono}
      limit={100}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
