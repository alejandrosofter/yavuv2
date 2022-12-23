import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloPredeudaSocios";

import { useState } from "react";
import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import { fuego } from "@nandorojo/swr-firestore";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = useState(null);
  const [open, setOpen] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const order = ["fecha_timestamp", "desc"];

  console.log(fuego.auth().currentUser.uid);
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
      field: "nroSocio",
      headerName: "Nro Socio",
      width: 180,
    },
    {
      field: "label_socio",
      headerName: "Obra Social",
      width: 320,
    },
    {
      field: "label_tipoPeriodo",
      headerName: "Periodo",
      width: 120,
    },
    {
      field: "label_tipoPeriodo",
      headerName: "Periodo",
      width: 120,
    },
    {
      field: "label_idProducto",
      headerName: "Producto/Servicio",
      width: 220,
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
      label: "Baja de Mensualizacion",

      fn: (data) => {
        setDataConsulta({
          url: "/api/menusalizaciones/bajaMenusal",
          data,
        });
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={`socios_predeudas`}
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
        titulo={`PRE-DEUDA SOCIOS`}
        Form={Form}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
