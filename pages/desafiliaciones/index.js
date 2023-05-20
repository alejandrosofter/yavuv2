import DataGridFirebase from "@components/forms/datagrid/dataGridFirebase";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "../../helpers/numbers";
import { renderCellExpandData } from "@components/forms/datagrid/renderCellExpand";
import { useState } from "react";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { QueryApi } from "@helpers/queryApi";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const idPlantilla = mod.config?.plantillaAfiliacion;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [dataConsulta, setDataConsulta] = useState();
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
  const getDetalleActividades = (row) => {
    if (!row.actividades) return "-";
    return row.actividades
      .map((item) => `${item.label_idActividad}`)
      .reduce((n, p) => `${n} | ${p}`);
  };

  let fnAcciones = {
    aplicar: (data) => {
      setDataConsulta({ url: "/api/desafiliaciones/aplicar", data });
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
      field: "label_socio",
      headerName: "Socio",
      width: 300,
    },
    {
      field: "label_motivo",
      headerName: "Motivo",
      width: 280,
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
        titulo="IMPRESIÓN DESAFILIACIÓN"
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
