import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { getFechaString } from "../../helpers/dates";
import { formatMoney } from "../../helpers/numbers";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
import { useState } from "react";
import ImpresionDialog from "../forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { QueryApi } from "@helpers/queryApi";
import { useRouter } from "next/router";
import Link from "next/link";
import { getModUsuario } from "@helpers/db";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const idPlantilla = mod.config?.plantillaAfiliacion;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const router = useRouter();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const modSocios = getModUsuario("socios");
  const getDetalleCobro = (row) => {
    if (!row.deudas || row.deudas.length === 0) return "-";
    return row.deudas
      .map((item) => `${item.label_idProducto} ${formatMoney(item.importe)}`)
      .reduce((n, p) => `${n} | ${p}`);
  };
  const getDetalleActividades = (row) => {
    if (!row.actividades) return "-";
    return row.actividades
      .map((item) => `${item.label_idActividad}`)
      .reduce((n, p) => `${n} | ${p}`);
  };

  let fnAcciones = {
    aplicar: (data) => {
      setDataConsulta({ url: "/api/afiliaciones/aplicar", data });
    },
    irSocio: (data) => {
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
        router.push("/mod/[id]", `/mod/${modSocios.id}`, {
          shallow: true,
        });
      } else alert("Debes Aplicarlo primero");
    },
    imprimir: (data) => {
      setOpenImpresion(true);
      setDataImpresion(data);
    },
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
      renderCell: (params) => getFechaString(params.value),
    },
    {
      field: "socio",
      headerName: "Socio",
      width: 190,
      renderCell: (params) =>
        `${params.value.apellido.toUpperCase()} ${params.value.nombre}`,
    },
    {
      field: "deudas",
      headerName: "Cobro",
      width: 450,
      renderCell: (params) => renderCellExpandData(params, getDetalleCobro),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];

  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        titulo={mod.label}
        subTitulo="al club"
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
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
