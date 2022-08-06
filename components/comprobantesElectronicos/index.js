import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { contadorMoney } from "@helpers/arrays";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";

export default function Modulo({ mod }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [openImpresion, setOpenImpresion] = useState(false);
  const idPlantilla = mod.config?.planillaComprobanteDigital;

  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const order = ["fecha", "desc"];
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 100,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },

    {
      field: "razonSocial",
      headerName: "Razon Social",
      width: 200,
    },
    {
      field: "label_tipoComprobante",
      headerName: "Tipo Comprobante",
      width: 150,
    },

    {
      field: "nroCae",
      headerName: "CAE",
      width: 150,
    },
    {
      field: "items",
      headerName: "$ Importe",
      width: 100,
      renderCell: (params) => contadorMoney(params.value ? params.value : []),
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 100,
    },
  ];
  let fnAcciones = {
    compartir: (data) => {
      setOpenImpresion(true);
      setDataImpresion(data);
    },
  };
  return (
    <>
      <DataGridFirebase
        fnAcciones={fnAcciones}
        coleccion={mod.coleccion}
        titulo={mod.label}
        subTitulo=""
        icono={mod.icono}
        limit={10}
        mod={mod}
        acciones={mod.acciones}
        orderBy={order}
        columns={columns}
      />
      <ImpresionDialog
        titulo="IMPRESIÓN COMPROBANTE"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COMPROBANTE DIGITAL "
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