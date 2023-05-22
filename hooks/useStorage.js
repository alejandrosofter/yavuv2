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
    console.log("data", data);
    //check aux is undefined
    if (data === "undefined" || !data) setDatos(initValue);
    else setDatos(JSON.parse(data));
  }, [nombreStorage]);
  return [datos, setDatos];
}
