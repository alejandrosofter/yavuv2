import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";

export default function Modulo({ mod }) {
  const columns = [
    {
      field: "nombreCentroCosto",
      headerName: "Nombre CC",
      width: 350,
    },
  ];
  return (
    <DataGridFirebase
      parentData={true}
      coleccion={mod.coleccion}
      titulo={mod.label}
      subTitulo=""
      icono={mod.icono}
      limit={20}
      mod={mod}
      acciones={mod.acciones}
      orderBy="nombreCentroCosto"
      columns={columns}
    />
  );
}
