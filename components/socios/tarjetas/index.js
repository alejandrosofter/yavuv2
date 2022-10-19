import { useState, useCallback, useEffect } from "react";

import { Grid } from "@mui/material";
import {
  ModeloTarjetas,
  valoresInicialesTarjetas,
} from "@modelos/ModeloSocios";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import axios from "axios";
import { getImagen } from "@helpers/imagenes";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_formTarjetas";
import { getFechaString } from "@helpers/dates";
import UseCuenta from "@components/cuentas/useCuenta";
import { QueryApi } from "@helpers/queryApi";
export const cols = [
  {
    field: "fecha",
    headerName: "Fecha",
    width: 120,
    renderCell: (params) => {
      return getFechaString(params.value);
    },
  },
  {
    field: "label_tipo",
    headerName: "Tipo",
    width: 110,
  },
  {
    field: "identificador",
    headerName: "ID unico",
    width: 110,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 180,
  },
];

export default function TarjetasSocio({ data, mod }) {
  const idPlantillaCredencial = mod.config?.plantillaCredencial
    ? mod.config?.plantillaCredencial
    : "";
  const idPlantillaEmail = mod.config?.plantillaEmailCredencial
    ? mod.config?.plantillaEmailCredencial
    : "";
  const [cuenta, setCuenta] = UseCuenta();
  const [openCompartir, setOpenCompartir] = useState();
  const [dataSeleccion, setDataSeleccion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const [loading, setLoading] = useState(false);
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantillaCredencial,
    data: dataSeleccion,
  });
  useEffect(() => {
    setImagenBase(dataSeleccion?.foto);
  }, [dataSeleccion]);
  const setImagenBase = async (path) => {
    let aux = dataSeleccion;
    if (aux) {
      aux.fotoBase32 = await getImagen(path);
      setDataSeleccion(aux);
    }
  };
  const order = ["fecha"];
  const subColeccion = "credenciales";
  const icono = "fas fa-id-card";
  const titulo = `CREDENCIALES `;
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",
      fn: (row) => {
        setDataSeleccion({ ...data, dataCredencial: row });
        setOpenCompartir(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-share",
      label: "Enviar Impresion Terceros",
      fn: (row) => {
        console.log({
          idTarjeta: row.id,
          idSocio: data.id,
          tk: data.idUsuario,
          ...row,
        });
        setDataSeleccion(row);
        setDataConsulta({
          url: "/api/envioTarjetas/sendTarjeta",
          data: {
            idTarjeta: row.id,
            idSocio: data.id,
            tk: data.idUsuario,
            ...row,
            idUsuario: data.idUsuario,
            usermod: data.usermod,
          },
        });
      },
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <ABMColeccion
          coleccion={`socios/${data?.id}/${subColeccion}`}
          columns={cols}
          order={order}
          // callbackclick={callbackclick}
          icono={icono}
          labelNuevo="agregar credencial"
          acciones={acciones}
          Modelo={ModeloTarjetas}
          valoresIniciales={valoresInicialesTarjetas}
          dataForm={{ mod }}
          titulo={titulo}
          Form={Form}
        />
      </Grid>
      <ImpresionDialog
        titulo="CREDENCIAL ELECTRONICA"
        setOpen={setOpenCompartir}
        open={openCompartir}
        asunto="CREDENCIAL ELECTRONICA"
        data={{ ...dataSeleccion, cuenta }}
        plantillaEmail={idPlantillaEmail}
        plantilla={plantilla}
        attachments={[{ filename: "CREDENCIAL.pdf", data: plantilla }]}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </Grid>
  );
}
