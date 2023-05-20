import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloImportaciones";
import Form from "@components/importaciones/_form";
import ABMColeccion from "@components/forms/ABMcollection";
import useLayout from "@hooks/useLayout";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const [dataConsulta, setDataConsulta] = useState();
  useLayout({
    label: "Importaciones",
    titulo: "IMPORTA DATA",
    acciones: [
      // { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
      // { label: "Config", icono: "fas fa-cog", url: "/turnos/config" },
    ],
  });
  let fnAcciones = {
    aplicar: (data, id) => {
      setDataConsulta({ url: "/api/importaciones/iniciar", data });
    },
    stop: (data, id) => {
      setDataConsulta({ url: "/api/importaciones/stop", data });
    },
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "clavePrimaria",
      headerName: "Pk file",
      width: 80,
    },
    {
      field: "destino",
      headerName: "Destino",
      width: 100,
    },
    {
      field: "cantidadProcesada",
      headerName: "Procesados",
      width: 100,
    },
    // {
    //   field: "pagina",
    //   headerName: "Pagina",
    //   width: 100,
    //   renderCell: (params) =>
    //     `${params.row.pagina ? params.row.pagina : 0}/${
    //       params.row.cantidadLotes ? params.row.cantidadLotes : 0
    //     }`,
    // },
    // {
    //   field: "registros",
    //   headerName: "Registros",
    //   width: 120,
    //   renderCell: (params) =>
    //     `${params.row.cantidadRegistros ? params.row.cantidadRegistros : 0}/${
    //       params.row.importados ? params.row.importados : 0
    //     }`,
    // },
    // {
    //   field: "totalPostProcesa",
    //   headerName: "Res. Post",
    //   width: 80,
    // },
    {
      field: "pathFile",
      headerName: "Archivo",
      width: 420,
    },
    {
      field: "pathFile",
      headerName: "Archivo",
      width: 420,
    },
    {
      field: "fnPostProcesa",
      headerName: "FN Post",
      width: 100,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  return (
    <>
      <ABMColeccion
        fnAcciones={fnAcciones}
        coleccion={"importaciones"}
        label={"Importaciones"}
        Modelo={Modelo}
        Form={Form}
        valoresIniciales={valoresIniciales}
        titulo={`Importaciones`}
        subTitulo="generales"
        parentData={true}
        icono={`fas fa-file-import`}
        limit={10}
        acciones={[]}
        orderBy={order}
        columns={columns}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
