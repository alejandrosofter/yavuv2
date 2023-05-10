import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { formatMoney } from "../../helpers/numbers";
import moment from "moment";
import { getFechaString } from "../../helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import Dialogo from "@components/forms/dialogo";
import ItemsDebitoAutomatico from "./deudas";
import EnvioBanco from "./envio";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [openDialogo, setOpenDialogo] = useState(false);
  const [openEnviar, setOpenEnviar] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [openDeudas, setOpenDeudas] = useState();
  const order = ["fecha", "desc"];

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
      field: "vtos",
      headerName: "VTOS",
      width: 230,
      renderCell: (params) =>
        `1er ${getFechaString(params.row.primerVto)} | 2do ${getFechaString(
          params.row.segundoVto
        )} | 3er ${getFechaString(params.row.tercerVto)} | `,
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

  let fnAcciones = {
    descargar: (data) => {
      setDataSeleccion(data);
      // descargo archivo con url
      window.open(data?.archivoBanco?.url, "_blank");
    },
    deudas: (data) => {
      setDataSeleccion(data);
      setOpenDeudas(true);
    },
    enviar: (data) => {
      setDataSeleccion(data);
      setOpenEnviar(true);
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
        parentData={true}
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
      <EnvioBanco
        open={openEnviar}
        setOpen={setOpenEnviar}
        data={dataSeleccion}
      />
      <ItemsDebitoAutomatico
        open={openDeudas}
        setOpen={setOpenDeudas}
        debito={dataSeleccion}
      />
    </>
  );
}
