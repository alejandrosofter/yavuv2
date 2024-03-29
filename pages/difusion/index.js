import { getFechaString } from "@helpers/dates";
import { useRef, useState } from "react";
import { TestDifusion } from "@components/difusion/test";
import ABMColeccion from "@components/forms/ABMcollection2";
import Modelo, { valoresIniciales } from "@modelos/ModeloDifusion";
import Form from "@components/difusion/_form";
import Dialogo from "@components/forms/dialogo";
import { addQueryApi } from "@helpers/db";
import { FeedbackEnvios } from "@components/difusion/feedbackEnvios";
import { getWherePermiso } from "@hooks/useUser";
import useLayout from "@hooks/useLayout";
import { UseConfigModulo } from "@helpers/useConfigModulo";
export default function Modulo({}) {
  useLayout({
    label: "Difusiones",
    titulo: "DIFUSIONES",
    icon: "fas fa-bullhorn",
    acciones: [
      {
        label: "Difusiones",
        icono: "fas fa-bullhorn",
        url: "/difusion",
      },
    ],
  });
  const order = ["fecha", "desc"];
  const [open, setOpen] = useState(false);
  const [openDestinatarios, setOpenDestinatarios] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [openConfirma, setOpenConfirma] = useState();
  const tableInstanceRef = useRef();
  const config = UseConfigModulo("difusion");
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
        where={getWherePermiso("difusion")}
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
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{ config }}
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
