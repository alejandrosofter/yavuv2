import { useState, useCallback } from "react";

import moment from "moment";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Icon } from "@mui/material";
import SubColeccionColeccion from "@components/forms/subColeccion/";
import {
  ModeloTarjetas,
  valoresInicialesTarjetas,
} from "@modelos/ModeloSocios";
import ImpresionDialog from "@components/forms/impresion";
import UseCuenta from "@components/cuentas/useCuenta";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
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
    field: "detalle",
    headerName: "Detalle",
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
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantillaCredencial,
    data: dataSeleccion,
  });
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
    ];
  };

  const clickImprimir = useCallback(
    (dataCredencial) => () => {
      setDataSeleccion({ ...data, dataCredencial });
      setOpenCompartir(true); //uso esto para que cambie valor y abra el dialog.. si no cambia no abre
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
    </>
  );
}
