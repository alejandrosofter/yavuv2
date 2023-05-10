
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import TitulosFormularios from '../forms/tituloFormularios';
import BuscadorSociosInput from '../socios/_buscador';

export default function Modulo({callBackCambia}) {


      return (
          <Grid md={12}>
                <BuscadorSociosInput callBackCambia={callBackCambia} />
           </Grid>
      
      ) 

}