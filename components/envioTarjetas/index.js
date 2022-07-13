import { getFechaString } from "@helpers/dates";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import axios from "axios";
import { useState } from "react";
import Test from "./test";
import EnviarCredenciales from "./enviar";

export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEnviar, setOpenEnviar] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();

  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "cantidad",
      headerName: "Cantidad Tarjetas",
      width: 170,
    },
    {
      field: "cantidadProcesada",
      headerName: "Cantidad Procesada",
      width: 170,
    },
    {
      field: "email",
      headerName: "Enviar a ...",
      width: 320,
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
      renderCell: (params) => `${params.value}`,
    },
  ];
  const enviarSolicitud = (url, data) => {
    setLoading(true);
    axios
      .get(url, {
        params: data,
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  let fnAcciones = {
    enviar: (data) => {
      setDataSeleccion(data);
      setOpenEnviar(true);
    },
    stop: (data) => {
      enviarSolicitud(`/api/envioTarjetas/stop`, { id: data?.id });
    },
    procesar: (data, id) => {
      enviarSolicitud(`/api/envioTarjetas/procesar`, { id: data?.id });
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        titulo={mod.label}
        subTitulo="para enviar al proveedor de tarjetas"
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
      <EnviarCredenciales
        data={dataSeleccion}
        open={openEnviar}
        setOpen={setOpenEnviar}
      />
    </>
  );
}
