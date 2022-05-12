import { useEffect, useState } from "react";

export function UseSeleccion({ nombre }) {
  const [seleccion, setSeleccion] = useState(
    localStorage.getItem(nombre)
      ? JSON.parse(localStorage.getItem(nombre))
      : null
  );

  useEffect(() => {
    localStorage.setItem(nombre, JSON.stringify(seleccion));
  }, [seleccion]);

  return [seleccion, setSeleccion];
}
