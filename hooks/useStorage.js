import { useEffect, useState } from "react";

export function UseStorage(nombreStorage, initValue) {
  const [datos, setDatos] = useState(initValue);
  useEffect(() => {
    // ;
    localStorage.setItem(nombreStorage, JSON.stringify(datos));
  }, [datos, setDatos]);
  useEffect(() => {
    // ;
    localStorage.setItem(nombreStorage, JSON.stringify(datos));

    const aux = localStorage.getItem(nombreStorage);
    //check aux is undefined
    if (aux === "undefined" || !aux) setDatos(initValue);
    else setDatos(JSON.parse(aux));
  }, [nombreStorage]);
  return [datos, setDatos];
}
