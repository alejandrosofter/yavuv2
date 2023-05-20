import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";

export default function Modulo({ mod }) {
  const columns = [
    {
      field: "nombreTipoComprobante",
      headerName: "Nombre",
      width: 350,
    },
    {
      field: "esFacturaElectronica",
      headerName: "Es Electrónica",
      renderCell: (params) => (params.value ? "Si" : "No"),
      width: 150,
    },
    {
      field: "esNotaCredito",
      headerName: "Es Nota de Crédito",
      renderCell: (params) => (params.value ? "Si" : "No"),
      width: 150,
    },
    {
      field: "proximoNro",
      headerName: "Prox. Nro",
      width: 250,
    },
  ];
  return (
    <DataGridFirebase
      coleccion={mod.coleccion}
      titulo={mod.label}
      subTitulo=""
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy="nombreTipoComprobante"
      columns={columns}
    />
  );
}
