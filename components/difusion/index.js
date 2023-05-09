import { getFechaString } from "@helpers/dates";
import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import axios from "axios";
import { useRef, useState } from "react";
import { TestDifusion } from "./test";
import ABMColeccion from "@components/forms/ABMcollection2";
import { fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloDifusion";
import Form from "./_form";
import Dialogo from "@components/forms/dialogo";
import { addQueryApi } from "@helpers/db";
import { FeedbackEnvios } from "./feedbackEnvios";
export default function Modulo({ mod, parentData }) {
  const order = ["fecha", "desc"];
  const [open, setOpen] = useState(false);
  const [openDestinatarios, setOpenDestinatarios] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [openConfirma, setOpenConfirma] = useState();
  const tableInstanceRef = useRef();
  const enviarDifusion = () => {
    addQueryApi("aplicarDifusion", dataSeleccion).then((res) => {});
  };
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 120,
      enableColumnFilter: false,
      filterFn: "filtroFecha",
      Cell: ({ cell }) => {
        return getFechaString(cell.getValue(), "DD/MM/YY | hh:mm");
      },
    },
    {
      accessorKey: "asunto",
      header: "Asunto",
      size: 250,
    },
    {
      accessorKey: "label_modulo",
      header: "Modulo",
      // filterFn: "includesString",
      size: 150,
    },
    {
      accessorKey: "cantidadEmailsEnviados",
      header: "Enviados",
      // filterFn: "includesString",
      size: 120,
    },
    {
      accessorKey: "cantidadProcesada",
      header: "Procesados",
      // filterFn: "includesString",
      size: 135,
    },
    {
      accessorKey: "label_condicion",
      header: "Destino",
      // filterFn: "includesString",
      size: 250,
    },
    {
      accessorKey: "estado",
      header: "ESTADO",
      size: 150,
    },
  ];
  let fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-power-off",
      label: "Aplicar",

      fn: (data) => {
        setOpenConfirma(true);
        setDataSeleccion(data);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-vials",
      label: "test",

      fn: (data) => {
        setOpen(true);
        setDataSeleccion(data);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-users",
      label: "Destinatarios",

      fn: (data) => {
        setOpenDestinatarios(true);
        setDataSeleccion(data);
      },
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={`difusion`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        where={[
          parentData
            ? ["idUsuario", "==", localStorage.getItem("usermod")]
            : ["usermod", "==", fuego.auth().currentUser?.uid],
        ]}
        gridOptions={{
          tableInstanceRef,

          // renderDetailPanel: ({ row }) => {
          //   return (

          //   );
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
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{ config: mod?.config, mod }}
        titulo={`DIFUSIONES`}
        Form={Form}
      />
      <TestDifusion data={dataSeleccion} open={open} setOpen={setOpen} />
      {openDestinatarios && (
        <FeedbackEnvios
          open={openDestinatarios}
          setOpen={setOpenDestinatarios}
          data={dataSeleccion}
        />
      )}
      <Dialogo
        callbackAcepta={enviarDifusion}
        open={openConfirma}
        setOpen={setOpenConfirma}
        titulo="Estas seguro de enviar la difusion?"
      />
    </>
  );
}
