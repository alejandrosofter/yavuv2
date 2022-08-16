import { QueryApi } from "@helpers/queryApi";
import { Icon, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 220,
    },
    {
      field: "label_plan",
      headerName: "Plan",
      width: 250,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 150,
    },
    {
      field: "razonSocial",
      headerName: "Razon Social",
      width: 220,
    },
    {
      field: "telefono",
      headerName: "Tel",
      width: 120,
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 90,
    },
  ];
  let fnAcciones = {
    updateMods: (data, id) => {
      setDataConsulta({ url: "/api/planes/updateMods", data });
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
