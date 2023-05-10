import DialogContenido from "@components/forms/dialogContenido";
import SelectTipoComprobante from "@components/comprobantesTipos/selector";
import SelectorTipoCliente from "@components/comprobantesElectronicos/selectorTipoCliente";
import SelectorTipoDocumentos from "@components/comprobantesTipos/selectorTipoDocumentos";
import SelectorTipoConceptos from "@components/comprobantesElectronicos/selectorTipoConceptos";
import { Button, Grid, Typography } from "@mui/material";
import Input from "@components/forms/input";
import { useEffect, useState } from "react";
import { getFieldName } from "@helpers/forms";
import Switch from "../forms/switch";
import SelectPuntoVenta from "@components/comprobantesElectronicos/selectorPuntoVenta";
export default function PersonalizarComprobante({
  setFieldValue,
  field,
  values,
  callbackchange,
}) {
  const [open, setOpen] = useState();

  useEffect(() => {
    setFieldValue(
      getFieldName(field, "comprobante_puntoVenta"),
      localStorage.getItem("comprobante_puntoVenta")
    );
  }, []);
  const cambiaPuntoVenta = (item) => {
    localStorage.setItem("comprobante_puntoVenta", item.value);
  };
  const cambiaTipo = (item) => {
    setFieldValue(getFieldName(field, `label_tipoComprobante`), item.label);
  };
  const cambiaDocumento = (item) => {
    setFieldValue(getFieldName(field, "label_tipoDocumento"), item.label);
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
        <Switch label="Es Fiscal?" campo="esFiscal" />
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
              campo={getFieldName(field, "comprobante_razonSocial")}
              label="Razon Social"
            />
          </Grid>
          <Grid item md={2}>
            <Input
              campo={getFieldName(field, "comprobante_nroDocumento")}
              label="Nro Doc."
            />
          </Grid>
          <Grid item md={4}>
            <Input
              campo={getFieldName(field, "comprobante_domicilio")}
              label="Domicilio"
            />
          </Grid>

          <Grid item md={4}>
            <SelectorTipoCliente
              campo={getFieldName(field, "comprobante_tipoCliente")}
            />
          </Grid>

          <Grid item md={3}>
            <SelectorTipoDocumentos
              callbackchange={cambiaDocumento}
              campo={getFieldName(field, "comprobante_tipoDocumento")}
            />
          </Grid>

          <Grid item md={4}>
            <SelectorTipoConceptos
              campo={getFieldName(field, "comprobante_tipoConcepto")}
            />
          </Grid>
          <Grid item md={5}>
            <SelectPuntoVenta
              callbackchange={cambiaPuntoVenta}
              campo={getFieldName(field, "comprobante_puntoVenta")}
              label="Punto Venta"
            />
          </Grid>
        </Grid>
      </DialogContenido>
    </Grid>
  );
}
