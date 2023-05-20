import { getFechaString } from "@helpers/dates";

import axios from "axios";
import { useRef, useState } from "react";
import Test from "./test";
import EnviarCredenciales from "./enviar";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { fuego } from "@nandorojo/swr-firestore";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import Form from "@pages/envioTarjetas/_form";
import Modelo, { valoresIniciales } from "@modelos/ModeloEnvioTarjetas";
import { useRouter } from "next/router";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import useLayout from "@hooks/useLayout";
export default function Modulo({ mod, parentData }) {
  const order = ["fecha", "desc"];
  const router = useRouter();
  const config = UseConfigModulo("envioTarjetas");
  const idPlantilla = config?.tarjetasImpresas;
  useLayout({
    label: "Envio de Tarjetas",
    titulo: "TARJETAS",
    icon: "fas fa-credit-card",
    acciones: [
      {
        label: "Envios",
        icono: "fas fa-credit-card",
        url: "/envioTarjetas",
      },
      { label: "Config", icono: "fas fa-cog", url: "/envioTarjetas/config" },
    ],
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEnviar, setOpenEnviar] = useState(false);
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const tableInstanceRef = useRef();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 100,
      Cell: ({ cell }) =>
        getFechaString(cell.getValue() ? cell.getValue() : ""),
    },
    {
      accessorKey: "recibidas",
      header: "Recibida?",
      size: 100,
      Cell: ({ cell }) =>
        cell.row.original.fechaRecibidas
          ? getFechaString(cell.row.original.fechaRecibidas)
          : "NO",
    },
    {
      accessorKey: "cantidad",
      header: "Cantidad Tarjetas",
      size: 170,
    },

    {
      accessorKey: "email",
      header: "Enviar a ...",
      size: 320,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
      Cell: ({ cell }) => `${cell.getValue()}`,
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
  let fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-envelope",
      label: "Enviar",

      fn: (data) => {
        setDataSeleccion(data);
        setOpenEnviar(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-credit-card",
      label: "Credenciales",

      fn: (data) => {
        console.log(data);
        router.push(`/envioTarjetas/tarjetas/${data.id}`, undefined, {
          shallow: true,
        });
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",

      fn: async (data) => {
        setOpenImpresion(true);
        const tarjetas = await getTarjetas(data);
        setDataImpresion({ ...data, tarjetas });
      },
    },
  ];
  const where = [
    parentData
      ? ["idUsuario", "==", localStorage.getItem("usermod")]
      : ["usermod", "==", fuego.auth().currentUser?.uid],
  ];
  return (
    <>
      <ABMColeccion2
        coleccion={`envioTarjetas`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        where={where}
        gridOptions={{
          tableInstanceRef,

          // renderDetailPanel: ({ row }) => {
          //   return <></>;
          // },
          initialState: { showColumnFilters: false },
          enableRowSelection: false,
          filterFns: {
            filtroFecha: (row, id, filterValue) => {
              const date = new Date(row.original[id].seconds * 1000);
              const dateFiltro = new Date(filterValue);

              //si es fecha invalida
              if (isNaN(dateFiltro.getTime())) return true;
              //comparo fechas
              return (
                date.getDate() === dateFiltro.getDate() &&
                date.getMonth() === dateFiltro.getMonth() &&
                date.getFullYear() === dateFiltro.getFullYear()
              );
            },
          },
          // getRowId: (row) => row.id,
        }}
        orderBy={order}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        // dataForm={{ grupo: seleccion }}
        titulo={`ENVIO DE TARJETAS`}
        Form={Form}
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
