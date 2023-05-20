import ABMColeccion from "@components/forms/ABMcollection2";
import Form from "@components/obrasSociales/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloObrasSociales";
import PrestacionesListado from "@components/prestaciones/listadoOs";
import { useState } from "react";
import { getFechaString } from "@helpers/dates";
import { getWherePermiso } from "@hooks/useUser";
import useLayout from "@hooks/useLayout";
export default function Modulo({ mod }) {
  useLayout({
    label: "Obras Sociales",
    titulo: "OBRAS SOCIALES",
    icon: "fas fa-hospital-alt",
    acciones: [
      {
        label: "O.S",
        icono: "fas fa-hospital-alt",
        url: "/obrasSociales",
      },
      // {
      //   label: "Config",
      //   icono: "fas fa-cog",
      //   url: "/consultaPaciente/config",
      // },
    ],
  });
  const [seleccion, setSeleccion] = useState(null);
  const [open, setOpen] = useState(false);
  const order = "nombre";
  const columns = [
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 390,
    },
    {
      accessorKey: "lastUpdateNomencladores",
      header: "Ultima Actualizacion Presta.",
      size: 160,
      Cell: ({ cell }) => getFechaString(cell.getValue()),
    },
    {
      accessorKey: "tipoValidacion",
      header: "Validacion...",
      size: 120,
    },
    {
      accessorKey: "label_rutinaWeb",
      header: "Rutina WEB",
      size: 140,
      Cell: ({ cell }) =>
        cell.row.tipoValidacion === "WEB" ? params.value : "-",
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 120,
    },
  ];

  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-file-medical",
      label: "Prestaciones",

      fn: (row) => {
        setSeleccion(row);
        setOpen(true);
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={`obrasSociales`}
        columns={columns}
        acciones={acciones}
        order={["nombre", "asc"]}
        maxWidth="lg"
        rowsPerPage={100}
        hidePaginador={true}
        where={getWherePermiso("obrasSociales")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`OBRAS SOCIALES`}
        Form={Form}
      />
      <PrestacionesListado
        open={open}
        setOpen={setOpen}
        obraSocial={seleccion}
        mod={mod}
      />
    </>
  );
}
