import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = "titular";
  const columns = [
    {
      field: "titular",
      headerName: "Titular",
      width: 190,
    },
    {
      field: "cbu",
      headerName: "CBU",
      width: 190,
    },
    {
      field: "label_tipoCuenta",
      headerName: "Origen",
      width: 190,
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
