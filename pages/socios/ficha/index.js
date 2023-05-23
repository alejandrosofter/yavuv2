import { UseStorage } from "@hooks/useStorage";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const [seleccion, setSeleccion] = UseStorage("socioSeleccion");
  const router = useRouter();
  useEffect(() => {
    if (seleccion) router.push(`/socios/ficha/${seleccion.objectID}`);
  }, [seleccion]);
  return <Typography variant="h6">Seleccione socio!</Typography>;
}
