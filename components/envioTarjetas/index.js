import { getFechaString } from "@helpers/dates";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import axios from "axios";
import { useState } from "react";
import Test from "./test";
import EnviarCredenciales from "./enviar";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { fuego } from "@nandorojo/swr-firestore";

export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const idPlantilla = mod.config?.tarjetasImpresas;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEnviar, setOpenEnviar] = useState(false);
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "recibidas",
      headerName: "Recibida?",
      width: 100,
      renderCell: (params) =>
        params.value ? getFechaString(params.row.fechaRecibidas) : "NO",
    },
    {
      field: "cantidad",
      headerName: "Cantidad Tarjetas",
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
  const getTarjetas = async (data) => {
    return await fuego.db
      .collection(`envioTarjetas/${data.id}/tarjetas`)
      .orderBy("apellido")
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return doc.data();
        });
      });
  };
  let fnAcciones = {
    enviar: (data) => {
      setDataSeleccion(data);
      setOpenEnviar(true);
    },
    imprimir: async (data) => {
      setOpenImpresion(true);
      const tarjetas = await getTarjetas(data);
      setDataImpresion({ ...data, tarjetas });
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
        parentData={true}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
      <EnviarCredenciales
        data={dataSeleccion}
        open={openEnviar}
        setOpen={setOpenEnviar}
      />
      <ImpresionDialog
        titulo="TARJETAS IMPRESAS"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="TARJETAS IMPRESAS "
        data={dataImpresion}
        plantilla={plantilla}
      />
    </>
  );
}
