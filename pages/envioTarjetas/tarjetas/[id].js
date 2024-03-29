import ABMColeccion from "@components/forms/ABMcollection";
import MuestraImagen from "@components/forms/muestraImagen";
import { QueryApi } from "@helpers/queryApi";
import {
  ModeloCredenciales,
  valoresInicialesCredenciales,
} from "@modelos/ModeloEnvioTarjetas";
import Form from "@components/envioTarjetas/tarjetas/_formTarjeta";
import { Grid } from "@mui/material";
import { useCollection, fuego, useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function TarjetasEnvio({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const CANTIDAD_PAGINA = 27;
  const order = ["apellido"];
  const router = useRouter();
  const { data: envioTarjeta } = useDocument(
    `/envioTarjetas/${router.query.id}`
  );
  const columns = [
    {
      field: "foto",
      headerName: "Foto",
      width: 100,
      renderCell: (params) => (
        <MuestraImagen w={30} h={30} pathImagen={params.value} />
      ),
    },
    {
      field: "apellido",
      headerName: "Apellido",
      width: 200,
    },
    {
      field: "nombre",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "nroSocio",
      headerName: "Nro Socio",
      width: 100,
    },
  ];
  const acciones = [
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Inscriptos",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenInscriptos(true);
    //   },
    // },
    // {
    //   esFuncion: true,
    //   icono: "fas fa-clock",
    //   label: "Asistencias",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenAsistencias(true);
    //   },
    // },
    // {
    //   esFuncion: true,
    //   icono: "fas fa-history",
    //   label: "Cierre Asistencias",
    //   fn: (row) => {
    //     setSeleccion(row);
    //     setOpenCierreAsistencias(true);
    //   },
    // },
  ];
  return (
    <Grid spacing={1} container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`envioTarjetas/${envioTarjeta?.id}/tarjetas`}
          columns={columns}
          acciones={acciones}
          hideNew={false}
          orderBy={order}
          limit={300}
          icono={"fas fa-credit-card"}
          Modelo={ModeloCredenciales}
          valoresIniciales={valoresInicialesCredenciales}
          titulo={`CREDENCIALES`}
          Form={Form}
        />
      </Grid>

      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
