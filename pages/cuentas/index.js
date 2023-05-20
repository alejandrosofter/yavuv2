import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import ABMColeccion from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloCuentas";
import Form from "@components/cuentas/_form";
export default function Page({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const columns = [
    {
      accessorKey: "email",
      header: "Email",
      size: 220,
      // Cell: ({ cell }) => {
      //   return getFechaString(cell.getValue(), "DD/MM/YY | hh:mm");
      // },
    },
    {
      accessorKey: "label_plan",
      header: "Plan",
      size: 250,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 150,
    },
    {
      accessorKey: "razonSocial",
      header: "Razon Social",
      size: 220,
    },
    {
      accessorKey: "telefono",
      header: "Tel",
      size: 120,
    },

    {
      accessorKey: "estado",
      header: "Estado",
      size: 90,
    },
  ];
  let fnAcciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-share-alt",
    //   label: "Update Mods",
    //   fn: (data) => {
    //     setDataConsulta({ url: "/api/planes/updateMods", data });
    //   },
    // },
  ];

  return (
    <>
      <ABMColeccion
        coleccion={`cuentas`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        // where={[
        //   parentData
        //     ? ["idUsuario", "==", localStorage.getItem("usermod")]
        //     : ["usermod", "==", fuego.auth().currentUser?.uid],
        // ]}
        // orderBy={order}
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        esSuperAdmin={true}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`CUENTAS`}
        Form={Form}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
