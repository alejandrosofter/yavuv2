
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../../forms/tituloFormularios';
export default function Modulo({modulo,mod,token}) {

      return (
      <Stack flex={1} spacing={2}>
            <Grid flex={1}>
                 <TitulosFormularios titulo="COBRO" subTitulo="Socios" icono="fas fa-money" />
            </Grid>
      </Stack>
      )

}