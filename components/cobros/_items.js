import FormItem from "./_formItem";
import FormItemPago from "./_formItemPago";
import {
  ModeloItems,
  ModeloFormasDePago,
  valoresInicialesFormaPago,
  valoresInicialesItems,
} from "../../modelos/ModeloCobros";
import ItemsModulo from "../forms/itemsModulo";
import { formatMoney } from "../../helpers/numbers";
import TabsFormik from "../forms/tab";
import { useEffect, useState } from "react";
export default function ItemsCobro({
  setFieldValue,
  values,
  campoItems = "deudas",
  campoFormaPago = "formasDePago",
}) {
  const [importeDebe, setImporteDebe] = useState(0);
  const [importeHaber, setImporteHaber] = useState(0);
  useEffect(() => {
    cambiaItems(values[campoItems]);
  }, [values[campoItems]]);

  const cambiaItems = (items) => {
    let importe = 0,
      bonificacion = 0,
      total = 0;
    if (items)
      items.forEach((item) => {
        importe += Number(item.importe) * item.cantidad;
        bonificacion += Number(
          item.importeBonificacion ? item.importeBonificacion : 0
        );
      });
    total += importe - bonificacion;

    setFieldValue("importe", importe);
    setFieldValue("importeBonificacion", bonificacion);
    setFieldValue("importeTotal", total);
    setImporteDebe(total);
  };
  const cambiaItemsFormaPago = (items) => {
    let importe = 0;
    if (items)
      items.forEach((item) => {
        importe += Number(item.importe);
      });
    setImporteHaber(importe);
    setFieldValue("importePaga", importe);
  };

  return (
    <TabsFormik
      label="Gral"
      vistas={[
        {
          label: "Items",
          nro: 0,
          vista: (
            <ItemsModulo
              fnCambia={cambiaItems}
              setFieldValue={setFieldValue}
              data={values[campoItems]}
              campo={campoItems}
              modelo={ModeloItems}
              nombreModulo="Items"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las propiedades:`}
              textoAgregar={`Ingrese los datos `}
              valoresIniciales={valoresInicialesItems()}
              form={<FormItem />}
              dataModulo={[]}
              columnas={[
                { field: "cantidad", headerName: "Cant.", width: 80 },
                {
                  field: "label_idProducto",
                  headerName: "Producto",
                  width: 280,
                  renderCell: (params) =>
                    `${params.value} - ${
                      params.row.detalle ? params.row.detalle : ""
                    }`,
                },
                {
                  field: "importe",
                  headerName: "$ Importe",
                  width: 100,
                  renderCell: (params) => {
                    return formatMoney(params.value);
                  },
                },

                {
                  field: "importeBonificacion",
                  headerName: "$ Bonif.",
                  editable: false,
                  width: 80,
                  renderCell: (params) => {
                    return formatMoney(params.value);
                  },
                },
                {
                  field: "importeTotal",
                  headerName: "$ Total",
                  width: 100,
                  renderCell: (params) => {
                    const bonif = Number(params.row.importeBonificacion);
                    const aux =
                      params.row.cantidad * params.row.importe -
                      (bonif ? bonif : 0);
                    return formatMoney(aux);
                  },
                },
              ]}
            />
          ),
        },
        {
          label: "Forma de Pago",
          nro: 1,
          vista: (
            <ItemsModulo
              fnCambia={cambiaItemsFormaPago}
              setFieldValue={setFieldValue}
              data={values[campoFormaPago]}
              campo={campoFormaPago}
              modelo={ModeloFormasDePago}
              nombreModulo="Forma de Pago"
              fullWidth={true}
              maxWidth={"md"}
              textoEditar={`Puedes cambiar las propiedades:`}
              textoAgregar={`Ingrese los datos `}
              valoresIniciales={valoresInicialesFormaPago(
                importeDebe - importeHaber
              )}
              form={<FormItemPago />}
              dataModulo={[]}
              columnas={[
                {
                  field: "label_formaPago",
                  headerName: "Forma de Pago",
                  width: 280,
                },
                {
                  field: "importe",
                  headerName: "$ Importe",
                  width: 180,
                  renderCell: (params) => {
                    return formatMoney(params.value);
                  },
                },
              ]}
            />
          ),
        },
      ]}
    />
  );
}
