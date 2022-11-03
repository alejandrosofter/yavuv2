import SelectPlantilla from "@components/plantillas/selectPlantilla";
import Switch from "@components/forms/switch";

import TabsFormik, { TabPanel } from "@components/forms/tab";
import Grid from "@mui/material/Grid";
import Input from "@components/forms/input";
import SelectProductos from "@components/productos/selectProducto";
import { Button, Typography } from "@mui/material";
import SelectTipoComprobante from "@components/comprobantesTipos/selector";
import SelectFecha from "@components/forms/selectorFecha";
import { QueryApi } from "@helpers/queryApi";
import { useState } from "react";
import { fuego } from "@nandorojo/swr-firestore";
import UploadAnyFormik from "@components/forms/fileAnyUploadFormik";
import SelectTipoComprobantes from "@components/comprobantesTipos/selector";
export default function FormConfig({ values }) {
  const [dataConsulta, setDataConsulta] = useState();

  console.log(values);
  const clickPedido = () => {
    const data = { idUsuario: fuego.auth().currentUser.uid };

    setDataConsulta({
      url: "/api/comprobantesElectronicos/pedidoAfip",
      data,
    });
  };
  const clickAsentar = () => {
    const data = {
      idUsuario: fuego.auth().currentUser.uid,
      fechaVto: values.fechaVto,
      nroPuntoVenta: values.nroPuntoVenta,
      cuit: values.cuit,
    };
    console.log(data);
    setDataConsulta({
      url: "/api/comprobantesElectronicos/asentar",
      data,
    });
  };
  const clickDescargarPedido = () => {
    window.open(values.dataCrt.url, "_ blank");
  };
  const clickBorrarPedido = () => {
    const data = { idUsuario: fuego.auth().currentUser.uid };

    setDataConsulta({
      url: "/api/comprobantesElectronicos/borrarPedidoAfip",
      data,
    });
  };
  const clickTest = () => {
    const data = { idUsuario: fuego.auth().currentUser.uid };

    setDataConsulta({
      url: "/api/comprobantesElectronicos/test",
      data,
    });
  };
  const clickSync = () => {
    const data = { idUsuario: fuego.auth().currentUser.uid };

    setDataConsulta({
      url: "/api/comprobantesElectronicos/sync",
      data,
    });
  };
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "GRALES",
          nro: 0,
          vista: (
            <Grid spacing={2} container>
              <Grid item md={4}>
                <SelectTipoComprobantes
                  campo="tipoComprobanteConsumidorFinal"
                  label="Tipo Consumidor Final"
                />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "AFIP",
          nro: 1,
          vista: (
            <Grid spacing={2} container>
              <QueryApi dataConsulta={dataConsulta} />
              <Grid item md={3}>
                <SelectFecha label="Fecha VTO" campo="fechaVto" />
              </Grid>
              <Grid item md={2}>
                <Input label="CUIT" campo="cuit" />
              </Grid>
              <Grid item md={2}>
                <Input label="Nro Punto Venta" campo="nroPuntoVenta" />
              </Grid>
              {!values.dataCrt && (
                <Grid item md={3}>
                  <Button
                    onClick={clickPedido}
                    variant="contained"
                    color="primary"
                  >
                    Generar ARCHIVO PARA AFIP (pedido)
                  </Button>
                </Grid>
              )}
              {values.dataCrt && (
                <Grid item alignItems={"self-end"} md={12}>
                  <Button
                    onClick={clickBorrarPedido}
                    variant="contained"
                    color="secondary"
                  >
                    Borrar ARCHIVO PARA AFIP (pedido)
                  </Button>
                </Grid>
              )}
              {!values.certificado && (
                <Grid item md={3}>
                  <Button
                    onClick={clickDescargarPedido}
                    variant="contained"
                    color="primary"
                  >
                    DESCARGAR PEDIDO
                  </Button>
                </Grid>
              )}

              <Grid item md={3}>
                {values.certificado?.nombreUser}
                <UploadAnyFormik
                  folder={`comprobantesElectronicos/${
                    fuego.auth().currentUser?.uid
                  }/`}
                  label="Certificado"
                  campo="certificado"
                />
              </Grid>
              {values.certificado && (
                <Grid item md={3}>
                  <Button
                    onClick={clickAsentar}
                    variant="contained"
                    color="primary"
                  >
                    ASENTAR CERTIFICADOS
                  </Button>
                </Grid>
              )}

              {values.certificado && (
                <Grid item md={2}>
                  <Button
                    onClick={clickSync}
                    variant="contained"
                    color="primary"
                  >
                    sincronizar info
                  </Button>
                </Grid>
              )}
            </Grid>
          ),
        },
        {
          label: "Impresiones",
          nro: 2,
          vista: (
            <Grid container>
              <Grid item md={8}>
                <SelectPlantilla
                  campo="planillaComprobanteDigital"
                  label="Plantilla Comprobante Digital"
                />
              </Grid>
            </Grid>
          ),
        },
      ]}
    />
  );
}
