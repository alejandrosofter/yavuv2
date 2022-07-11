import DialogContenido from "@components/forms/dialogContenido";
import { getModUsuario } from "@helpers/db";
import { Button, Grid, Icon, Tooltip } from "@mui/material";
import { useCollection, fuego } from "@nandorojo/swr-firestore";
import { useState } from "react";
import Select2 from "../forms/select2Formik";
import NuevoPaciente from "./nuevo";
export default function Modulo({ label, campo, callbackchange }) {
  // const mod=getModUsuario("pacientes")
  const { data } = useCollection("mods", {
    listen: true,
    where: [
      ["idUsuario", "==", fuego.auth().currentUser.uid],
      ["config.aceptaDifusion", "==", true],
    ],
  });

  if (!data) return "";
  return (
    <Select2
      callbackchange={callbackchange}
      campo={campo ? campo : "modulo"}
      label={label}
      lista={data}
      campoId="id"
      campoLabel={(item) => `${item.label}`}
    />
  );
}
