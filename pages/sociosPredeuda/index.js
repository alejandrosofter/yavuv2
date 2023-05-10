import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPredeudaSocios";

import { useEffect, useRef, useState } from "react";
import { QueryApi } from "@helpers/queryApi";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { Button, Grid, Icon } from "@mui/material";

import ABMColeccion2 from "@components/forms/ABMcollection2";
import NuevoMovimiento from "./nuevoMovimiento";
import Drawer from "@components/forms/drawerPerosnalizado";
import DrawerPersonalizado from "@components/forms/drawerPerosnalizado";
import MovimientosPredeuda from "./movimientos";

export default function Modulo({ parentData }) {
  const tipoOperacion = "actividades";
  const [openNuevoMovimiento, setOpenNuevoMovimiento] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const [dataConsulta, setDataConsulta] = useState();

  const tableInstanceRef = useRef();
  const order = ["fecha_timestamp", "desc"];
  const [filtroActividadSeleccion, setFiltroActividadSeleccion] = useState();

  const { data: productos } = useCollection(`productos`, {
    where: parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid],
  });
  const { data: actividades } = useCollection(`actividades`, {
    where: parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid],
  });
  const { data: grupos } = useCollection(
    `actividades/${filtroActividadSeleccion}/grupos`,
    {
      listen: true,
    }
  );
  const getDetalleArchivo = (row) => {
    return `${
      row?.archivo?.nombreUser ? row?.archivo?.nombreUser : "SIN ARCHIVO!"
    }`;
  };
  const columns = [
    {
      accessorKey: "idActividad",
      header: "Actividad",
      size: 150,
      filterFn: (row, _columnIds, filterValue) => {
        setFiltroActividadSeleccion(filterValue);
        return row.getValue(_columnIds) === filterValue;
      },
      Cell: ({ cell }) => cell.row.original?.label_idActividad,
      filterVariant: "select",
      filterSelectOptions: actividades?.map((p) => ({
        text: p.nombreActividad,
        value: p.id,
      })),
    },
    {
      accessorKey: "idGrupoActividad",
      header: "Grupo",
      filterVariant: "select",
      filterSelectOptions: grupos?.map((p) => ({
        text: p.nombreGrupo,
        value: p.id,
      })),
      size: 180,
      Cell: ({ cell }) => cell.row.original?.label_idGrupoActividad,
    },
    {
      accessorKey: "label_socio",
      header: "Socio",
      filterFn: "includesString",
      size: 250,
    },

    {
      accessorKey: "idProducto",
      header: "Producto/Servicio",
      filterVariant: "select",
      Cell: ({ cell }) => cell.row.original?.label_idProducto,
      filterSelectOptions: productos?.map((p) => ({
        text: p.nombre,
        value: p.id,
      })),
      size: 220,
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
    setSeleccion(tableInstanceRef.current?.getSelectedRowModel().rows);
    setOpenNuevoMovimiento(true);
  };
  const cargoMovimiento = () => {
    setOpenDrawer(true);
    setOpenNuevoMovimiento(false);
  };

  return (
    <Grid container>
      <ABMColeccion2
        coleccion={`socios_predeudas`}
        columns={columns}
        acciones={acciones}
        maxWidth={"md"}
        where={[
          parentData
            ? ["idUsuario", "==", localStorage.getItem("usermod")]
            : ["usermod", "==", fuego.auth().currentUser?.uid],
          ["esActividad", "==", true],
          ["estado", "==", "PENDIENTE"],
        ]}
        gridOptions={{
          renderTopToolbarCustomActions: () => (
            <Grid container>
              <Grid item xs={12} md={4}>
                <Button onClick={aceptarDeudas}>
                  <Icon sx={{ mr: 1 }} className="fas fa-check-circle" />{" "}
                  aceptar seleccion
                </Button>
                <Button
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                >
                  <Icon sx={{ mr: 1 }} className="fas fa-book" />
                  operaciones
                </Button>
              </Grid>
            </Grid>
          ),
          tableInstanceRef,
          initialState: { showColumnFilters: true },
          enableRowSelection: true,
          filterFns: {
            filtroFecha: (row, id, filterValue) => {
              const date = new Date(row.original[id].seconds * 1000);
              const dateFiltro = new Date(filterValue);

              //si es fecha invalida
              if (isNaN(dateFiltro.getTime())) return true;
              //comparo fechas
              return (
                date.getDate() === dateFiltro.getDate() &&
                date.getMonth() === dateFiltro.getMonth() &&
                date.getFullYear() === dateFiltro.getFullYear()
              );
            },
          },
          // getRowId: (row) => row.id,
        }}
        order={order}
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        // dataForm={{ grupo: seleccion }}
        titulo={`PREDEUDA`}
        Form={Form}
      />
      <NuevoMovimiento
        open={openNuevoMovimiento}
        callbackSuccess={cargoMovimiento}
        tipoOperacion={tipoOperacion}
        setOpen={setOpenNuevoMovimiento}
        seleccion={seleccion?.map((item) => item.original)}
      />
      <DrawerPersonalizado
        anchor={"right"}
        open={openDrawer}
        width={450}
        setOpen={setOpenDrawer}
      >
        <MovimientosPredeuda tipoOperacion={tipoOperacion} />
      </DrawerPersonalizado>
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
