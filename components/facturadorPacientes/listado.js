import MaterialReactTable from "material-react-table";
import { getFechaString } from "@helpers/dates";
import {
  BiotechRounded,
  Check,
  Close,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";

import {
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatMoney } from "@helpers/numbers";
import ConfirmDialog from "@components/forms/confirmDialog";
import { deleteDocument, set } from "@nandorojo/swr-firestore";
import EditFacturacionItem from "./edit";
export default function ListadoFacturacionOs({
  dataSelect,
  changeData,
  osSelect,
  refresh,
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
  const onClickCheck = (itemCheck, checked) => {
    delete itemCheck.__snapshot;
    const newData = { ...itemCheck, checked };

    set(`/recetasFacturacion/${itemCheck.id}`, newData);
    // .then(() => {
    //   console.log(`finish update`);
    //   if (refresh) refresh();
    // });
  };
  const onEdit = (itemData) => {
    // const newData = dataSelect.map((item) => {
    //   if (item.id === itemData.id) {
    //     item = itemData;
    //   }
    //   return item;
    // });
    delete itemData.__snapshot;
    set(`/recetasFacturacion/${itemData.id}`, newData).then(() => {
      if (refresh) refresh();
    });
    // setData(newData);
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
        accessorKey: "checked",
        header: "Check",
        size: 60,
        Cell: ({ cell }) => (
          <IconButton
            onClick={onClickCheck.bind(
              this,
              cell.row.original,
              !cell.row.original.checked
            )}
            title={`Chequeado`}
          >
            {cell.row.original.checked ? <Check /> : <Close />}
          </IconButton>
        ),
        // accessorFn: (row) => `${formatMoney(row.importe)}`,
      },
      // {
      //   accessorKey: "estado",
      //   header: "Estado",
      //   size: 80,
      //   accessorFn: (row) => `${row.estado}`,
      // },
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
