import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { formatMoney } from "../../helpers/numbers";
import moment from "moment";
import { getFechaString } from "../../helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import Dialogo from "@components/forms/dialogo";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [openDialogo, setOpenDialogo] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const order = ["fecha", "desc"];
  const getImputaciones = (imputaciones) => {
    let salida = "";
    if (!imputaciones) return "Sin imputaciones, esperando rta del banco";
    imputaciones.forEach(
      (imputa) =>
        (salida += `${getFechaString(imputa.fecha)} => ${imputa.estado}`)
    );
    return salida;
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "label_tipoCuenta",
      headerName: "Tipo Cuenta",
      width: 120,
    },

    {
      field: "importeTotal",
      headerName: "$ Total",
      width: 120,
      renderCell: (params) => formatMoney(params.value),
    },
    {
      field: "totalCobrado",
      headerName: "$ Cobrado",
      width: 120,
      renderCell: (params) => `${formatMoney(params.value ? params.value : 0)}`,
    },
    {
      field: "cantidadProcesada",
      headerName: "Procesados",
      width: 120,
    },
    {
      field: "cantidadDeudas",
      headerName: "Cant Deudas",
      width: 120,
      renderCell: (params) => `${params.value ? params.value : 0}`,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
    },
  ];
  const successQuery = (dataConsulta, dataResponse) => {
    switch (dataConsulta.url) {
      case "/api/debitoAutomatico/descargar": {
        window.open(dataResponse.data.url, "_blank");
        break;
      }
    }
  };
  let fnAcciones = {
    descargar: (data) => {
      setDataSeleccion(data);
      setDataConsulta({ url: "/api/debitoAutomatico/descargar", data });
    },
    reprocesar: (data) => {
      setDataSeleccion(data);
      // if (data.estado !== "PROCESANDO")
      setDataConsulta({ url: "/api/debitoAutomatico/reprocesar", data });
      // else setOpenDialogo(true);
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        coleccion={mod.coleccion}
        titulo={mod.label}
        subTitulo=""
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
      <Dialogo
        titulo={"DEBITO PROCESANDO"}
        detalle="Aguarde por favor a que finalize de procesar"
        open={openDialogo}
        setOpen={setOpenDialogo}
      />
      <QueryApi callbackSuccess={successQuery} dataConsulta={dataConsulta} />
    </>
  );
}
