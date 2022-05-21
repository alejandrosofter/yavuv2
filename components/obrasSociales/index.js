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
      field: "usuarioWeb",
      headerName: "Usuario Web",
      width: 160,
    },
    {
      field: "estado",
      headerName: "Estado",
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
