import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = "nombre";
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 190,
    },
    {
      field: "identificador",
      headerName: "ID",
      width: 120,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo="generales"
      icono={mod.icono}
      limit={50}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
