import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import { getFechaString } from "@helpers/dates";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "label_obraSocial",
      headerName: "Obra Social",
      width: 320,
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo="generales"
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
