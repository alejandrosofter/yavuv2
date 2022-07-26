import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { formatMoney } from "../../helpers/numbers";
import moment from "moment";
import { getFechaString } from "../../helpers/dates";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const getImputaciones = (imputaciones) => {
    let salida = "";
    if (!imputaciones) return "Sin imputaciones, esperando rta del banco";
    imputaciones.forEach(
      (imputa) =>
        (salida += `${getFechaString(imputa.fecha)} => ${imputa.estado}`)
    );
    return salida;
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "imputaciones",
      headerName: "Imputaciones",
      width: 300,
      renderCell: (params) => getImputaciones(params.value),
    },

    {
      field: "importeTotal",
      headerName: "$ Total",
      width: 120,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "totalCobrado",
      headerName: "$ Cobrado",
      width: 120,
      renderCell: (params) => `${formatMoney(params.value ? params.value : 0)}`,
    },
    {
      field: "cantidadProcesada",
      headerName: "Procesados",
      width: 120,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
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
      orderBy={order}
      columns={columns}
    />
  );
}
