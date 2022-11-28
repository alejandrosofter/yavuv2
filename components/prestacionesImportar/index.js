import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPrestacionesImportar";

import { useState } from "react";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
export default function Modulo({ mod }) {
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
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "label_obraSocial",
      headerName: "Obra Social",
      width: 320,
    },
    {
      field: "archivo",
      headerName: "Archivo",
      width: 280,
      renderCell: (params) => renderCellExpandData(params, getDetalleArchivo),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
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
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`OBRAS SOCIALES`}
        Form={Form}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
