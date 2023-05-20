import moment from "moment";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import TitulosFormularios from "@components/forms/tituloFormularios";
import DataGridServer from "@components/forms/datagrid/dataGridServer";
import { formatMoney } from "../../helpers/numbers";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import ItemsGeneracionDeuda from "./items";
import { useState } from "react";
import { getFechaString } from "@helpers/dates";
export default function Modulo({ mod }) {
  const [openItems, setOpenItems] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "fechaVto",
      headerName: "Vto",
      width: 80,
      renderCell: (params) => {
        const d = new Date(params.value.seconds * 1000);

        return (
          //en params.row tengo los otros datos
          <i>{`${moment(d).format("DD/MM/YY")}`}</i>
        );
      },
    },
    {
      field: "totalDeudas",
      headerName: "Cant. deudas",
      width: 120,
      renderCell: (params) => params.value,
    },
    {
      field: "importeTotal",
      headerName: "$ Total",
      width: 120,
      renderCell: (params) => formatMoney(params.value ? params.value : 0),
    },
    {
      field: "importeTotalBonificaciones",
      headerName: "$ Bonificado",
      width: 120,
      renderCell: (params) => formatMoney(params.value ? params.value : 0),
    },
    {
      field: "cantidadProcesada",
      headerName: "Procesados ",
      width: 140,
      renderCell: (params) => `${params.value ? params.value : 0}`,
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 120,
    },
  ];
  let fnAcciones = {
    deudas: (data, id) => {
      setSeleccion(data);
      setOpenItems(true);
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        coleccion={mod.coleccion}
        titulo={mod.label}
        subTitulo="del club"
        icono="fas fa-funnel-dollar"
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy="fecha"
        columns={columns}
      />
      <ItemsGeneracionDeuda
        open={openItems}
        setOpen={setOpenItems}
        generacion={seleccion}
      />
    </>
  );
}
