import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloContactos";
import Form from "@components/contactos/_form";
import { fuego } from "@nandorojo/swr-firestore";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({}) {
  useLayout({
    label: "Contactos",
    titulo: "CONTACTOS",
    acciones: [
      // { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
      // { label: "Config", icono: "fas fa-cog", url: "/turnos/config" },
    ],
  });
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

  const parentData = true;
  return (
    <>
      <ABMColeccion
        coleccion={`contactos`}
        columns={columns}
        acciones={acciones}
        orderBy={order}
        maxWidth="lg"
        where={getWherePermiso("contactos")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        titulo={`CONTACTOS/`}
        Form={Form}
      />
    </>
  );
}
