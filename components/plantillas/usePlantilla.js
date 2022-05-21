import { fuego } from "@nandorojo/swr-firestore";
import { useEffect, useState } from "react";

export function UsePlantilla({ nombre, data }) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    init();
  }, [nombre, data]);
  const init = async () => {
    const templates = await fuego.db
      .collection("plantillas")
      .where("identificador", "==", nombre)
      .where("idUsuario", "==", fuego.auth().currentUser?.uid)
      .limit(1)
      .get();
    let dataTemplate;
    templates.forEach((template) => (dataTemplate = template.data()));
    setHtml(await remplazarValores(dataTemplate.dataPlantilla, data));
  };
  const mostrarImagen = async (auxTemplate, key, path) => {
    const url = path
      ? await fuego.storage().ref().child(path).getDownloadURL()
      : null;
    // const image64 = await fetch("/api/utils/urlToBase64/", { url }).then(
    //   (res) => res.json()
    // );
    // console.log(image64);
    return auxTemplate.replaceAll(`%${key}%`, url);
  };

  const getTextoPlantilla = async (texto, key, data) => {
    if (texto) {
      if (key === "foto" || key === "logo")
        return await mostrarImagen(texto, key, data[key]);
      const posicionPalabra = texto.indexOf(`%${key}`);
      if (posicionPalabra !== -1) {
        //si la palabra existe
        const finPalabra = texto.indexOf(`%`, posicionPalabra + 1);
        const palabra = texto.substring(posicionPalabra, finPalabra);
        if (palabra.indexOf(`.`) !== -1) {
          //si es una palabra con punto

          const variable = palabra.substring(1, palabra.indexOf(`.`));
          const subVariable = palabra.substring(palabra.indexOf(`.`) + 1);
          if (data[variable]) {
            for (let key in data[variable]) {
              if (key === "foto" || key === "logo")
                texto = await mostrarImagen(
                  texto,
                  `${variable}.${key}`,
                  data[variable][key]
                );
              else
                texto = texto.replaceAll(
                  `%${variable}.${key}%`,
                  data[variable][key]
                );
            }
          }
          return texto;
        }
        //es una palabra sin punto
        return texto.replaceAll(`%${key}%`, data[key]);
      }
    }
    return texto;
  };
  const remplazarValores = async (template, data) => {
    const auxTemplate = template;
    if (data)
      for (let key in data)
        auxTemplate = await getTextoPlantilla(auxTemplate, key, data);

    return auxTemplate;
  };
  return [html, setHtml];
}
