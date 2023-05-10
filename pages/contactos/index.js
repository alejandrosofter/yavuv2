import ABMColeccion from "@components/forms/ABMcollection";

import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloContactos";
import Form from "./_form";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modulo({ mod }) {
  const order = "apellido";
  // const columns = [
  //   {
  //     field: "nombre",
  //   },
  // ];
  const columns = [
    {
      field: "apellido",
      headerName: "Apellido",
      width: 120,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 120,
    },
    {
      field: "telefono",
      headerName: "Tel.",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "tieneWhatsapp",
      headerName: "Wsap?",
      width: 120,
      renderCell: (params) => (params.value ? "Si" : "No"),
    },

    {
      field: "estado",
      headerName: "Estado",
      width: 90,
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Movimientos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenMovimientos(true);
    //   },
    // },
  ];
  console.log(
    parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid]
  );
  const parentData = true;
  return (
    <>
      <ABMColeccion
        coleccion={`contactos`}
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
        titulo={`CONTACTOS/`}
        Form={Form}
      />
    </>
  );
}
