import ABMColeccion from "@components/forms/ABMcollection";
import Modelo, { valoresIniciales } from "@modelos/ModeloBootsWeb";
import { fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import TestBootWeb from "./test";
import Form from "./_form";
export default function Modulo({ mod, parentData }) {
  const order = "nombre";
  const icono = "fas fa-globe-americas";
  const [openTest, setOpenTest] = useState(false);
  const [seleccion, setSeleccion] = useState();
  const cols = [
    {
      field: "nombre",
      headerName: "Nombre",
      width: 220,
    },
    {
      field: "entradas",
      headerName: "entradas",
      width: 220,
      renderCell: (params) => `${params.value.map((e) => e.nombre).join(",")}`,
    },
    {
      field: "rutinas",
      headerName: "Rutina",
      width: 200,
      renderCell: (params) => `${params.value.length} movimientos`,
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
        where={[
          parentData
            ? ["idUsuario", "==", localStorage.getItem("usermod")]
            : ["usermod", "==", fuego.auth().currentUser?.uid],
        ]}
        labelNuevo="Nuevo Boot"
        preData={{}}
        orderBy={order}
        maxWidth={"md"}
        icono={icono}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        titulo={`Boots WEB`}
        Form={Form}
      />
      <TestBootWeb open={openTest} setOpen={setOpenTest} data={seleccion} />
    </>
  );
}
