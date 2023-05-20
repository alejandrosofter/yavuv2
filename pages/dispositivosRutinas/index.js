import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = "nombre";
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 190,
    },
    {
      field: "condiciones",
      headerName: "Condiciones",
      width: 160,
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
