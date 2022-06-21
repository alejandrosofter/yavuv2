import { useEffect, useState } from "react";

export function UseStorage(nombreStorage, initValue) {
  const [datos, setDatos] = useState(() => {
    const aux = localStorage.getItem(nombreStorage);
    if (aux) return JSON.parse(aux);
    else return initValue;
  });
  useEffect(() => {
    // console.log(datos);
    localStorage.setItem(nombreStorage, JSON.stringify(datos));
  }, [datos, setDatos]);
  return [datos, setDatos];
}
