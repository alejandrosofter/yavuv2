import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const order = "email";
  const fnLabelMods = (items) => items.map((item) => item.label_idMod).join();
  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "mods",
      headerName: "Mods",
      renderCell: (params) => {
        return fnLabelMods(params.value);
      },
      width: 400,
    },
    {
      field: "recursos",
      headerName: "Recursos",
      renderCell: (params) =>
        params.row.mods.map((item) => item.label_recursos).join(),
      width: 200,
    },
    {
      field: "activo",
      headerName: "Estado",
      renderCell: (params) => (params.value ? "ACTIVO" : "INACTIVO"),
      width: 100,
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo="generales"
      parentData={true}
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy={order}
      columns={columns}
    />
  );
}
