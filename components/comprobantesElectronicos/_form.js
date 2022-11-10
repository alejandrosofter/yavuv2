import { Form } from "formik";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab, Icon } from "@mui/material";
import Input from "../forms/input";
import Modelo, {
  valoresInicialesItems,
  ModeloItems,
} from "@modelos/ModeloComprobantesElectronicos";

import ItemsModulo from "@components/forms/itemsModulo";
import FormItem from "./_formItem";
import { formatMoney } from "@helpers/numbers";
import SelectFecha from "@components/forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import Select2 from "@components/forms/select2Formik";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { getFechaString } from "@helpers/dates";
import SelectorTipoComprobante from "@components/comprobantesTipos/selector";
import SelectorTipoConceptos from "./selectorTipoConceptos";
import SelectorTipoDocumentos from "@components/comprobantesTipos/selectorTipoDocumentos";
import SelectorTipoCliente from "./selectorTipoCliente";
import SelectorComprobantes from "./selectorComprobantes";
export default function FormComprobantesElectronicos({
  values,
  setFieldValue,
  mod,
  esNuevo,
}) {
  console.log(values);
  const cambiaTipoComprobante = (item, row) => {
    if (!item) return;
    console.log(item, row);
    setFieldValue("esNotaCredito", row.esNotaCredito ? true : false);
    setFieldValue("CbteTipo", row.tipoComprobanteFiscal);
  };
  const cambiaTipoCliente = (data) => {
    // if (!data && esNuevo) {
    //   setFieldValue("razonSocial", "");
    //   setFieldValue("nroDocumento", "");
    //   setFieldValue("tipoDocumentoFiscal", "");
    //   setFieldValue("nroDocumentoFiscal", "");
    //   setFieldValue("domicilio", "");
    //   setFieldValue("tipoComprobante", null);
    //   return;
    // }
    // const value = data.value;
    // switch (value) {
    //   case "RESPONSABLE INSCRIPTO": {
    //     break;
    //   }
    //   case "CONSUMIDOR FINAL": {
    //     setFieldValue("razonSocial", "CONSUMIDOR FINAL");
    //     setFieldValue("nroDocumento", "0");
    //     setFieldValue("tipoDocumentoFiscal", "99");
    //     setFieldValue("nroDocumentoFiscal", "0");
    //     setFieldValue("domicilio", "-");
    //     setFieldValue(
    //       "label_tipoComprobante",
    //       mod.config?.label_tipoComprobanteConsumidorFinal
    //     );
    //     setFieldValue(
    //       "tipoComprobante",
    //       mod.config?.tipoComprobanteConsumidorFinal
    //     );
    //     break;
    //   }
    //   case "EXENTO": {
    //     break;
    //   }
    // }
  };
  return (
    <Grid
      sx={{ pt: 4 }}
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
    >
      <Grid item md={2}>
        <SelectFecha label="Fecha" campo="fecha" />
      </Grid>
      <Grid item md={2}>
        <SelectorTipoCliente callbackchange={cambiaTipoCliente} />
      </Grid>
      <Grid item md={3}>
        <SelectorTipoComprobante
          callbackchange={cambiaTipoComprobante}
          soloElectronicas={true}
        />
      </Grid>
      {values.esNotaCredito && (
        <Grid item md={3}>
          <SelectorComprobantes />
        </Grid>
      )}
      <Grid item md={4}>
        <Input campo="razonSocial" label="Razon Social" />
      </Grid>
      <Grid item md={2}>
        <SelectorTipoDocumentos />
      </Grid>
      <Grid item md={2}>
        <Input campo="nroDocumento" label="nroDocumento" />
      </Grid>
      <Grid item md={3}>
        <Input campo="domicilio" label="Domicilio" />
      </Grid>
      <Grid item md={2}>
        <SelectorTipoConceptos />
      </Grid>
      <Grid item md={2}>
        <SelectEstaticFormik
          items={["PENDIENTE", "CANCELADO", "AUTORIZADO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <Input campo="email" label="Email" />
      </Grid>
      <Grid item md={3}>
        <Input campo="telefono" label="Telefono" />
      </Grid>
      <Grid item xs={12}>
        <ItemsModulo
          setFieldValue={setFieldValue}
          campo="items"
          data={values?.items}
          modelo={ModeloItems}
          nombreModulo="ITEMS"
          fullWidth={true}
          maxWidth={"md"}
          textoEditar={`Puedes cambiar los items:`}
          textoAgregar={`Ingrese los datos del item`}
          valoresIniciales={valoresInicialesItems}
          form={<FormItem />}
          dataModulo={[]}
          columnas={[
            {
              field: "cantidad",
              headerName: "Cantidad",
              editable: false,
              width: 100,
            },

            {
              field: "detalle",
              headerName: "Detalle",
              editable: false,
              width: 380,
              renderCell: (params) =>
                `${params.row.label_idProducto} ${
                  params.row.detalle ? `(${params.row.detalle})` : ``
                }`,
            },
            {
              field: "importe",
              headerName: "$ Unidad",
              width: 80,
              renderCell: (params) => formatMoney(params.value),
            },
            {
              field: "importeBonificacion",
              headerName: "$ Bonif.",
              width: 80,
              renderCell: (params) => formatMoney(params.value),
            },
            {
              field: "total",
              headerName: "$ Total",
              width: 80,
              renderCell: (params) =>
                formatMoney(
                  (params.row.cantidad * params.row.importe).toFixed(2)
                ),
            },
          ]}
        />
      </Grid>
    </Grid>
  );
}
