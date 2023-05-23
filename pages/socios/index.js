import { Grid, Typography } from "@mui/material";
import PerfilSocio from "@pages/socios/perfilSocio";
import FiltroSocios from "@components/socios/filtroSocios";
import { UseStorage } from "@hooks/useStorage";
import useLayout from "@hooks/useLayout";
import BuscadorSociosInput from "@components/socios/_buscador";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = UseStorage("socioSeleccion");
  const router = useRouter();
  useEffect(() => {
    if (seleccion) router.push(`/socios/ficha/${seleccion.objectID}`);
  }, [seleccion]);

  const cambiasSocio = (item) => {
    setSeleccion(item);
    localStorage.setItem("socioSeleccion", JSON.stringify(item));
    router.push(`/socios/ficha/${item.objectID}`);
  };
  useLayout({
    label: "Socios",
    titulo: "SOCIOS",
    icon: "fas fa-users",
    acciones: [
      { label: "Socios", icono: "fas fa-home", url: "/socios" },
      { label: "Informes", icono: "fas fa-newspaper", url: "/socios/informes" },
      { label: "Ficha", icono: "fas fa-address-card", url: "/socios/ficha" },
    ],
    components: (
      <Grid item md={8}>
        <BuscadorSociosInput color="white" callBackCambia={cambiasSocio} />
      </Grid>
    ),
  });

  return (
    <Grid container>
      <Grid item md={12}>
        <Typography variant="h4">SOCIOS</Typography>
      </Grid>
    </Grid>
  );
}
