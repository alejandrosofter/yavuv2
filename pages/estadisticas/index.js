import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = ["nombre", "desc"];
  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "formatoValorContable",
      headerName: "Valor Contable",
      width: 200,
      renderCell: (params) => (params.value ? "SI" : "NO"),
    },
    {
      field: "datos",
      headerName: "DATA BUSCAR",
      width: 200,
    },
    {
      field: "estado",
      headerName: "ESTADO",
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
