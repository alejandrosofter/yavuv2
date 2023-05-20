import { Button, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TitulosFormularios from "@components/forms/tituloFormularios";

export default function Modulo({ mod }) {
  const [estado, setEstado] = useState();
  useEffect(() => {
    buscar();
  }, []);
  const router = useRouter();
  const buscar = async () => {
    const res = await (
      await fetch(`/api/dispositivos/estado/${router.query.id}`)
    ).json();
    setEstado(res);
  };
  return (
    <Stack>
      <TitulosFormularios titulo="Estado ACTUAL" />
      <Button onClick={() => buscar()}>Buscar</Button>
      {JSON.stringify(estado)}
    </Stack>
  );
}
