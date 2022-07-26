import moment from "moment";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { formatMoney } from "../../helpers/numbers";
import { getFechaString } from "@helpers/dates";
import { Tooltip, Typography } from "@mui/material";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
export default function Modulo({ mod }) {
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) =>
        params.value ? (
          <Tooltip title={`CON VTO el ${getFechaString(params.row.fechaVto)}`}>
            <Typography>{`${getFechaString(params.row.fecha)}`}</Typography>
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      field: "label_idSocio",
      headerName: "Socio",
      width: 230,
    },
    {
      field: "label_idProducto",
      headerName: "Servicio/Producto",
      width: 365,
      renderCell: (params) =>
        renderCellExpandData(
          params,
          (row) => `${row.label_idProducto} ${row.detalle ? row.detalle : ""}`
        ),
    },

    {
      field: "importe",
      headerName: "$ Importe",
      width: 90,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "importeBonificacion",
      headerName: "$ BONIF.",
      width: 90,
      renderCell: (params) => formatMoney(params.value ? params.value : 0),
    },
    {
      field: "total",
      headerName: "$ TOTAL",
      width: 90,
      renderCell: (params) => {
        const importe =
          (params.row.importe ? params.row.importe : 0) -
          (params.row.importeBonificacion ? params.row.importeBonificacion : 0);
        return formatMoney(importe);
      },
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
      // renderCell:(params) =>renderCellExpandData(params,fnRender)
    },
  ];
  return (
    <DataGridFirebase
      titulo={mod.label}
      subTitulo="al club"
      icono={mod.icono}
      limit={10}
      mod={mod}
      acciones={mod.acciones}
      orderBy={["fecha", "desc"]}
      columns={columns}
    />
  );
}
