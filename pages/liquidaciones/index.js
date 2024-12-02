import { getFechaString } from "@helpers/dates";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import Modelo, { valoresIniciales } from "@modelos/ModeloLiquidaciones";
import Form from "@components/facturadorPacientes/_formLiquidaciones";
import ABMColeccion from "@components/forms/ABMcollection";
import useLayout from "@hooks/useLayout";
import { formatMoney } from "@helpers/numbers";
import ImpresionDialog from "@components/forms/impresion";
import { UseConfigModulo } from "@helpers/useConfigModulo";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { useCollection, fuego, useDocument } from "@nandorojo/swr-firestore";
import Dialogo from "@components/forms/dialogo";
export default function Modulo({ mod }) {
  const order = ["fecha", "desc"];
  const [dataImpresion, setDataImpresion] = useState(null);
  const [openImpresion, setOpenImpresion] = useState();
  const [openDialogo, setOpenDialogo] = useState(false);
  const config = UseConfigModulo("pacientes");
  const { data: enteFacturador } = useDocument(
    `/entesFacturadores/${dataImpresion?.idEnteFacturador}`,

    {
      listen: true,
    }
  );
  const { add } = useCollection(`descargas`);

  const listarLiquidacion = (values) => {
    const data = {
      coleccion: `recetasLiquidaciones`,
      token: fuego.auth().currentUser.uid,
      titulo: "INFORME DE LIQUIDACION",
      tk: new Date().getTime(),
      idLiquidacion: values?.id,
      label_idEnteFacturador: values?.label_idEnteFacturador,
      idEnteFacturador: values?.idEnteFacturador,
      idUsuario: fuego.auth().currentUser.uid,
      usermod: fuego.auth().currentUser.uid,
    };
    add(data).then((res) => {
      setOpenDialogo(true);
    });
  };
  const [plantilla, setPlantilla] = UsePlantilla({
    id: enteFacturador?.plantillaLiquidaciones,
    data: dataImpresion,
  });
  useLayout({
    label: "Facturacion",
    titulo: "FACTURACION",
    acciones: [
      {
        label: `facturacion`,
        icono: "fas fa-file-invoice-dollar",
        url: `/facturacion`,
      },
      {
        label: "Liquidaciones",
        icono: "fas fa-money-check",
        url: "/liquidaciones",
      },
      { label: "Pacientes", icono: "fas fa-user", url: "/pacientes" },
    ],
  });
  const acciones = [
    {
      esFuncion: true,
      icono: "fas fa-print",
      label: "Imprimir",
      fn: (row) => {
        setDataImpresion(row);
        setOpenImpresion(true);
      },
    },
    {
      esFuncion: true,
      icono: "fas fa-file-excel",
      label: "Exportar Excel",
      fn: (row) => {
        setDataImpresion(row);
        listarLiquidacion(row);
      },
    },
  ];
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 90,
      renderCell: (params) => getFechaString(params.value ? params.value : ""),
    },
    {
      field: "cantidadItems",
      headerName: "Items procesados",
      width: 120,
    },
    {
      field: "label_idEnteFacturador",
      headerName: "Ente Facturador",
      width: 320,
    },
    {
      field: "importeTotal",
      headerName: "$ Total",
      width: 100,
      renderCell: (params) => formatMoney(params.value),
    },
  ];
  return (
    <>
      <ABMColeccion
        coleccion={"recetasLiquidaciones"}
        label={"Liquidaciones"}
        Modelo={Modelo}
        Form={Form}
        hideNew={true}
        valoresIniciales={valoresIniciales}
        titulo={`Liquidaciones`}
        subTitulo="de facturaciones"
        parentData={true}
        icono={`fas fa-money-check`}
        limit={10}
        acciones={acciones}
        orderBy={order}
        columns={columns}
      />
      <ImpresionDialog
        titulo="IMPRESIÓN LIQUIDACION"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="FACTURACION "
        plantillaEmail={enteFacturador?.plantillaLiquidaciones}
        attachments={[{ filename: "LIQUIDACION.pdf", data: plantilla }]}
        data={dataImpresion}
        plantilla={plantilla}
      />
      <Dialogo
        open={openDialogo}
        setOpen={setOpenDialogo}
        icon="fas fa-file-excel"
        titulo={"GENERANDO INFORME"}
        detalle="Aguarde, se esta realizando el informe en segundo plano.. Una vez generado, podra descargarlo DESDE EL MENU NOTIFICACIONES -icono superior derecha- (dependiendo de la cantidad de registros puede tardar mas o menos)"
      />
    </>
  );
}
