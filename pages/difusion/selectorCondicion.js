import DialogContenido from "@components/forms/dialogContenido";
import { getModUsuario } from "@helpers/db";
import { Button, Grid, Icon, Tooltip } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Select from "../forms/select";
import NuevoPaciente from "./nuevo";
export default function Modulo({ label, campo, condiciones }) {
  // const mod=getModUsuario("pacientes")

  if (!condiciones) return "";
  return (
    <Select
      campo={campo}
      label={label}
      lista={condiciones}
      campoId="condicion"
      campoLabel={(item) => `${item.nombre}`}
    />
  );
}
