import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";

export default function Modulo({ mod }) {
  const order = "nombre";
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 350,
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 350,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo=""
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
