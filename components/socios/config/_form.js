import DataGridFormikItems from "../../forms/dataGridFormik";
import FormCategoriaSocios from "./_formCategoriaSocios";
import FormTipoSocios from "./_formItemsTipoSocios";
import FormTipoDocumentacionSocios from "./_formTipoDocumentacion";
import FormGeneracionDeuda from "./_formGenerarDeuda";
import FormMotivos from "./_formMotivos";
import FormDifusion from "./_formDifusion";
import SelectPlantilla from "@components/plantillas/selectPlantilla";
import Switch from "@components/forms/switch";
import {
  ModeloConfig,
  ModeloTipoConfig,
  ModeloTipoSocios,
  ModeloCategoriaSocio,
  ModeloTipoPeriodos,
  ModeloMotivos,
  ModeloDifusion,
  valoresInicialesTipoSocios,
  valoresInicialesMotivos,
} from "@modelos/ModeloSocios";
import TabsFormik, { TabPanel } from "../../forms/tab";
import Grid from "@mui/material/Grid";
import Input from "../../forms/input";
import { Button, Icon, Typography } from "@mui/material";
import FormTipoPeriodos from "./_formTIpoPeriodos";
import SelectCamara from "./selectCamara";

export default function FormConfig({}) {
  return (
    <TabsFormik
      label="Configs"
      vistas={[
        {
          label: "Categorias",
          nro: 0,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Categoria"
                Modelo={ModeloCategoriaSocio}
                FormularioItem={FormCategoriaSocios}
                campo="itemsCategoriaSocios"
                columns={[
                  { field: "nombre", headerName: "Nombre", width: 150 },
                  { field: "condicion", headerName: "Condicion", width: 100 },
                  {
                    field: "label_idProducto",
                    headerName: "Producto/Servicio Asociado",
                    width: 190,
                  },
                ]}
              />
            </Grid>
          ),
        },
        {
          label: "Tipos",
          nro: 1,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Tipo Socios"
                Modelo={ModeloTipoSocios}
                valoresIniciales={valoresInicialesTipoSocios}
                FormularioItem={FormTipoSocios}
                campo="itemsTipoSocios"
                columns={[
                  { field: "id", headerName: "ID", width: 180 },
                  { field: "nombre", headerName: "Nombre", width: 250 },

                  {
                    field: "proximoNro",
                    headerName: "Proximo Nro Socio",
                    width: 150,
                  },
                ]}
              />
            </Grid>
          ),
        },
        {
          label: "Tipos Documentacion",
          nro: 2,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Tipo de Documentacion"
                Modelo={ModeloTipoConfig}
                FormularioItem={FormTipoDocumentacionSocios}
                campo="tiposDocumentacion"
                columns={[
                  {
                    field: "nombreTipoDocumentacion",
                    headerName: "Tipo Documentacion",
                    width: 450,
                    editable: true,
                  },
                ]}
              />
            </Grid>
          ),
        },

        {
          label: "Motivos Estados",
          nro: 3,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Motivos Estados"
                Modelo={ModeloMotivos}
                valoresIniciales={valoresInicialesMotivos}
                FormularioItem={FormMotivos}
                campo="itemsMotivosEstados"
                columns={[
                  { field: "detalle", headerName: "Detalle", width: 330 },
                  { field: "estado", headerName: "Asociado a ...", width: 130 },
                ]}
              />
            </Grid>
          ),
        },
        {
          label: "Impresiones",
          nro: 4,
          vista: (
            <Grid item md={12}>
              <Grid item md={3}>
                <Typography variant="caption" component="div" gutterBottom>
                  Credencial
                </Typography>
                <SelectPlantilla
                  campo="plantillaCredencial"
                  label="Credencial"
                />
              </Grid>
              <Grid item md={3}>
                <Typography variant="caption" component="div" gutterBottom>
                  Plantilla Mensual
                </Typography>
                <SelectPlantilla
                  campo="plantillaMensualizacion"
                  label="Mensualizacion"
                />
              </Grid>
              <Grid item md={3}>
                <Typography variant="caption" component="div" gutterBottom>
                  Cambio Estado
                </Typography>
                <SelectPlantilla
                  campo="plantillaCambioEstado"
                  label="Cambio Estado"
                />
              </Grid>
              <Grid item md={3}>
                <Typography variant="caption" component="div" gutterBottom>
                  Email Credencial
                </Typography>
                <SelectPlantilla
                  campo="plantillaEmailCredencial"
                  label="Email Credencial"
                />
              </Grid>
            </Grid>
          ),
        },
        {
          label: "Difusion",
          nro: 5,
          vista: (
            <Grid spacing={2} container>
              <Grid item md={2}>
                <Switch campo="aceptaDifusion" label="Acepta Difusion" />
              </Grid>
              <Grid item md={2}>
                <Input campo="campoOrderDifusion" label="Campo Order" />
                <Typography variant="caption" component="div" gutterBottom>
                  Es vital para el envio de la difusion ya que envia por lotes
                  ordenando por este campo
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Input campo="nombreCampoDestinatario" label="Campo NOMBRE" />
                <Typography variant="caption" component="div" gutterBottom>
                  El campo del nombre para esta coleccion
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Input campo="emailCampoDestinatario" label="Campo EMAIL" />
                <Typography variant="caption" component="div" gutterBottom>
                  El campo del email para esta coleccion
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Input
                  campo="telefonoCampoDestinatario"
                  label="Campo TELEFONO"
                />
                <Typography variant="caption" component="div" gutterBottom>
                  El campo del telefono para esta coleccion
                </Typography>
              </Grid>
              <DataGridFormikItems
                label="Difusion"
                Modelo={ModeloDifusion}
                FormularioItem={FormDifusion}
                campo="itemsDifusion"
                columns={[
                  { field: "nombre", headerName: "Nombre", width: 330 },
                  { field: "condicion", headerName: "Condicion", width: 130 },
                ]}
              />
            </Grid>
          ),
        },
        {
          label: "Tipos Periodicidad",
          nro: 6,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Tipo Periodos"
                Modelo={ModeloTipoPeriodos}
                FormularioItem={FormTipoPeriodos}
                campo="itemsTipoPeriodo"
                columns={[
                  { field: "nombre", headerName: "nombre", width: 250 },
                  {
                    field: "esConAsistencia",
                    headerName: "Con asistencia",
                    width: 150,
                  },
                  {
                    field: "cantidadMinimaAsistencias",
                    headerName: "Min asistencia generacion deuda",
                    width: 150,
                  },
                ]}
              />
            </Grid>
          ),
        },
      ]}
    />
  );
}
