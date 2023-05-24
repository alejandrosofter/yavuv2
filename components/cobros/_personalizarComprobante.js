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
import { UseConfigModulo } from "@helpers/useConfigModulo";

export default function PersonalizarComprobante({
  setFieldValue,
  field,
  values,
  callbackchange,
}) {
  const [open, setOpen] = useState();
  const config = UseConfigModulo("cobros");
  useEffect(() => {
    if (config) loadValoresStorage(config);
  }, [config]);
  const cambiaPuntoVenta = (item) => {
    localStorage.setItem("comprobante_puntoVenta", item.value);
  };
  const guardaValoresStorage = () => {
    localStorage.setItem("esFiscal", values.esFiscal);
    localStorage.setItem(
      "comprobante_razonSocial",
      values.comprobante_razonSocial
    );
    if (callbackchange) callbackchange();
  };
  const loadValoresStorage = (config) => {
    setFieldValue(
      getFieldName(field, "esFiscal"),
      localStorage.getItem("esFiscal")
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoComprobante"),
      config["comprobante_tipoComprobante"]
    );
    setFieldValue(
      getFieldName(field, "comprobante_razonSocial"),
      config["comprobante_razonSocial"]
    );
    setFieldValue(
      getFieldName(field, "comprobante_nroDocumento"),
      config["comprobante_nroDocumento"]
    );
    setFieldValue(
      getFieldName(field, "comprobante_domicilio"),
      config["comprobante_domicilio"]
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoCliente"),
      config["comprobante_tipoCliente"]
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoDocumento"),
      config["comprobante_tipoDocumento"]
    );
    setFieldValue(
      getFieldName(field, "comprobante_tipoConcepto"),
      config["comprobante_tipoConcepto"]
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
          <Grid item md={5}>
            <SelectTipoComprobante campo="comprobante_tipoComprobante" />
          </Grid>
          <Grid item md={3}>
            <SelectorTipoDocumentos
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
              campo={getFieldName(field, "comprobante_puntoVenta")}
              label="Punto Venta"
              callbackchange={cambiaPuntoVenta}
            />
          </Grid>
        </Grid>
      </DialogContenido>
    </Grid>
  );
}
