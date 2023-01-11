import { Backdrop, Divider, Grid, Icon } from "@mui/material";
import { MenuItem } from "@mui/material";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { useEffect, useMemo, useRef, useState } from "react";
import MaterialReactTable from "material-react-table";

export function ColeccionTable({
  coleccion,
  where,
  columns,
  dataExternal,
  orderBy,
  gridOptions,
  limit,
  acciones,
  callbackchangedata,
}) {
  const { data, isError, isFetching, isLoading, error, refetch } = dataExternal
    ? dataExternal
    : useCollection(coleccion, {
        where,
        orderBy,
        limit,
        listen: true,
      });
  const [loading, setLoading] = useState(false);
  const [accionesTabla, setAccionesTabla] = useState([]);
  const [rowSeleccion, setRowSeleccion] = useState(null);
  const [acccionSeleccion, setAcccionSeleccion] = useState(null);

  const [columnas, setColumnas] = useState([]);
  const clickMenu = (data, accion) => {
    const { closeMenu, row, table } = data.closeMenu; //---> no se por que, es un hdp

    if (closeMenu) closeMenu();
    setRowSeleccion(row.original);
    setAcccionSeleccion(accion);
    if (accion.esFuncion) {
      accion.fn(row.original);
    } else
      router.push(accion.url, {
        shallow: true,
      });
  };
  useEffect(() => {
    if (callbackchangedata) callbackchangedata(data);
  }, [data]);
  useEffect(() => {
    const aux = columns.map((column) => {
      return {
        ...column,
        accessorKey: column.field ? column.field : column.accessorKey,
        header: column.headerName ? column.headerName : column.header,
        size: column.width ? column.width : column.size,
        Cell: column.renderCell
          ? ({ cell }) => {
              return column.renderCell({
                value: cell.getValue(),
                row: cell.row.original,
              });
            }
          : column.Cell,
      };
    });

    setColumnas(aux);
  }, [acciones, columns]);

  const addsWheres = (ref, where) => {
    if (!ref) return ref;
    if (where) {
      if (Array.isArray(where)) {
        where.map((w) => {
          ref = ref.where(w.id, ">=", w.value);
          ref = ref.where(w.id, "<=", `\uf8ff${w.value}\uf8ff`);
          ref = ref.orderBy(w.id);
        });
      } else {
        ref = ref.where(where.id, ">=", where.value);
      }
    }
    return ref;
  };
  console.log(data);
  if (!data) return "Cargando...";
  //set container drawer mui
  return (
    <Grid sx={{ mb: 10 }} item xs={12}>
      <MaterialReactTable
        {...gridOptions}
        columns={columns}
        data={data ? data : []}
        enablePagination={true} //disable a default feature
        enableRowActions
        enableStickyHeader
        // globalFilterFn="contains"
        // initialState={{ showGlobalFilter: false, showColumnFilters: true }}
        positionGlobalFilter="left"
        enableGlobalFilter={false}
        enableColumnResizing
        localization={{
          actions: "Acciones",
          cancel: "Cancelar",
          clearFilter: "Filtro claro",
          clearSearch: "Borrar búsqueda",
          clearSort: "Ordenar claro",
          columnActions: "Acciones de columna",
          edit: "Editar",
          expand: "Expandir",
          expandAll: "Expandir todo",
          filterByColumn: "Filtrar por {column}",
          groupByColumn: "Agrupar por {column}",
          groupedBy: "Agrupados por ",
          hideAll: "Ocultar todo",
          hideColumn: "Ocultar columna de {column}",
          rowActions: "Acciones de fila",
          save: "Salvar",
          search: "Búsqueda",
          selectedCountOfRowCountRowsSelected:
            "{selectedCount} de {rowCount} fila(s) seleccionadas",
          showAll: "Mostrar todo",
          showHideColumns: "Mostrar/Ocultar columnas",
          showHideFilters: "Alternar filtros",
          showHideSearch: "Alternar búsqueda",
          sortByColumnAsc: "Ordenar por {column} ascendente",
          sortByColumnDesc: "Ordenar por {column} descendiendo",
          thenBy: ", entonces por ",
          toggleDensity: "Alternar relleno denso",
          toggleFullScreen: "Alternar pantalla completa",
          toggleSelectAll: "Seleccionar todo",
          rowsPerPage: "Filas por pág.",
          of: "de",
          toggleSelectRow: "Seleccionar fila",
          ungroupByColumn: "Desagrupar por {column}",
        }}
        // memoMode="rows"
        muiSearchTextFieldProps={{
          variant: "outlined",
          placeholder: "busca...",
          label: "Buscador",
          InputLabelProps: { shrink: true },
        }}
        displayColumnDefOptions={{
          "mrt-row-actions": {
            header: "Acciones", //change header text
            size: 80, //make actions column wider
          },
        }}
        positionActionsColumn="last"
        renderRowActionMenuItems={(closeMenu, row, table) =>
          acciones.map((accion) =>
            accion.label === "" ? (
              <Divider />
            ) : (
              <MenuItem
                onClick={clickMenu.bind(
                  this,
                  {
                    closeMenu,
                    row,
                    table,
                  },
                  accion
                )}
                showInMenu
              >
                <Icon
                  sx={{ color: accion.color, mr: 1 }}
                  fontSize="10"
                  className={accion.icono}
                />
                {"  "}
                {accion.label}
              </MenuItem>
            )
          )
        }
      />
      {/* <MaterialReactTable
        {...gridOptions}
        columns={columns}
        data={data ? data : []}
        enablePagination={false} //disable a default feature
        enableRowActions={false}
        enableColumnResizing
        // onRowSelectionChange={(row, index) => {
        //   setSeleccion(tableInstanceRef.current?.getSelectedRowModel().rows);
        // }}
        // tableInstanceRef={tableInstanceRef}
        positionActionsColumn="last"
        // renderRowActionMenuItems={(row, index) => [
        //   <MenuItem onClick={() => console.info("Edit")}>Edit</MenuItem>,
        //   <MenuItem onClick={() => console.info("Delete")}>Delete</MenuItem>,
        // ]}
      />
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      /> */}
    </Grid>
  );
}
export default function ColeccionTable2({
  coleccion,
  where,
  columns,
  orderBy,
  limit,
  dataExternal,
  gridOptions,
  acciones,
  callbackchangedata,
  enableRowSelection,
  filterFns,
  initialState,
}) {
  return (
    <ColeccionTable
      coleccion={coleccion}
      where={where}
      gridOptions={gridOptions}
      columns={columns}
      dataExternal={dataExternal}
      orderBy={orderBy}
      enableRowSelection
      filterFns
      initialState
      // limit={10}
      acciones={acciones}
      callbackchangedata={callbackchangedata}
    />
  );
}
