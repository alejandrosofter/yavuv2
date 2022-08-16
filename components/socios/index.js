import { Grid } from "@mui/material";
import PerfilSocio from "./perfilSocio";
import FiltroSocios from "./filtroSocios";
import { useState } from "react";
export default function Modulo({ mod }) {
  const [seleccion, setSeleccion] = useState(
    JSON.parse(localStorage.getItem("socioSeleccion"))
  );

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
