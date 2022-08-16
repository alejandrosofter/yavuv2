import { QueryApi } from "@helpers/queryApi";
import { Icon, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const columns = [
    {
      field: "icono",
      headerName: "Modulo",
      width: 450,
      renderCell: (params) => {
        return (
          <Stack spacing={1} direction="row">
            <Icon size="small" className={params.formattedValue} />
            <Typography variant="h5"> {`${params.row.nombre}`}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 320,
    },
  ];
  let fnAcciones = {
    updatePlans: (data, id) => {
      setDataConsulta({ url: "/api/planes/updatePlans", data });
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        allUsers={true}
        coleccion={mod.coleccion}
        titulo={mod.label}
        subTitulo="generales"
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy="nombre"
        columns={columns}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
