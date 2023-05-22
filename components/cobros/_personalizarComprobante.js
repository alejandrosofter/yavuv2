import DialogContenido from "@components/forms/dialogContenido";
import SelectTipoComprobante from "@components/comprobantesTipos/selector";
import SelectorTipoCliente from "@components/comprobantesElectronicos/selectorTipoCliente";
import SelectorTipoDocumentos from "@components/comprobantesTipos/selectorTipoDocumentos";
import SelectorTipoConceptos from "@components/comprobantesElectronicos/selectorTipoConceptos";
import { Button, Grid, Typography } from "@mui/material";
import Input from "@components/forms/input";
import { useEffect, useState } from "react";
import { getFieldName } from "@helpers/forms";
import Switch from "@components/forms/switch";
import SelectPuntoVenta from "@components/comprobantesElectronicos/selectorPuntoVenta";
export default function PersonalizarComprobante({
  setFieldValue,
  field,
  values,
  callbackchange,
}) {
  const [open, setOpen] = useState();

  useEffect(() => {
    loadValoresStorage();
  }, []);
  const cambiaPuntoVenta = (item) => {
    localStorage.setItem("comprobante_puntoVenta", item.value);
  };
  const guardaValoresStorage = () => {
    localStorage.setItem("esFiscal", values.esFiscal);
    localStorage.setItem(
      "comprobante_razonSocial",
      values.comprobante_razonSocial
    );
    localStorage.setItem(
      "comprobante_nroDocumento",
      values.comprobante_nroDocumento
    );
    localStorage.setItem("comprobante_domicilio", values.comprobante_domicilio);
    localStorage.setItem(
      "comprobante_tipoCliente",
      values.comprobante_tipoCliente
    );
    localStorage.setItem(
      "comprobante_tipoDocumento",
      values.comprobante_tipoDocumento
    );
    localStorage.setItem(
      "comprobante_tipoConcepto",
      values.comprobante_tipoConcepto
    );
    localStorage.setItem(
      "comprobante_puntoVenta",
      values.comprobante_puntoVenta
    );
    if (callbackchange) callbackchange();
  };
  const loadValoresStorage = () => {
    setFieldValue(
      getFieldName(field, "esFiscal"),
      localStorage.getItem("esFiscal")
    );
    setFieldValue(
      getFieldName(field, "comprobante_razonSocial"),
      localStorage.getItem("comprobante_razonSocial")
    );
    setFieldValue(
      getFieldName(field, "comprobante_nroDocumento"),
      localStorage.getItem("comprobante_nroDocumento")
    );
    setFieldValue(
      getFieldName(field, "comprobante_domicilio"),
      localStorage.getItem("comprobante_domicilio")
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoCliente"),
      localStorage.getItem("comprobante_tipoCliente")
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoDocumento"),
      localStorage.getItem("comprobante_tipoDocumento")
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoConcepto"),
      localStorage.getItem("comprobante_tipoConcepto")
    );
    setFieldValue(
      getFieldName(field, "comprobante_puntoVenta"),
      localStorage.getItem("comprobante_puntoVenta")
    );
  };
  const label = field
    ? eval(`values.${getFieldName(field, "comprobante_razonSocial")}`)
    : values.comprobante_razonSocial;

  return (
    <Grid container>
      {values.esFiscal && (
        <Grid item md={6}>
          <Button onClick={() => setOpen(true)}>
            {label ? label : "Seleccionar..."}
          </Button>
        </Grid>
      )}
      <Grid item md={6}>
        <Switch
          callbackChange={guardaValoresStorage}
          label="Es Fiscal?"
          campo="esFiscal"
        />
      </Grid>

      <DialogContenido
        titulo="COMPROBANTE ELECTRONICO"
        fullWidth={true}
        maxWidth="md"
        open={open}
        setOpen={setOpen}
      >
        <Grid spacing={2} container item>
          <Grid item md={12}>
            <Typography variant="h6">Personalizar Comprobante</Typography>
          </Grid>
          <Grid item md={6}>
            <Input
              onChange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_razonSocial")}
              label="Razon Social"
            />
          </Grid>
          <Grid item md={2}>
            <Input
              onChange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_nroDocumento")}
              label="Nro Doc."
            />
          </Grid>
          <Grid item md={4}>
            <Input
              onChange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_domicilio")}
              label="Domicilio"
            />
          </Grid>

          <Grid item md={4}>
            <SelectorTipoCliente
              callbackchange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_tipoCliente")}
            />
          </Grid>

          <Grid item md={3}>
            <SelectorTipoDocumentos
              callbackchange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_tipoDocumento")}
            />
          </Grid>

          <Grid item md={4}>
            <SelectorTipoConceptos
              callbackchange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_tipoConcepto")}
            />
          </Grid>
          <Grid item md={5}>
            <SelectPuntoVenta
              callbackchange={guardaValoresStorage}
              campo={getFieldName(field, "comprobante_puntoVenta")}
              label="Punto Venta"
            />
          </Grid>
        </Grid>
      </DialogContenido>
    </Grid>
  );
}
