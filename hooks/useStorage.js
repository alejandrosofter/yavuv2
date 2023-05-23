import { useEffect, useState } from "react";

export function UseStorage(nombreStorage, initValue) {
  //chequear si esta en server o cliente
  if (typeof window === "undefined") return [initValue, () => {}];
  const data = localStorage.getItem(nombreStorage);
  const [datos, setDatos] = useState(initValue);
  useEffect(() => {
    // localStorage.setItem(nombreStorage, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (data === "undefined" || !data) setDatos(initValue);
    else {
      //if string data is object json
      if (data[0] === "{") setDatos(JSON.parse(data));
      else setDatos(data);
    }
  }, [nombreStorage]);
  return [datos, setDatos];
}
