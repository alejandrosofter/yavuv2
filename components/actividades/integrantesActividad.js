import DataGrid2 from "@components/forms/datagrid/dataGrid2";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import { getFechaString } from "@helpers/dates";
const columns = [
  {
    field: "fechaInicio",
    headerName: "Inicio",
    renderCell: (params) => getFechaString(params.value),
    width: 100,
  },
  {
    field: "label_socio",
    headerName: "Socio",
    width: 250,
  },
  {
    field: "esPorDebitoAutomatico",
    headerName: "Debito Aut.",
    renderCell: (params) => `${params.value ? "Si" : "No"}`,
    width: 90,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 90,
  },
];
export function IntegrantesActividad({ item }) {
  if (!item) return "Cargando...";
  return (
    <DataGrid2
      titulo="INTEGRANTES"
      subTitulo="de la actividad"
      icono="fas fa-users"
      limit={100}
      coleccion="actividades_integrantes"
      acciones={[
        {
          label: "Editar",
          icono: "fas fa-pencil",
          esFuncion: true,
          esRegistro: true,
          method: "open(@components/socios/actividades/_formActividades)",
        },
      ]}
      listen={true}
      where={["idSubActividad", "==", item.id]}
      orderBy={`label_socio`}
      columns={columns}
    />
  );
}
