import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Page({}) {
  const router = useRouter();
  const paciente = JSON.parse(localStorage.getItem("pacienteSeleccion"));
  if (paciente) {
    router.push(`/pacientes/ficha/${paciente.id}`);
  }

  return <Typography variant="h3">Seleccione un paciente</Typography>;
}
