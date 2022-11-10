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
import { fuego } from "@nandorojo/swr-firestore";
import Form from "./_form";
import Dialogo from "@components/forms/dialogo";
export default function Modulo({ mod, parentData = false }) {
  const [dataConsulta, setDataConsulta] = useState();
  const [dataImpresion, setDataImpresion] = useState();
  const [openImpresion, setOpenImpresion] = useState(false);
  const idPlantilla = mod.config?.planillaComprobanteDigital;
  const plantillaEmail = mod.config?.emailComprobanteDigital;
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const getImporteTotal = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total +=
        Number(items[i].importe) * Number(items[i].cantidad) -
        Number(items[i].importeBonificacion ? items[i].importeBonificacion : 0);
    }
    return formatMoney(total);
  };
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 80,
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
      field: "email",
      headerName: "Email",
      width: 190,
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
      renderCell: (params) => getImporteTotal(params.value ? params.value : []),
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
      icono: "fas fa-file-invoice",
      label: "Subir AFIP",
      fn: (data) => {
        setDataConsulta({
          url: "/api/comprobantesElectronicos/subirAfip",
          data,
        });
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
        titulo="COMPARTIR COMPROBANTE"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COMPROBANTE DE PAGO"
        data={{ ...dataImpresion, email: dataImpresion?.email }}
        plantilla={plantilla}
        emailDefault={dataImpresion?.email}
        plantillaEmail={plantillaEmail}
        attachments={[{ filename: "COMPROBANTE.pdf", data: plantilla }]}
      />
      <QueryApi dataConsulta={dataConsulta} />
    </>
  );
}
