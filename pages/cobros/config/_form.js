import SelectPlantilla from "@pages/plantillas/selectPlantilla";
import Switch from "@components/forms/switch";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import SelectProductos from "@pages/productos/selectProducto";
import { Typography } from "@mui/material";
import SelectTipoComprobante from "@pages/comprobantesTipos/selector";
import SelectorTipoCliente from "@pages/comprobantesElectronicos/selectorTipoCliente";
import SelectorTipoDocumentos from "@pages/comprobantesTipos/selectorTipoDocumentos";
import SelectorTipoConceptos from "@pages/comprobantesElectronicos/selectorTipoConceptos";
export default function FormConfig({}) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Otras",
          nro: 0,
          vista: (
            <Grid spacing={2} container>
              <Grid item md={5}>
                <Input campo="coleccionClientes" label="Coleccion Clientes" />
              </Grid>
              <Grid item md={5}>
                <Input campo="maximoConfirma" label="$ MAX Confirma" />
              </Grid>
              <Grid item md={5}>
                <Switch campo="imprimirAlcrear" label="Imprimir al crear" />
              </Grid>
              <Grid item md={5}>
                <Switch
                  campo="mostrarAddCliente"
                  label="Mostrar agregar Cliente"
                />
              </Grid>
              <Grid item md={5}>
                <SelectTipoComprobante
                  label="Tipo comprobante NO FISCAL"
                  campo="tipoComprobanteNoFiscal"
                />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Impresiones",
          nro: 1,
          vista: (
            <Grid container>
              <Grid item md={8}>
                <SelectPlantilla
                  campo="plantillaCobro"
                  label="Plantilla Cobro"
                />
              </Grid>
              <Grid item md={8}>
                <SelectPlantilla campo="plantillaMail" label="Plantilla Mail" />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Comprobante DEFECTO",
          nro: 2,
          vista: (
            <Grid spacing={2} container>
              {/* <Grid item md={3}>
                <Switch
                  campo="fiscalTildadoDefault"
                  label="Fiscal Tildado (default)"
                />
              </Grid> */}
              <Grid item md={3}>
                <Input campo="comprobante_razonSocial" label="Razon Social" />
              </Grid>
              <Grid item md={3}>
                <Input campo="comprobante_nroDocumento" label="Nro Doc." />
              </Grid>
              <Grid item md={5}>
                <SelectorTipoCliente campo="comprobante_tipoCliente" />
              </Grid>

              <Grid item md={3}>
                <SelectTipoComprobante campo="comprobante_tipoComprobante" />
              </Grid>

              <Grid item md={2}>
                <SelectorTipoDocumentos campo="comprobante_tipoDocumento" />
              </Grid>

              <Grid item md={3}>
                <Input campo="comprobante_domicilio" label="Domicilio" />
              </Grid>

              <Grid item md={2}>
                <SelectorTipoConceptos campo="comprobante_tipoConcepto" />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
