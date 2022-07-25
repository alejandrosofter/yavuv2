import Modelo, { valoresIniciales } from "@modelos/ModeloCobros";
import NuevoGenerico from "@components/NuevoGenerico";
import Form from "@components/cobros/_form";
import { useModUsuario } from "@helpers/db";
import { Grid } from "@mui/material";
import { withAuthUserTokenSSR } from "next-firebase-auth";
export default function Modulo({}) {
  const [mod, setMod] = useModUsuario("cobros");
  if (!mod) return " Cargando...";
  return (
    <Grid sx={{ p: 5 }}>
      <NuevoGenerico
        valoresIniciales={valoresIniciales}
        mod={mod}
        modelo={Modelo}
      >
        <Form subTitulo={mod.label} icono={mod.icono} />
      </NuevoGenerico>
    </Grid>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();
