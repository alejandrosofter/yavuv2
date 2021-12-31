import ModuloIndexCard from "../ModuloIndex";
import VistaItemCard from "./_vistaItemCard";
import Stack from '@mui/material/Stack';
import { Typography,Grid } from "@mui/material";
import BuscadorSocios from "./buscadorSocios";
export default function Modulo({modulo,dataUsuario,token}) {
 
      return (
      <Stack flex={1} spacing={2}>
            <Grid flex={1}>
                  <BuscadorSocios token={token}/>
            </Grid>
      </Stack>
      )

}
Modulo.auth = true