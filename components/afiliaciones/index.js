import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { getFechaString } from "../../helpers/dates";
import { formatMoney } from "../../helpers/numbers";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
import { useState } from "react";
import ImpresionDialog from "../forms/impresion";
// import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { QueryApi } from "@helpers/queryApi";
import { useRouter } from "next/router";

import { addQueryApi, getModUsuario } from "@helpers/db";
import { UsePlantilla2 } from "@components/plantillas/usePlantilla2";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const idPlantilla = mod.config?.plantillaAfiliacion;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
  const router = useRouter();
  const [plantilla, setPlantilla] = UsePlantilla2({
    id: idPlantilla,
    data: dataImpresion,
  });
  const modSocios = getModUsuario("socios", localStorage.getItem("usermod"));
  const getDetalleCobro = (row) => {
    if (!row.deudas || row.deudas.length === 0) return "-";
    return row.deudas
      .map((item) => `${item.label_idProducto} ${formatMoney(item.importe)}`)
      .reduce((n, p) => `${n} | ${p}`);
  };

  let fnAcciones = {
    aplicar: (data) => {
      // setDataConsulta({ url: "/api/afiliaciones/aplicar", data });
      addQueryApi("aplicarAfiliacion", data);
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
      field: "id",
      headerName: "id",
      width: 170,
      // renderCell: (params) => getFechaString(params.value, `DD/MM | hh:mm`),
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => getFechaString(params.value, `DD/MM | hh:mm`),
    },
    {
      field: "nroSocio",
      headerName: "Nro Socio",
      width: 90,
      renderCell: (params) => `${params.row.socio.nroSocio}`.padStart(5, "0"),
    },
    {
      field: "socio",
      headerName: "Nombre/s",
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
        limit={100}
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
