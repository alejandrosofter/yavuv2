import { Form } from "formik";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Tab, Icon } from "@mui/material";
import Input from "@components/forms/input";
import Modelo, {
  ModeloItemsFormaPago,
  valoresInicialesFormaPago,
  valoresInicialesItems,
  ModeloItems,
} from "../../modelos/ModeloCompras";
import Switch from "../forms/switch";
import ItemsModulo from "../forms/itemsModulo";
import FormItem from "./_formItem";
import FormItemFormaPagos from "./_formItemFormaPago";
import { formatMoney } from "../../helpers/numbers";
import SelectFecha from "../forms/selectorFecha";
import SelectEstaticFormik from "@components/forms/selectEstaticFormik";
import Select2 from "@components/forms/select2Formik";
import { fuego, useCollection } from "@nandorojo/swr-firestore";
import { getFechaString } from "../../helpers/dates";
import ImageFormik from "../forms/imageFormik";
import SelectCentroCosto from "@components/centroCostos/select";
import SelectProveedor from "@components/proveedores/select";
export default function FormCompras({ values, setFieldValue }) {
  const [tabDatos, setTabDatos] = useState("datos");
  const { data: centrosCosto } = useCollection("centroCostos", {
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
  });
  const { data: proveedores } = useCollection("proveedores", {
    where: ["idUsuario", "==", fuego.auth().currentUser?.uid],
  });

  const cambiaTab = (event, newValue) => {
    setTabDatos(newValue);
  };
  return (
    <TabContext value={tabDatos}>
      <Grid>
        <TabList onChange={cambiaTab}>
          <Tab label="Datos" value="datos" />
          <Tab
            label={`Items (${values?.items ? values.items.length : 0})`}
            value="items"
          />
          <Tab
            label={`Forma de Pagos (${
              values?.formaPagos ? values.formaPagos.length : 0
            })`}
            value="formaPagos"
          />
        </TabList>
        <TabPanel value="datos">
          <Grid
            sx={{ pt: 4 }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          >
            <Grid item md={2}>
              <ImageFormik
                w={1000}
                h={1000}
                variantIcon="square"
                iconDefault="fas fa-file-invoice"
                folder={`users/${fuego.auth().currentUser?.uid}/compras`}
                label="Imagen Factura"
                campo={`imagenFactura`}
              />
            </Grid>
            <Grid item md={2}>
              <SelectFecha label="Fecha" campo="fecha" />
            </Grid>
            <Grid item md={2}>
              <SelectEstaticFormik
                items={["PENDIENTE", "CANCELADO"]}
                label="Estado"
                campo="estado"
              />
            </Grid>
            <Grid item md={3}>
              <SelectCentroCosto />
            </Grid>
            <Grid item md={3}>
              <SelectProveedor campo="idEntidad" />
            </Grid>
            <Grid item xs={6}>
              <Input label="Detalle " campo="detalle" />
            </Grid>
            <Grid item xs={2}>
              <Input label="$ Total " campo="importeTotal" />
            </Grid>
            <Grid item xs={3}>
              <Input label="Nro Comprobante" campo="nro" />
            </Grid>
            <Grid item xs={2}>
              <Switch label="Es de Stock?" campo="esCompraStock" />
            </Grid>
            {values?.esCompraStock && (
              <Grid item xs={1}>
                <Input label="% ganancia" campo="porcentajeGanancia" />
              </Grid>
            )}
            {values?.esCompraStock && (
              <Grid item xs={1}>
                <Input label="$ flete" campo="importeFlete" />
              </Grid>
            )}
          </Grid>
        </TabPanel>
        <TabPanel value="items">
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
                },
                {
                  field: "importe",
                  headerName: "$ Unidad",
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
        </TabPanel>
        <TabPanel value="formaPagos">
          <Grid item xs={12}>
            <ItemsModulo
              setFieldValue={setFieldValue}
              campo="formaPagos"
              data={values?.formaPagos}
              modelo={ModeloItemsFormaPago}
              nombreModulo="FORMA PAGOS"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar los items:`}
              textoAgregar={`Ingrese los datos del item`}
              valoresIniciales={valoresInicialesFormaPago}
              form={<FormItemFormaPagos />}
              dataModulo={[]}
              columnas={[
                {
                  field: "label_idFormaPago",
                  headerName: "Forma de Pago",
                  editable: false,
                  width: 180,
                  renderCell: (params) =>
                    `${params.row.label_idFormaPago} ${
                      params.row.detalle ? params.row.detalle : ""
                    }`,
                },

                {
                  field: "fechaVto",
                  headerName: "Fecha Vto",
                  width: 100,
                  renderCell: (params) =>
                    params.row.tieneVto
                      ? getFechaString(params.row.fechaVto)
                      : "-",
                },
                {
                  field: "importe",
                  headerName: "Importe",
                  width: 80,
                  renderCell: (params) => formatMoney(params.value),
                },
              ]}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </TabContext>
  );
}
