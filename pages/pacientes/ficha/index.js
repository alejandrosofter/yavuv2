import { UseStorage } from "@hooks/useStorage";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function Page({}) {
  const router = useRouter();
  const [paciente, setPaciente] = UseStorage("pacienteSeleccion");
  console.log(paciente);
  if (paciente) {
    router.push(`/pacientes/ficha/${paciente.id}`);
  }

  return <Typography variant="h3">Seleccione un paciente</Typography>;
}
