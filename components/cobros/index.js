import DataGridFirebase from "../forms/datagrid/dataGridFirebase";
import { getFechaString } from "../../helpers/dates";
import { formatMoney } from "../../helpers/numbers";
import { renderCellExpandData } from "../forms/datagrid/renderCellExpand";
import ImpresionDialog from "@components/forms/impresion";
import { useState } from "react";
import { UsePlantilla } from "@components/plantillas/usePlantilla";
import { Button, Grid, Typography } from "@mui/material";
import { parse } from "handlebars";
import CajaDelDia from "./cajaDelDia";
import { fuego } from "@nandorojo/swr-firestore";
import Modelo, { valoresIniciales } from "@modelos/ModeloCobros";
import ABMColeccion from "@components/forms/ABMcollection";
import Form from "./_form";
export default function Modulo({ mod, parentData }) {
  const idPlantilla = mod.config?.plantillaCobro;
  const plantillaEmail = mod.config?.plantillaMail;
  const [openImpresion, setOpenImpresion] = useState(false);
  const [dataImpresion, setDataImpresion] = useState();
  const [socio, setSocio] = useState();
  const [openCajaDelDia, setOpenCajaDelDia] = useState(false);
  const [dataConsulta, setDataConsulta] = useState();
  const [plantilla, setPlantilla] = UsePlantilla({
    id: idPlantilla,
    data: dataImpresion,
  });
  const fnLabelDetalle = (item, nro) => {
    const bonif = Number(
      item.importeBonificacion ? item.importeBonificacion : 0
    );
    const importe = (item.importe * item.cantidad - bonif).toFixed(2);
    const hijo = item.hijo
      ? ` (${item.hijo.apellido.toUpperCase()} ${item.hijo.nombre})`
      : "";
    return `${nro}.- ${getFechaString(item.fechaVto)} - ${
      item.label_idProducto
    }  ${item.detalle ? item.detalle : ""} ${hijo} $${importe}, `;
  };
  const getDetalle = (row) => {
    const items = row.deudas;
    let aux = "";
    if (items)
      for (let i = 0; i < items.length; i++) {
        aux += fnLabelDetalle(items[i], i + 1);
      }
    //return parse html
    parse;
    return aux;
  };
  const setSocioCobro = async (row) => {
    const { cliente } = row;
    fuego.db
      .collection("socios")
      .doc(cliente)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setSocio(doc.data());
      });
  };
  let fnAcciones = [
    {
      esFuncion: true,
      icono: "fas fa-share-alt",
      label: "Compartir",

      fn: (data) => {
        setOpenImpresion(true);
        setSocioCobro(data);
        setDataImpresion(data);
      },
    },
    // {
    //   esFuncion: true,
    //   icono: "fas fa-users",
    //   label: "Inscriptos",

    //   fn: (data) => {
    //     setOpenCajaDelDia(true);
    //   },
    // },
  ];
  const columns = [
    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
      renderCell: (params) => {
        return getFechaString(params.value, "DD/MM | hh:mm");
      },
    },
    {
      field: "label_cliente",
      headerName: "Cliente",
      width: 250,
    },
    {
      field: "deudas",
      headerName: "Detalle",
      width: 300,
      renderCell: (params) => renderCellExpandData(params, getDetalle),
    },
    {
      field: "importe",
      headerName: "$ Importe",
      width: 120,
      renderCell: (params) => {
        return formatMoney(params.value);
      },
    },
    {
      field: "importeBonificacion",
      headerName: "$ Bonif.",
      width: 150,
      renderCell: (params) => {
        return formatMoney(params.value);
      },
    },
    {
      field: "importePaga",
      headerName: "$ Paga.",
      width: 150,
      renderCell: (params) => {
        return formatMoney(params.value);
      },
    },
  ];

  return (
    <Grid container>
      <Grid item md={10}></Grid>
      <Grid item md={2}>
        <Button variant="contained" onClick={() => setOpenCajaDelDia(true)}>
          Caja del dia
        </Button>
      </Grid>
      <ABMColeccion
        coleccion={`cobros`}
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
        limit={100}
        valoresIniciales={valoresIniciales}
        titulo={`COBROS`}
        Form={Form}
      />
      <ImpresionDialog
        titulo="PANEL COMPARTIR COBRO"
        setOpen={setOpenImpresion}
        open={openImpresion}
        asunto="COMPROBANTE DE PAGO"
        data={{ ...dataImpresion, socio, email: socio?.email }}
        plantilla={plantilla}
        emailDefault={socio?.email}
        plantillaEmail={plantillaEmail}
        attachments={[{ filename: "COBRO.pdf", data: plantilla }]}
      />
      <CajaDelDia open={openCajaDelDia} setOpen={setOpenCajaDelDia} />
    </Grid>
  );
}
