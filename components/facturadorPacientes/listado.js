import MaterialReactTable from "material-react-table";
import { getFechaString } from "@helpers/dates";
import {
  BiotechRounded,
  Check,
  Close,
  Delete,
  Edit,
  Print,
} from "@mui/icons-material";
import { useEffect, useMemo, useState, useRef } from "react";

import {
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatMoney } from "@helpers/numbers";
import ConfirmDialog from "@components/forms/confirmDialog";
import { deleteDocument, set } from "@nandorojo/swr-firestore";
import EditFacturacionItem from "./edit";
export default function ListadoFacturacionOs({
  dataSelect,
  osSelect,
  clickCheck,
  hideCheck,
  subTitle,
}) {
  const tableRef = useRef();
  const [pagination, setPagination] = useState(true);

  const [openConfirm, setOpenConfirm] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [select, setSelect] = useState({});
  const [data, setData] = useState(dataSelect);

  const handlePrint = () => {
    setPagination(false); // Desactiva paginación antes de imprimir

    setTimeout(() => {
      window.print();

      setPagination(true); // Reactiva paginación después de imprimir
    }, 500);
  };
  const callbackAcepta = () => {
    deleteDocument(`/recetasFacturacion/${select.id}`).then(() => {
      setOpenConfirm(false);
    });
  };
  const onClickCheck = (itemCheck, checked) => {
    delete itemCheck.__snapshot;
    const newData = { ...itemCheck, checked };

    set(`/recetasFacturacion/${itemCheck.id}`, newData);
    if (clickCheck) clickCheck(osSelect);
  };
  const onEdit = (itemData) => {
    console.log(`EDITOOO`);
    return;
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
        id: "checked",
        enableHiding: true, // disable hiding for this column
        columnVisibility: false,
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
      <Button onClick={handlePrint} className="mb-4">
        <Print /> imprimir
      </Button>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
      
            position: absolute;
            left: 5px;
            top: 5px;
            width: 100%;
          }
        }
      `}</style>
      <Grid item md={12}>
        <div ref={tableRef} className="print-area">
          {osSelect && (
            <Stack>
              <Stack direction="row" spacing={3}>
                <Typography variant="h4">PRACTICAS</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {`${osSelect.nombre}`}
                </Typography>
              </Stack>
              {subTitle && (
                <Typography variant="body1">{`${subTitle}`}</Typography>
              )}
            </Stack>
          )}

          <MaterialReactTable
            enableRowActions={true}
            enablePagination={pagination}
            // enableRowSelection
            enableHiding={true}
            initialState={{
              columnVisibility: {
                checked: !hideCheck,
              },
            }}
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
          {osSelect && (
            <Stack direction="row" sx={{ p: 2 }} justifyContent="space-between">
              <Typography variant="h6" className="mb-4"></Typography>
              <Typography variant="h6" className="mb-4">
                TOTAL {`${formatMoney(osSelect.importe)}`}
              </Typography>
            </Stack>
          )}
        </div>
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
