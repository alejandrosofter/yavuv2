import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import { formatMoney } from "@helpers/numbers";
import { getFechaString } from "@helpers/dates";
import Handlebars from "handlebars";
import { getImagen } from "@helpers/imagenes";

export function UsePlantilla({ id, data }) {
  const { data: dataTemplate } = useDocument(`plantillas/${id}`);
  const [html, setHtml] = useState("");

  useEffect(() => {
    init();
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
      return aString.toUpperCase();
    });
    Handlebars.registerHelper("numero", function (aString) {
      return aString.toFixed(2);
    });

    Handlebars.registerHelper("importe", function (aString) {
      return formatMoney(aString);
    });
    Handlebars.registerHelper("bool", function (aString) {
      return aString ? "SI" : "NO";
    });

    Handlebars.registerHelper("importeTotal", function (data, campo) {
      //suma el campo importe del array data
      let total = 0;
      if (data)
        data.forEach((item) => {
          total += item[campo];
        });
      return formatMoney(total);
    });

    Handlebars.registerHelper("fecha", function (aString) {
      return getFechaString(aString);
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
        return new Handlebars.SafeString(
          "No encuentro: " + options.name + "(" + args + ")"
        );
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
