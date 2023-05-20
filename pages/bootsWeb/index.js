import ABMColeccion from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloBootsWeb";
import { fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { Context } from "context/userContext";
import TestBootWeb from "./test";
import Form from "./_form";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";

export default function Page({ parentData }) {
  const order = "nombre";
  const icono = "fas fa-globe-americas";
  const [openTest, setOpenTest] = useState(false);
  const [seleccion, setSeleccion] = useState();
  useLayout({
    label: "Boots web",
    titulo: "BOOTS",
    acciones: [
      // { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    ],
  });
  const cols = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      filterFn: "includesString",
      size: 220,
    },
    {
      accessorKey: "rutinas",
      header: "Cant. Rutinas",
      size: 220,
      Cell: ({ cell }) => `${cell.getValue().length}`,
      // return getFechaString(cell.getValue(), "DD/MM/YY | hh:mm");
    },
  ];
  const fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-vial",
      label: "Test",
      fn: (data) => {
        setSeleccion(data);
        setOpenTest(true);
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        acciones={fnAcciones}
        coleccion={`bootsWeb`}
        columns={cols}
        where={getWherePermiso("bootsWeb")}
        labelNuevo="Nuevo Boot"
        preData={{}}
        orderBy={order}
        maxWidth={"md"}
        titulo="Boots Web"
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        // titulo={`Boots WEB`}
        Form={Form}
      />
      <TestBootWeb open={openTest} setOpen={setOpenTest} data={seleccion} />
    </>
  );
}
