import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPredeudaSocios";
import MaterialReactTable from "material-react-table";
import { useEffect, useRef, useState } from "react";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { Button, Grid, MenuItem } from "@mui/material";
import Icon from "react-multi-date-picker/components/icon";
export default function Modulo({ mod }) {
  const [open, setOpen] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const [seleccion, setSeleccion] = useState([]);
  const tableInstanceRef = useRef();
  const order = ["fecha_timestamp", "desc"];
  const { data } = useCollection(`socios_predeudas`);

  const getDetalleArchivo = (row) => {
    return `${
      row?.archivo?.nombreUser ? row?.archivo?.nombreUser : "SIN ARCHIVO!"
    }`;
  };
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 90,
      Cell: ({ cell }) => getFechaString(cell.getValue()),
    },
    {
      accessorKey: "nroSocio",
      header: "Nro Socio",
      size: 110,
    },
    {
      accessorKey: "label_socio",
      header: "Obra Social",
      size: 320,
    },
    {
      accessorKey: "label_tipoPeriodo",
      header: "Periodo",
      size: 120,
    },
    {
      accessorKey: "label_tipoPeriodo",
      header: "Periodo",
      size: 120,
    },
    {
      accessorKey: "label_idProducto",
      header: "Producto/Servicio",
      size: 220,
    },

    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-refresh",
      label: "Baja de Mensualizacion",

      fn: (data) => {
        setDataConsulta({
          url: "/api/menusalizaciones/bajaMenusal",
          data,
        });
      },
    },
  ];
  const aceptarDeudas = () => {
    console.log(tableInstanceRef.current?.getSelectedRowModel().rows);
  };
  if (!data) return "Cargando...";
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button variant="contained" onClick={aceptarDeudas}>
          <Icon className="fas fa-tick" /> ACEPTAR Deudaa
        </Button>
      </Grid>
      <MaterialReactTable
        columns={columns}
        data={data}
        enablePagination={false} //disable a default feature
        enableRowActions={false}
        enableRowSelection
        enableColumnResizing
        // onRowSelectionChange={(row, index) => {
        //   setSeleccion(tableInstanceRef.current?.getSelectedRowModel().rows);
        // }}
        tableInstanceRef={tableInstanceRef}
        positionActionsColumn="last"
        // renderRowActionMenuItems={(row, index) => [
        //   <MenuItem onClick={() => console.info("Edit")}>Edit</MenuItem>,
        //   <MenuItem onClick={() => console.info("Delete")}>Delete</MenuItem>,
        // ]}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
