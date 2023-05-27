import ABMColeccion from "@components/forms/ABMcollection2";
import { formatMoney } from "@helpers/numbers";
import { useState } from "react";
import MovimientosProducto from "@components/productos/movimientos";
import Modelo, { valoresIniciales } from "@modelos/ModeloProductos";
import Form from "components/productos/_form";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
import { Icon, Tooltip } from "@mui/material";
export default function Modulo({ mod, parentData }) {
  const [openMovimientos, setOpenMovimientos] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const order = "nombre";
  useLayout({
    label: "Productos",
    titulo: "PRODUCTOS",
    icon: "fas fa-shopping-cart",
    acciones: [
      {
        label: "Productos",
        icono: "fas fa-shopping-cart",
        url: "/productos",
      },
      // { label: "Config", icono: "fas fa-cog", url: "/debitoAutomatico/config" },
    ],
  });
  const columns = [
    {
      accessorKey: "esActividad",
      header: "",
      size: 12,
      Cell: ({ cell }) =>
        cell.getValue() ? (
          <Tooltip title={`Es una actividad deportiva`}>
            <Icon class="fas fa-futbol" />
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      accessorKey: "esSocial",
      header: "",
      size: 12,
      Cell: ({ cell }) =>
        cell.getValue() ? (
          <Tooltip title={`Es una cuota social`}>
            <Icon class="fas fa-user" />
          </Tooltip>
        ) : (
          ""
        ),
    },
    {
      accessorKey: "cantidad",
      header: "Cant.",
      size: 60,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 250,
    },
    {
      accessorKey: "detalle",
      header: "Detalle",
      size: 250,
    },
    {
      accessorKey: "esServicio",
      header: "Es Servicio?",
      size: 120,
      Cell: ({ cell }) => (cell.getValue() ? "Si" : "No"),
    },
    {
      accessorKey: "label_idCategoriaProducto",
      header: "Categoria",
      size: 150,
    },
    {
      accessorKey: "importe",
      header: "Importe",
      size: 150,
      Cell: ({ cell }) => formatMoney(cell.getValue()),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 90,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-business-time",
      label: "Movimientos",

      fn: (row) => {
        setSeleccion(row);
        setOpenMovimientos(true);
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={`productos`}
        columns={columns}
        acciones={acciones}
        orderBy={order}
        maxWidth="lg"
        where={getWherePermiso("productos")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{ grupo: seleccion }}
        titulo={`PRODUCTOS`}
        Form={Form}
      />
      <MovimientosProducto
        open={openMovimientos}
        setOpen={setOpenMovimientos}
        producto={seleccion}
      />
    </>
  );
}
