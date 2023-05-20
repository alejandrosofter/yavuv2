import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import { Grid, Stack } from "@mui/material";
import Input from "@components/forms/input";
import Switch from "@components/forms/switch";
import SelectorTipoComprobante from "./selectorTipoComprobantes";
import SelectorTipoDocumentos from "./selectorTipoDocumentos";
export default function Form({ mod, setFieldValue, values }) {
  return (
    <Grid spacing={2} container>
      <Grid item md={4}>
        <Input label="Nombre" campo="nombreTipoComprobante" />
      </Grid>
      <Grid item md={3}>
        <SelectEstaticFormik
          items={["ACTIVO", "INACTIVO"]}
          label="Estado"
          campo="estado"
        />
      </Grid>
      <Grid item md={3}>
        <SelectorTipoComprobante />
      </Grid>
      <Grid item md={3}>
        <SelectorTipoDocumentos />
      </Grid>
      <Grid item md={4}>
        <Switch campo="esFacturaElectronica" label="Es Factura Electronica" />
      </Grid>

      <Grid item md={2}>
        <Switch campo="esNotaCredito" label="Es Nota Credito" />
      </Grid>

      <Grid item md={2}>
        <Input campo="proximoNro" label="Proximo Nro" />
      </Grid>
      <Grid item md={2}>
        <Input campo="nroDocDefault" label="Nro Doc Default" />
      </Grid>
    </Grid>
  );
}
