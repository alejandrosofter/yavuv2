import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { useState } from "react";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { QueryApi } from "@helpers/queryApi";
import { useRouter } from "next/router";
import Modelo, { valoresIniciales } from "@modelos/ModeloAfiliados";
import Form from "@components/afiliaciones/_form";
import { addQueryApi, getModUsuario } from "@helpers/db";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { getWherePermiso } from "@hooks/useUser";
import ABMColeccion2 from "@components/forms/ABMcollection2";
import useLayout from "@hooks/useLayout";
// import { UsePlantilla2 } from "@components/plantillas/usePlantilla2";
export default function Modulo({}) {
  const order = ["fecha", "desc"];
  const config = UseConfigModulo("afiliaciones");
  const idPlantilla = config?.plantillaAfiliacion;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const router = useRouter();
  useLayout({
    label: "Afiliaciones",
    titulo: "AFILIACIONES",
    icon: "fas fa-address-book",
    acciones: [
      {
        label: "Afiliaciones",
        icono: "fas fa-address-book",
        url: "/afiliaciones",
      },
      {
        label: "Informes",
        icono: "fas fa-newspaper",
        url: "/afiliaciones/informe",
      },
    ],
  });
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });

  const getDetalleCobro = (row) => {
    if (!row.deudas || row.deudas.length === 0) return "-";
    return row.deudas
      .map((item) => `${item.label_idProducto} ${formatMoney(item.importe)}`)
      .reduce((n, p) => `${n} | ${p}`);
  };

  let fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-play",
      label: "Aplicar Afiliacion",

      fn: (data) => {
        addQueryApi("aplicarAfiliacion", data);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-user",
      label: "Ir a socio",

      fn: (data) => {
        if (data.idSocio) {
          localStorage.setItem(
            "socioSeleccion",
            JSON.stringify({
              objectID: data.idSocio,
              apellido: data.apellido,
              nombre: data.nombre,
              dni: data.dni,
              estado: data.estado,
              nroSocio: data.nroSocio,
            })
          );
          router.push(`/socios`, {
            shallow: true,
          });
        } else alert("Debes Aplicarlo primero");
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",

      fn: (data) => {
        setOpenImpresion(true);
        setDataImpresion(data);
      },
    },
  ];
  const columns = [
    {
      accessorKey: "fecha",
      header: "Fecha",
      size: 100,
      Cell: ({ cell }) => {
        return getFechaString(cell.getValue(), "DD/MM | hh:mm");
      },
    },
    {
      accessorKey: "nroSocio",
      header: "Nro Socio",
      size: 90,
      Cell: ({ cell }) =>
        `${cell.row.original.socio.nroSocio}`.padStart(5, "0"),
    },
    {
      accessorKey: "socio",
      header: "Nombre/s",
      size: 190,
      Cell: ({ cell }) =>
        `${cell.getValue().apellido.toUpperCase()} ${cell.getValue().nombre}`,
    },
    // {
    //   accessorKey: "deudas",
    //   header: "Cobro",
    //   size: 450,
    //   Cell: ({ cell }) =>
    //     renderCellExpandData(cell.row.original, getDetalleCobro),
    // },
    {
      accessorKey: "estado",
      header: "Estado",
      size: 100,
    },
  ];

  return (
    <>
      <ABMColeccion2
        coleccion={`afiliaciones`}
        columns={columns}
        acciones={fnAcciones}
        maxWidth={"lg"}
        where={getWherePermiso("afiliaciones")}
        orderBy={order}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        dataForm={{}}
        titulo={`AFILIACIONES`}
        Form={Form}
      />
      <ImpresionDialog
        titulo="IMPRESIÓN AFILIACIÓN"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="AFILIACIÓN "
        data={dataImpresion}
        plantilla={plantilla}
        emailDefault={dataImpresion?.socio?.email}
        nombrePlantillaEmail="emailAfiliacion"
        attachments={[{ filename: "AFILIACION.pdf", data: plantilla }]}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
