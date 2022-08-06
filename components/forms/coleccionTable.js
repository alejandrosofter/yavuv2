import { getLinkUrl } from "@helpers/Strings";
import { Divider, Grid, Icon, Typography } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useCollection } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";

export default function ColeccionTable({
  coleccion,
  where,
  columns,
  orderBy,
  limit,
  acciones,
  getRowClassName,
  onSelectionModelChange,
  callbackclick,
  checkboxSelection,
  initialValuesChecks,
}) {
  const { data, error, update } = useCollection(coleccion, {
    where,
    limit,
    parseDates: ["fecha"],
    orderBy,
    listen: true,
  });
  console.log(data);
  const [accionSeleccion, setAcccionSeleccion] = useState(null);
  const [rowSeleccion, setRowSeleccion] = useState(null);
  const [selectionModel, setSelectionModel] = useState(
    initialValuesChecks ? initialValuesChecks : []
  );
  const [columnas, setColumnas] = useState([]);
  const clickMenu = ({ accion, params }) => {
    setRowSeleccion(params.row);
    setAcccionSeleccion(accion);
    if (accion.esFuncion) {
      accion.fn(params.row);
    } else
      router.push(accion.url, {
        shallow: true,
      });
  };
  useEffect(() => {
    const aux = columns;
    const actions = (params) => {
      let arr = [];
      if (acciones)
        acciones.map((accion) => {
          arr.push(
            accion.label === "" ? (
              <Divider />
            ) : (
              <GridActionsCellItem
                icon={
                  <Icon
                    sx={{ color: accion.color }}
                    fontSize="10"
                    className={accion.icono}
                  />
                }
                label={
                  <Typography color={accion.color}>{accion.label}</Typography>
                }
                onClick={clickMenu.bind(this, { accion, params })}
                showInMenu
              />
            )
          );
        });

      return arr;
    };
    aux.push({
      field: "actions",
      type: "actions",
      width: 70,
      getActions: actions,
    });
    setColumnas(aux);
  }, [acciones, columns]);
  const cambiaSelectCheck = (ids) => {
    const selectedIDs = new Set(ids);
    const selectedRowData = data.filter((row) =>
      selectedIDs.has(row.id.toString())
    );
    if (onSelectionModelChange) onSelectionModelChange(selectedRowData, ids);
    setSelectionModel(ids);
  };
  if (!data) return "Cargando...";
  return (
    <Grid
      coleccion
      height="60vh"
      sx={{
        "& .disabled": {
          bgcolor: (theme) => "text.disabled",
          "& .warning": {
            bgcolor: (theme) => "text.secondary",
          },
        },
      }}
    >
      <DataGrid
        hideFooterPagination={true}
        columns={columnas}
        rows={data ? data : []}
        disableSelectionOnClick
        getRowClassName={getRowClassName}
        onSelectionModelChange={cambiaSelectCheck}
        checkboxSelection={checkboxSelection}
        selectionModel={selectionModel}
        onRowClick={(params) => {
          if (callbackclick) callbackclick(params);
        }}
      />
    </Grid>
  );
}
