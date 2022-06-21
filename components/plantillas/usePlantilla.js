import { fuego, useDocument } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";
import { formatMoney } from "@helpers/numbers";
import { getFechaString } from "@helpers/dates";
export function UsePlantilla({ id, data }) {
  const { dataTemplate } = useDocument(`plantillas/${id}`);
  const [html, setHtml] = useState("");
  useEffect(() => {
    init();
  }, [nombre, data]);
  const init = async () => {
    try {
      if (dataTemplate)
        setHtml(await remplazarValores(dataTemplate.dataPlantilla, data));
    } catch (error) {
      console.log(error);
    }
  };

  const getImagen = async (path) => {
    return path
      ? await fuego.storage().ref().child(path).getDownloadURL()
      : null;
  };
  const reemplazoConPunto = async ({ texto, key, data, parametro }) => {
    if (key.indexOf(`.`) !== -1) {
      //si es una palabra con punto

      const subVariable = key.match(/[a-zA-Z]+%/gi)[0].replace("%", "");
      let variable = key.match(/%[()a-zA-Z]+/gi)[0].replace("%", "");
      //quito el contenido de los parentesis que es el formato
      variable = variable.replace(/\(\w+\)/gi, "");
      // console.log(`variable ${variable} subVariable ${subVariable}`);
      if (data && data[variable]) {
        // texto = texto.replaceAll(`${key}`, data[variable][subVariable]);
        texto = await reemplazoVariable({
          texto,
          key,
          data: data[variable],
          parametro: subVariable,
        });
      }
    }
    return texto;
  };

  const formatearTexto = async ({ data, key, parametro }) => {
    parametro = parametro.replace(/\(\w+\)/gi, "");
    const valor = data && data[parametro] !== undefined ? data[parametro] : "-";
    if (key.indexOf("(") !== -1) {
      const tipoFormato = key
        .match(/\(\w+\)/gi)[0]
        .replaceAll("(", "")
        .replaceAll(")", "")
        .trim();

      // console.log(`variable":${parametro} valor:${valor}`);
      // console.log(`tipoFormato ${tipoFormato} parametro ${parametro}`);
      // console.log(data, valor);
      switch (tipoFormato) {
        case "importe":
          return formatMoney(valor);

        case "numero":
          return Number(valor).toFixed(2);
        case "bool":
          return valor ? `SI` : "NO";
        case "fecha": {
          return getFechaString(valor);
        }
        case "imagen":
          return await getImagen(valor);
        default:
          return valor[parametro];
      }
    }
    return valor;
  };
  const reemplazoVariable = async ({ texto, key, data, parametro }) => {
    // console.log(`key ${key} parametro ${data[parametro]}`);
    if (key.match(/%[()a-z_\-\.]+%/gi)) {
      return texto.replaceAll(
        `${key}`,
        await formatearTexto({ data, parametro, key })
      );
    }

    return texto;
  };
  const getTextoPlantilla = async (texto, key, data) => {
    if (texto) {
      const parametro = key.replaceAll("%", "");
      const posicionPalabra = texto.indexOf(`${key}`);
      if (posicionPalabra !== -1) {
        texto = await reemplazoConPunto({ texto, key, data, parametro });
        texto = await reemplazoVariable({ texto, key, data, parametro });
        return texto;
      }
    }
    return texto;
  };
  const getArrays = (texto) => {
    return texto.match(/\[%[a-z</>]+[a-z()\n<>_\-%;&/:\s]+%]/gi);
  };
  const getNombreVariableArray = (texto) => {
    return texto.match(/\[%[a-z]+/gi)[0].replace("[%", "");
  };
  const reemplazoArray = async (texto, data) => {
    const variable = getNombreVariableArray(texto);
    texto = texto.replace(/\[%[a-z]+/gi, "").replace(/%]/g, "");
    if (data && data[variable] === undefined) return "Sin datos";
    for (let i = 0; i < data[variable].length; i++) {
      // console.log(data[variable][i], texto);

      texto = await reemplazoVariablesSimples(texto, data[variable][i]);
    }

    return texto;
  };
  const reeplazoVariablesArrays = async (texto, data) => {
    const arr = getArrays(texto);

    let auxTexto = "";
    if (arr)
      for (let i = 0; i < arr.length; i++) {
        auxTexto = await reemplazoArray(arr[i], data);
        texto = texto.replace(arr[i], auxTexto);
      }
    return texto;
  };
  const reemplazoVariablesSimples = async (texto, data) => {
    const valoresRemplazar = texto.match(/%[()a-z_\-\.]+%/gi);
    console.log(data);
    for (let key in valoresRemplazar) {
      texto = await getTextoPlantilla(texto, valoresRemplazar[key], data);
    }
    return texto;
  };
  const remplazarValores = async (template, data) => {
    let auxTemplate = template;
    // console.log(data);
    auxTemplate = await reeplazoVariablesArrays(auxTemplate, data);
    auxTemplate = await reemplazoVariablesSimples(auxTemplate, data);

    return auxTemplate;
  };
  return [html, setHtml];
}
