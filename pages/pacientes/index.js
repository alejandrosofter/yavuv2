import { useContext, useEffect, useState } from "react";
import SelectPaciente from "@components/pacientes/selectPaciente";
import useLayout from "@hooks/useLayout";
import { useRouter } from "next/router";
import { getWherePermiso } from "@hooks/useUser";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloPacientes";
import Form from "@components/pacientes/_form";
export default function Page(props) {
  const router = useRouter();
  useLayout({
    label: "Pacientes",
    titulo: "Pacientes",
    acciones: [
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
      { label: "Turnos", icono: "fas fa-calendar", url: "/turnos" },
      { label: "Config", icono: "fas fa-cog", url: "/pacientes/config" },
      { label: "Ficha", icono: "fas fa-id-card", url: "/pacientes/ficha" },
    ],
    components: (
      <>
        <SelectPaciente
          callbackchange={(select, item) => {
            if (item) {
              localStorage.setItem("pacienteSeleccion", JSON.stringify(item));
              router.push(`/pacientes/ficha/${item.id}`);
            }
          }}
          sx={{ fontColor: "black" }}
          esForm={false}
        />
      </>
    ),
  });
  const [seleccion, setSeleccion] = useState(null);
  const [open, setOpen] = useState(false);
  const order = "nombre";
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 150,
    },
    {
      accessorKey: "apellido",
      header: "Apellido",
      size: 150,
      // Cell: ({ cell }) => getFechaString(cell.getValue()),
    },
    {
      accessorKey: "dni",
      header: "DNI",
      size: 120,
    },
    {
      accessorKey: "telefono",
      header: "TEL",
      size: 120,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 120,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 120,
    },
  ];

  const acciones = [
    {
      // esFuncion: true,
      // icono: "fas fa-file-medical",
      // label: "Prestaciones",
      // fn: (row) => {
      //   setSeleccion(row);
      //   setOpen(true);
      // },
    },
  ];

  return (
    <ABMColeccion2
      coleccion={`pacientes`}
      columns={columns}
      acciones={acciones}
      order={["apellido", "asc"]}
      maxWidth="md"
      rowsPerPage={100}
      hidePaginador={true}
      where={getWherePermiso("pacientes")}
      Modelo={Modelo}
      valoresIniciales={valoresIniciales}
      dataForm={{}}
      titulo={`PACIENTES`}
      Form={Form}
    />
  );
}
