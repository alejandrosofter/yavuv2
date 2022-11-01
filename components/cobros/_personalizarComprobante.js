import DialogContenido from "@components/forms/dialogContenido";
import SelectTipoComprobante from "@components/comprobantesTipos/selector";
import SelectorTipoCliente from "@components/comprobantesElectronicos/selectorTipoCliente";
import SelectorTipoDocumentos from "@components/comprobantesTipos/selectorTipoDocumentos";
import SelectorTipoConceptos from "@components/comprobantesElectronicos/selectorTipoConceptos";
import { Grid, Typography } from "@mui/material";
import Input from "@components/forms/input";
import { useEffect } from "react";
export default function PersonalizarComprobante({
  open,
  setOpen,
  setFieldValue,
}) {
  const cambiaTipo = (item) => {
    setFieldValue("label_tipoComprobante", item.label);
  };
  const cambiaDocumento = (item) => {
    setFieldValue("label_tipoDocumento", item.label);
  };
  return (
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
          <Input campo="comprobante_razonSocial" label="Razon Social" />
        </Grid>
        <Grid item md={2}>
          <Input campo="comprobante_nroDocumento" label="Nro Doc." />
        </Grid>
        <Grid item md={4}>
          <Input campo="comprobante_domicilio" label="Domicilio" />
        </Grid>
        <Grid item md={4}>
          <SelectTipoComprobante
            callbackchange={cambiaTipo}
            campo="comprobante_tipoComprobante"
          />
        </Grid>

        <Grid item md={4}>
          <SelectorTipoCliente campo="comprobante_tipoCliente" />
        </Grid>

        <Grid item md={3}>
          <SelectorTipoDocumentos
            callbackchange={cambiaDocumento}
            campo="comprobante_tipoDocumento"
          />
        </Grid>

        <Grid item md={4}>
          <SelectorTipoConceptos campo="comprobante_tipoConcepto" />
        </Grid>
      </Grid>
    </DialogContenido>
  );
}
