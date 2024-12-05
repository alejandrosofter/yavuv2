import { groupBy } from "@helpers/arrays";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { Grid, Tooltip } from "@mui/material";
import { useDocument } from "@nandorojo/swr-firestore";
import MaterialReactTable from "material-react-table";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
export default function Page(params) {
  const router = useRouter();
  const [dataGroup, setDataGroup] = useState([]);
  const { data } = useDocument(`recetasLiquidaciones/${router.query.id}`);
  //   console.log(data);
  //   useEffect(() => {
  //     if (!data || !data.items) {
  //       setDataGroup([]);
  //     }
  //     const groupData = groupBy(data.items, (item) => item.obraSocial, true);
  //     const arrData = [];
  //     for (let key in groupData) {
  //       arrData.push({
  //         obraSocial: key,
  //         items: groupData[key],
  //         importe: groupData[key].reduce((a, b) => a + Number(b.importe), 0),
  //         cantidad: groupData[key].reduce((a, b) => a + Number(b.cantidad), 0),
  //       });
  //     }
  //     setDataGroup(arrData);
  //   }, [data]);
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
    <Grid container>
      <Grid item md={12}>
        <h1>DETALLE DE LIQUIDACION</h1>
        <MaterialReactTable
          //   enableRowActions
          //   // enableRowSelection
          //   positionActionsColumn="last"
          //   renderRowActionMenuItems={({ closeMenu, row }) => [
          //     <MenuItem
          //       key={0}
          //       onClick={() => {
          //         setSelect(row.original);
          //         closeMenu();
          //         setOpenEdit(true);
          //       }}
          //       sx={{ m: 0 }}
          //     >
          //       <ListItemIcon>
          //         <Edit />
          //       </ListItemIcon>
          //       Editar
          //     </MenuItem>,
          //     <MenuItem
          //       key={1}
          //       onClick={() => {
          //         setOpenConfirm(true);
          //         setSelect(row.original);
          //         closeMenu();
          //       }}
          //       sx={{ m: 0 }}
          //     >
          //       <ListItemIcon>
          //         <Delete />
          //       </ListItemIcon>
          //       Quitar
          //     </MenuItem>,
          //   ]}
          columns={columns}
          data={data.items}
        />
      </Grid>
    </Grid>
  );
}
