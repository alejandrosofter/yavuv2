import { getModUsuario } from "@helpers/db";
import UseMod from "@hooks/useModulo";
import moment from "moment";
import { formatMoney } from "../../helpers/numbers";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({}) {
  const coleccion = "socios_deudas";
  const mod = getModUsuario(coleccion);
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) => {
        const d = new Date(params.value.seconds * 1000);

        return (
          //en params.row tengo los otros datos
          <i>{`${moment(d).format("DD/MM/YY")}`}</i>
        );
      },
    },
    {
      field: "fechaVto",
      headerName: "Vto",
      width: 80,
      renderCell: (params) => {
        const d = new Date(params.value.seconds * 1000);

        return (
          //en params.row tengo los otros datos
          <i>{`${moment(d).format("DD/MM/YY")}`}</i>
        );
      },
    },

    {
      field: "detalleExtra",
      headerName: "Detalle...",
      width: 320,
    },
    {
      field: "importe",
      headerName: "$ Importe",
      width: 120,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "importeBonificado",
      headerName: "$ Bonificado",
      width: 120,
      renderCell: (params) => formatMoney(params.value ? params.value : 0),
    },
    {
      field: "detalleBonificado",
      headerName: "Det. Bonificado",
      width: 220,
    },
  ];
  if (!mod) return "";
  return (
    <DataGridFirebase
      // fnAcciones={fnAcciones}
      allUsers={true}
      titulo={mod.label}
      subTitulo="al club"
      icono={mod.icono}
      limit={10}
      mod={{ coleccion }}
      acciones={mod.acciones}
      orderBy={["fecha", "desc"]}
      columns={columns}
    />
  );
}
