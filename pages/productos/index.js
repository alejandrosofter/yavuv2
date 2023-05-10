import ABMColeccion from "@components/forms/ABMcollection";
import { formatMoney } from "@helpers/numbers";
import { useState } from "react";
import MovimientosProducto from "./movimientos";
import Modelo, { valoresIniciales } from "@modelos/ModeloProductos";
import Form from "./_form";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modulo({ mod, parentData }) {
  const [openMovimientos, setOpenMovimientos] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const order = "nombre";
  const columns = [
    {
      field: "cantidad",
      headerName: "Cant.",
      width: 60,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 250,
    },
    {
      field: "detalle",
      headerName: "Detalle",
      width: 250,
    },
    {
      field: "esServicio",
      headerName: "Es Servicio?",
      width: 120,
      renderCell: (params) => (params.value ? "Si" : "No"),
    },
    {
      field: "label_idCategoriaProducto",
      headerName: "Categoria",
      width: 150,
    },
    {
      field: "importe",
      headerName: "Importe",
      width: 150,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 90,
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
        where={[
          parentData
            ? ["idUsuario", "==", localStorage.getItem("usermod")]
            : ["usermod", "==", fuego.auth().currentUser?.uid],
        ]}
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{ grupo: seleccion }}
        titulo={`PRODUCTOS/`}
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
