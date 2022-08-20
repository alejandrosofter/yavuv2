import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = "apellido";
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 190,
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 190,
    },
    {
      field: "dni",
      headerName: "DNI",
      width: 190,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo="del club"
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
