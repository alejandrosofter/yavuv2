import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import { formatMoney, numeroLetra } from "@helpers/numbers";
import { getFechaString } from "@helpers/dates";
import Handlebars from "handlebars";
import { getImagen } from "@helpers/imagenes";

export function UsePlantilla({ id, data }) {
  const { data: dataTemplate } = useDocument(`plantillas/${id}`);
  const [html, setHtml] = useState("");
  const [idPlantilla, setIdPlantilla] = useState(id);

  useEffect(() => {
    init();
    setIdPlantilla(id);
  }, [id, data]);

  const init = async () => {
    try {
      if (dataTemplate)
        setHtml(await remplazarValores(dataTemplate.dataPlantilla, data));
    } catch (error) {
      console.log(error);
    }
  };
  if (!dataTemplate) return "No hay Template";
  const addData = async (data) => {
    let aux = data;
    for (const key in data) {
      if (key === "foto") {
        aux[`${key}_base64`] = await getImagen(data[key]);
      }
    }
    return aux;
  };
  const remplazarValores = async (strTemplate, datos) => {
    if (!strTemplate) return "No hay plantilla para mostrar";
    const data = await addData(datos);
    Handlebars.registerHelper("mayu", function (aString) {
      if (!aString) return "";
      return `${aString}`.toUpperCase();
    });
    Handlebars.registerHelper("gettext", function (aString) {
      console.log(aString);
      if (!aString) return "";
      return `${aString}`;
    });
    Handlebars.registerHelper("numero", function (aString) {
      if (!aString) return "";
      return `${aString}`.toFixed(2);
    });

    Handlebars.registerHelper("importe", function (importe) {
      return formatMoney(importe);
    });
    Handlebars.registerHelper("letraFiscal", function (tipoComprobante) {
      if (!tipoComprobante) return "-";
      const palabras = tipoComprobante.split(" ");
      return palabras[palabras.length - 1];
    });
    Handlebars.registerHelper("numeroLetra", function (numero) {
      console.log(numero);
      return numeroLetra(Number(numero));
    });
    Handlebars.registerHelper("equal", function (valor, valor2) {
      if (valor === valor2) {
        return true;
      }
      return false;
    });
    Handlebars.registerHelper("exists", function (valor) {
      if (!valor) return false;
      if (valor === "") return false;

      return true;
    });
    Handlebars.registerHelper("qr", function (data) {
      const auxData = {
        ver: 1,
        fecha: getFecha2(data.CbteFch),
        cuit: Number(data.cuit),
        ptoVta: Number(data.puntoVenta),
        tipoCmp: Number(data.CbteTipo),
        nroCmp: Number(data.nroComprobante),
        importe: Number(data.ImpTotal),
        moneda: data.MonId,
        ctz: 1,
        tipoDocRec: Number(data.DocTipo),
        nroDocRec: Number(data.DocNro),
        tipoCodAut: "E",
        codAut: Number(data.nroCae),
      };
      //json to base 64
      const json = JSON.stringify(auxData);
      const base64 = Buffer.from(json).toString("base64");

      return `https://serviciosweb.afip.gob.ar/genericos/comprobantes/cae.aspx?p=${base64}`;
    });

    // $json=json_encode($data);
    // $base64=base64_encode($json);
    // return "https://serviciosweb.afip.gob.ar/genericos/comprobantes/cae.aspx?p=".$base64;
    Handlebars.registerHelper("subTotal", function (importe, cantidad) {
      return formatMoney(Number(importe) * Number(cantidad));
    });
    const getFecha = (fecha) => {
      if (!fecha) return "-";
      const fechaString = fecha.toString();
      const anio = fechaString.substring(0, 4);
      const mes = fechaString.substring(4, 6);
      const dia = fechaString.substring(6, 8);
      return `${dia}/${mes}/${anio}`;
    };
    const getFecha2 = (fecha) => {
      if (!fecha) return "-";
      const fechaString = fecha.toString();
      const anio = fechaString.substring(0, 4);
      const mes = fechaString.substring(4, 6);
      const dia = fechaString.substring(6, 8);
      return `${anio}-${mes}-${dia}`;
    };
    Handlebars.registerHelper("fecha2", function (fecha) {
      //parse fecha en formato yyyymmdd a formato dd/mm/yyyy
      return getFecha(fecha);
    });
    Handlebars.registerHelper("agregadoOpcional", function (string) {
      //parse fecha en formato yyyymmdd a formato dd/mm/yyyy
      if (!string) return "";
      return ` - ${string}`;
    });
    Handlebars.registerHelper("rpad", function (string, length, pad) {
      if (!string) return "-";
      return `${string}`.padStart(length, pad);
    });
    Handlebars.registerHelper("bool", function (aString) {
      return aString ? "SI" : "NO";
    });
    Handlebars.registerHelper(
      "sumatoriaDebitos",
      function (actividades, importeMensual, esPorDebitoMensual) {
        //SUMO el importe de actividades que sean por debito
        let suma = 0;
        actividades.forEach((actividad) => {
          if (actividad.esPorDebitoAutomatico)
            suma += Number(actividad.idProducto_importe);
        });
        if (esPorDebitoMensual) suma += Number(importeMensual);
        return formatMoney(suma);
      }
    );

    Handlebars.registerHelper("esAlta", function (estado) {
      //SUMO el importe de actividades que sean por debito
      if (estado === "ALTA") return true;
      return false;
    });
    Handlebars.registerHelper("existeColeccion", function (coleccion) {
      if (!coleccion) return false;
      if (coleccion.length > 0) return true;
      return false;
    });
    Handlebars.registerHelper("esBaja", function (estado) {
      //SUMO el importe de actividades que sean por debito
      if (estado === "BAJA") return true;
      return false;
    });

    Handlebars.registerHelper(
      "importeTotalItem",
      function (importe, cantidad, importeBonificacion) {
        console.log(`importeBonificacion: ${importeBonificacion}`);
        return formatMoney(
          Number(importe) * cantidad -
            (importeBonificacion ? Number(importeBonificacion) : 0)
        );
      }
    );
    Handlebars.registerHelper(
      "importeTotal",
      function (data, campo, conCantidad) {
        //suma el campo importe del array data
        const field = campo ? campo : "importe";
        console.log(campo);
        let total = 0;
        if (data)
          data.forEach((item) => {
            const bonificacion = Number(item.importeBonificacion) || 0;
            const cantidad = Number(
              conCantidad ? (item.cantidad ? item.cantidad : 1) : 1
            );
            const importe = Number(item[field]);
            total += importe * cantidad - bonificacion;
            console.log(bonificacion, cantidad, importe, total);
          });
        return formatMoney(total);
      }
    );

    Handlebars.registerHelper("importeTotalDebitos", function (data) {
      //suma el campo importe del array data
      console.log("solo debitos");
      let total = 0;
      if (data)
        data.forEach((item) => {
          total += item.esPorDebitoAutomatico
            ? Number(item.idProducto_importe)
            : 0;
        });
      return formatMoney(total);
    });

    Handlebars.registerHelper("fecha", function (aString) {
      return getFechaString(aString);
    });
    Handlebars.registerHelper("hora", function (aString) {
      return getFechaString(aString, "HH:mm");
    });

    Handlebars.registerHelper("fechaHora", function (aString) {
      return getFechaString(aString, "DD/MM/YYYY hh:mm");
    });
    Handlebars.registerHelper(
      "helperMissing",
      function (/* dynamic arguments */) {
        var options = arguments[arguments.length - 1];
        var args = Array.prototype.slice.call(
          arguments,
          0,
          arguments.length - 1
        );
        return new Handlebars.SafeString("---");
      }
    );
    Handlebars.registerHelper(
      "blockHelperMissing",
      function (context, options) {
        return (
          "Helper '" +
          options.name +
          "' no se encuetra. " +
          "salida: " +
          options.fn(context)
        );
      }
    );

    const template = Handlebars.compile(strTemplate);
    return template(data);
  };
  return [html, setHtml];
}
