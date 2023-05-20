import { QueryApi } from "@helpers/queryApi";
import { Icon, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "@components/planes/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPlanes";
export default function Modulo({}) {
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
      <ABMColeccion
        fnAcciones={fnAcciones}
        coleccion={"planes"}
        titulo={`Planes`}
        Modelo={Modelo}
        Form={Form}
        valoresIniciales={valoresIniciales}
        label={"Planes"}
        icono="fas fa-user"
        maxWidth={`lg`}
        allUsers={true}
        parentData={true}
        subTitulo="generales"
        limit={10}
        acciones={[]}
        orderBy="nombre"
        columns={columns}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
