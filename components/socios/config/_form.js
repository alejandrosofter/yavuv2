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
  ModeloGeneracionDeuda,
  ModeloMotivos,
  ModeloDifusion,
} from "@modelos/ModeloSocios";
import TabsFormik, { TabPanel } from "../../forms/tab";
import Grid from "@mui/material/Grid";
import Input from "../../forms/input";
import { Typography } from "@mui/material";
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
                FormularioItem={FormTipoSocios}
                campo="itemsTipoSocios"
                columns={[
                  { field: "nombre", headerName: "nombre", width: 250 },
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
          label: "Generacion Deuda",
          nro: 3,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Generar Deuda"
                Modelo={ModeloGeneracionDeuda}
                FormularioItem={FormGeneracionDeuda}
                campo="itemsGeneracionDeuda"
                columns={[
                  { field: "nombre", headerName: "Nombre", width: 130 },
                  { field: "activo", headerName: "Estado", width: 140 },
                  { field: "destino", headerName: "Destino...", width: 130 },
                ]}
              />
            </Grid>
          ),
        },
        {
          label: "Motivos Estados",
          nro: 4,
          vista: (
            <Grid item md={12}>
              <DataGridFormikItems
                label="Motivos Estados"
                Modelo={ModeloMotivos}
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
          nro: 5,
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
          nro: 6,
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
      ]}
    />
  );
}
