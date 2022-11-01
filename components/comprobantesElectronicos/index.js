import ABMColeccion from "@components/forms/ABMcollection";
import ImpresionDialog from "@components/forms/impresion";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { contadorMoney } from "@helpers/arrays";
import { getFechaString } from "@helpers/dates";
import { formatMoney } from "@helpers/numbers";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import Modelo, {
  valoresIniciales,
} from "@modelos/ModeloComprobantesElectronicos";
import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { fuego } from "@nandorojo/swr-firestore";
import Form from "./_form";
export default function Modulo({ mod, parentData = false }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [openImpresion, setOpenImpresion] = useState(false);
  const idPlantilla = mod.config?.planillaComprobanteDigital;

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
      field: "razonSocial",
      headerName: "Razon Social",
      width: 200,
    },
    // {
    //   field: "label_tipoComprobante",
    //   headerName: "Tipo Comprobante",
    //   width: 150,
    // },

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
  let fnAcciones = [
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

  return (
    <>
      <ABMColeccion
        coleccion={`comprobantesElectronicos`}
        columns={columns}
        hideNew={true}
        acciones={fnAcciones}
        orderBy={["fecha_timestamp", "desc"]}
        maxWidth="lg"
        where={[
          parentData
            ? ["idUsuario", "==", localStorage.getItem("usermod")]
            : ["usermod", "==", fuego.auth().currentUser?.uid],
        ]}
        // callbackclick={callbackclick}
        icono={"fas fa-users"}
        Modelo={Modelo}
        valoresIniciales={valoresIniciales}
        titulo={`COMPROBANTES ELECTRONICOS`}
        Form={Form}
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
