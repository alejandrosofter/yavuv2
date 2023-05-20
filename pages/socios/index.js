import { Grid } from "@mui/material";
import PerfilSocio from "./perfilSocio";
import FiltroSocios from "./filtroSocios";
import { useEffect, useState } from "react";
import { UseStorage } from "@hooks/useStorage";
import useLayout from "@hooks/useLayout";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = UseStorage("socioSeleccion");
  useLayout({
    label: "Socios",
    titulo: "SOCIOS",
    icon: "fas fa-users",
    acciones: [
      { label: "Socios", icono: "fas fa-home", url: "/socios" },
      { label: "Config", icono: "fas fa-cog", url: "/socios/config" },
    ],
  });
  const guardarLocalStorage = (socio) => {
    localStorage.setItem("socioSeleccion", JSON.stringify(socio));
  };
  const cambiaSocio = (item) => {
    setSeleccion(item);
    guardarLocalStorage(item);
  };
  const deleteSocio = () => {
    cambiaSocio(null);
  };
  return (
    <Grid container>
      <Grid item md={12}>
        <FiltroSocios
          setSeleccion={setSeleccion}
          seleccion={seleccion}
          callBackCambia={cambiaSocio}
          mod={mod}
        />
      </Grid>
      <Grid item md={12}>
        <PerfilSocio socio={seleccion} callbackdelete={deleteSocio} mod={mod} />
      </Grid>
    </Grid>
  );
}
