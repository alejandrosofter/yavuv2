import { formatMoney } from "@helpers/numbers";
import { getFechaString } from "@helpers/dates";
import Modelo, { valoresIniciales } from "@modelos/ModeloDebitoAutomatico";
import Form from "@components/debitoAutomatico/_form";
import { useState } from "react";
import Dialogo from "@components/forms/dialogo";
import ItemsDebitoAutomatico from "@components/debitoAutomatico/deudas";
import EnvioBanco from "@components/debitoAutomatico/envio";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import { getWherePermiso } from "@hooks/useUser";
import useLayout from "@hooks/useLayout";
export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [openDialogo, setOpenDialogo] = useState(false);
  const [openEnviar, setOpenEnviar] = useState(false);
  const [dataSeleccion, setDataSeleccion] = useState();
  const [openDeudas, setOpenDeudas] = useState();
  const order = ["fecha", "desc"];
  useLayout({
    label: "Debitos Automaticos",
    titulo: "DEBITOS",
    icon: "fas fa-money-check-alt",
    acciones: [
      {
        label: "Debitos",
        icono: "fas fa-money-check-alt",
        url: "/debitoAutomatico",
      },
    ],
  });
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 80,
      Cell: ({ cell }) => getFechaString(cell.getValue()),
    },
    {
      accessorKey: "label_tipoCuenta",
      header: "Tipo Cuenta",
      size: 120,
    },
    {
      accessorKey: "vtos",
      header: "VTOS",
      size: 230,
      Cell: ({ cell }) =>
        `1er ${getFechaString(cell.row.primerVto)} | 2do ${getFechaString(
          cell.row.segundoVto
        )} | 3er ${getFechaString(cell.row.tercerVto)} | `,
    },
    {
      accessorKey: "importeTotal",
      header: "$ Total",
      size: 120,
      Cell: ({ cell }) => formatMoney(cell.getValue()),
    },
    {
      accessorKey: "totalCobrado",
      header: "$ Cobrado",
      size: 120,
      Cell: ({ cell }) =>
        `${formatMoney(cell.getValue() ? cell.getValue() : 0)}`,
    },

    {
      accessorKey: "cantidadProcesada",
      header: "Procesados",
      size: 120,
    },
    {
      accessorKey: "cantidadDeudas",
      header: "Cant Deudas",
      size: 120,
      renderCell: (params) => `${params.value ? params.value : 0}`,
    },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 120,
    },
  ];

  let fnAcciones = [
    {
      esFuncion: true,
      // icono: "fas fa-play",
      label: "Deudas",

      fn: (data) => {
        setDataSeleccion(data);
        setOpenDeudas(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-download",
      label: "Descargar",

      fn: (data) => {
        setDataSeleccion(data);
        // descargo archivo con url
        window.open(data?.archivoBanco?.url, "_blank");
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-envelope",
      label: "Enviar",

      fn: (data) => {
        setDataSeleccion(data);
        setOpenEnviar(true);
      },
    },
  ];
  return (
    <>
      <ABMColeccion2
        coleccion={`debitoAutomatico`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        where={getWherePermiso("debitoAutomatico")}
        orderBy={order}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`DEBITOS AUTOMATICOS`}
        Form={Form}
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
