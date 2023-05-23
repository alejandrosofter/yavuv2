import { useDocument } from "@nandorojo/swr-firestore";
import { useRouter } from "next/router";
import {
  DataPaciente,
  ListaRecetas,
  TurnosPaciente,
} from "@pages/pacientes/fichaPaciente";
import { Grid } from "@mui/material";
import TabsFormik from "@components/forms/tab";
import useLayout from "@hooks/useLayout";
import SelectPaciente from "@components/pacientes/selectPaciente";
import { UseStorage } from "@hooks/useStorage";
import BuscadorSociosInput from "@components/socios/_buscador";
import FiltroSocios from "@components/socios/filtroSocios";
import PerfilSocio from "../perfilSocio";
import DataSocio from "@components/socios/dataSocio";
import TabsSocio from "@components/socios/tabsSocio";

export default function FichaPaciente({}) {
  const router = useRouter();
  const { idSocio } = router.query;
  const { data: seleccion } = useDocument(`socios/${idSocio}`, {
    listen: true,
  });

  const cambiasSocio = (item) => {
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
  if (!seleccion) return "Seleccione un socio!";
  if (!seleccion.exists) return "El socio no existe";
  return (
    <Grid container>
      <Grid item md={12}>
        <FiltroSocios seleccion={seleccion} callBackCambia={cambiasSocio} />
      </Grid>
      <Grid item md={12}>
        <DataSocio dataSocio={seleccion} />
      </Grid>
      <Grid item md={12}>
        <TabsSocio dataSocio={seleccion} />
      </Grid>
    </Grid>
  );
}
