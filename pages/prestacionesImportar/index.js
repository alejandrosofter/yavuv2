import ABMColeccion from "@components/forms/ABMcollection2";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPrestacionesImportar";

import { useState } from "react";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import useLayout from "@hooks/useLayout";
import { getWherePermiso } from "@hooks/useUser";
export default function Modulo({}) {
  useLayout({
    label: "Importacion Prestaciones",
    titulo: "IMPORTACION PRESTACIONES",
    icon: "fas fa-file-import",
    acciones: [
      {
        label: "Importar",
        icono: "fas fa-file-import",
        url: "/prestacionesImportar",
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
  const [dataConsulta, setDataConsulta] = useState();
  const order = ["fecha_timestamp", "desc"];
  const getDetalleArchivo = (row) => {
    return `${
      row?.archivo?.nombreUser ? row?.archivo?.nombreUser : "SIN ARCHIVO!"
    }`;
  };
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 90,
      Cell: ({ cell }) =>
        getFechaString(cell.getValue() ? cell.getValue() : ""),
    },
    {
      accessorKey: "label_obraSocial",
      header: "Obra Social",
      size: 320,
    },
    {
      accessorKey: "archivo",
      header: "Archivo",
      size: 280,
      Cell: ({ cell }) => getDetalleArchivo(cell.row.original),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
    },
  ];
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-refresh",
      label: "Re-Procesar archivo",

      fn: (data) => {
        setDataConsulta({
          url: "/api/prestaciones/recalcularPrestacionHttp",
          data,
        });
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={`prestacionesImportar`}
        columns={columns}
        acciones={acciones}
        orderBy={order}
        maxWidth="lg"
        rowsPerPage={100}
        hidePaginador={true}
        where={getWherePermiso("prestacionesImportar")}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`PRESTACIONES IMPORTADAS`}
        Form={Form}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
