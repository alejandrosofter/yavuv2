import moment from "moment";
import { formatMoney } from "../../helpers/numbers";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
const renderConcepto = (row) => {
  let salida = "";
  if (row.items)
    row.items.map((item) => {
      salida += `${item.label_idProducto} ${
        item.importe > 0 ? formatMoney(item.importe) : ""
      } ${item.porcentaje > 0 ? item.porcentaje + " %" : ""}  | `;
    });
  return salida;
};
export default function Modulo({ modulo, mod, token }) {
  const url = "/api/promociones";
  const columns = [
    {
      field: "nombrePromocion",
      headerName: "Nombre",
      width: 180,
    },

    {
      field: "id",
      headerName: "Concepto",
      renderCell: (params) => renderCellExpandData(params, renderConcepto),
      width: 380,
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 90,
    },
  ];
  return (
    <DataGridFirebase
      coleccion={mod.coleccion}
      titulo={mod.label}
      subTitulo="generales"
      icono={mod.icono}
      parentData={true}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy="nombrePromocion"
      columns={columns}
    />
  );
}
