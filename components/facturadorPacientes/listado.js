import MaterialReactTable from "material-react-table";
import { getFechaString } from "@helpers/dates";
import { Delete, Edit } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Grid,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatMoney } from "@helpers/numbers";
import ConfirmDialog from "@components/forms/confirmDialog";
import { deleteDocument } from "@nandorojo/swr-firestore";
import EditFacturacionItem from "./edit";
export default function ListadoFacturacionOs({
  dataSelect,
  changeData,
  osSelect,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [select, setSelect] = useState({});
  const [data, setData] = useState(dataSelect);
  const callbackAcepta = () => {
    deleteDocument(`/recetasFacturacion/${select.id}`).then(() => {
      setOpenConfirm(false);
      const newData = data.filter((item) => item.id !== select.id);
      setData(newData);
      if (changeData) changeData(select, osSelect);
    });
  };
  const onEdit = (data) => {
    const newData = dataSelect.map((item) => {
      if (item.id === data.id) {
        item = data;
      }
      return item;
    });
    setData(newData);
  };
  useEffect(() => {
    setData(dataSelect);
  }, [dataSelect]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "fecha_timestamp",
        header: "Fecha",
        size: 80,
        accessorFn: (row) => {
          const fecha = new Date(row.fecha_timestamp);
          return getFechaString(fecha, "DD/MM | HH:mm");
        },
      },
      {
        accessorKey: "paciente",
        header: "Paciente",
        size: 135,
        accessorFn: (row) =>
          `${row.paciente?.apellido}, ${row.paciente?.nombre}`,
        Cell: ({ cell }) => (
          <Tooltip title={cell.row.original.nroAfiliado}>
            <span>{`${cell.row.original.paciente?.apellido}, ${cell.row.original.paciente?.nombre}`}</span>
          </Tooltip>
        ),
      },

      {
        accessorKey: "codigo",
        header: "Codigo",
        size: 60,
        accessorFn: (row) => `${row.codigo}`,
        Cell: ({ cell }) => (
          <Tooltip title={cell.row.original.label_idPrestacion}>
            <span>{cell.row.original.codigo}</span>
          </Tooltip>
        ),
      },
      {
        accessorKey: "cantidad",
        header: "Cant.",
        size: 60,
        // accessorFn: (row) => `${formatMoney(row.importe)}`,
      },
      {
        accessorKey: "importe",
        header: "Importe",
        size: 60,
        accessorFn: (row) => `${formatMoney(row.importe)}`,
      },
      {
        accessorKey: "estado",
        header: "Estado",
        size: 80,
        accessorFn: (row) => `${row.estado}`,
      },
    ],
    []
  );

  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <MaterialReactTable
          enableRowActions
          // enableRowSelection
          positionActionsColumn="last"
          renderRowActionMenuItems={({ closeMenu, row }) => [
            <MenuItem
              key={0}
              onClick={() => {
                setSelect(row.original);
                closeMenu();
                setOpenEdit(true);
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              Editar
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => {
                setOpenConfirm(true);
                setSelect(row.original);
                closeMenu();
              }}
              sx={{ m: 0 }}
            >
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
              Quitar
            </MenuItem>,
          ]}
          columns={columns}
          data={data}
        />
        <EditFacturacionItem
          open={openEdit}
          setOpen={setOpenEdit}
          data={select}
          onEdit={onEdit}
        />
        <ConfirmDialog
          mensaje={"Estas seguro/a de quitar este item de factura?"}
          open={openConfirm}
          setOpen={setOpenConfirm}
          callbacksuccess={callbackAcepta}
        />
      </Grid>
    </Grid>
  );
}
