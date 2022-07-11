import { useState, useCallback, useEffect } from "react";

import moment from "moment";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Backdrop, CircularProgress, Icon } from "@mui/material";
import SubColeccionColeccion from "@components/forms/subColeccion/";
import {
  ModeloTarjetas,
  valoresInicialesTarjetas,
} from "@modelos/ModeloSocios";
import ImpresionDialog from "@components/forms/impresion";
import UseCuenta from "@components/cuentas/useCuenta";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import axios from "axios";
import { getImagen } from "@helpers/imagenes";
export const cols = [
  {
    field: "fecha",
    headerName: "Fecha",
    width: 120,
    renderCell: (params) => {
      const d = new Date(params.value.seconds * 1000);

      return (
        //en params.row tengo los otros datos
        <i>{`${moment(d).format("DD/MM/YY")}`}</i>
      );
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
  const [openCompartir, setOpenCompartir] = useState();
  const [dataSeleccion, setDataSeleccion] = useState();
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
  const [cuenta, setCuenta] = UseCuenta();
  const campo = "tarjetas";
  const labelCampo = "TARJETAS";
  const icono = "fas fa-credit-card";
  const pathFormulario = "socios/tarjetas/_formTarjetas";
  const urlAcepta = `/api/socios/abmItem?subColeccion=${campo}`;
  const accionesExtra = (params) => {
    return [
      <GridActionsCellItem
        key={params.row.id}
        icon={<Icon fontSize="10" className="fas fa-share-alt" />}
        label="Compartir"
        onClick={clickImprimir(params.row)}
        showInMenu
      />,
      <GridActionsCellItem
        key={params.row.id}
        icon={<Icon fontSize="10" className="fas fa-share" />}
        label="Enviar Impresion Terceros"
        onClick={clickImprimirTerceros(params.row)}
        showInMenu
      />,
    ];
  };

  const clickImprimir = useCallback(
    (dataCredencial) => () => {
      setDataSeleccion({ ...data, dataCredencial });
      setOpenCompartir(true); //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
    },
    []
  );
  const enviarTercero = (dataCredencial) => {
    setLoading(true);
    console.log(dataCredencial, data);
    axios
      .get("/api/envioTarjetas/sendTarjeta", {
        params: {
          idTarjeta: dataCredencial.id,
          idSocio: data.id,
          nombre: data.nombre,
          apellido: data.apellido,
          id: data.id,
          foto: data.foto,
          tk: data.idUsuario,
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  const clickImprimirTerceros = useCallback(
    (dataCredencial) => () => {
      enviarTercero(dataCredencial);
    },
    []
  );

  return (
    <>
      <SubColeccionColeccion
        sortModel={[{ field: "fecha", sort: "desc" }]}
        accionesExtra={accionesExtra}
        mod={mod}
        coleccion={mod.coleccion}
        urlAcepta={urlAcepta}
        titulo={labelCampo}
        modelo={ModeloTarjetas}
        valoresIniciales={valoresInicialesTarjetas}
        pathFormulario={pathFormulario}
        columns={cols}
        registro={data}
        campo={campo}
        icono={icono}
      />
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
