
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import BuscadorSocios from "./buscadorSocios";
export default function Modulo({mod,auth}) {

      return (
      <Stack flex={1} spacing={2}>
            <Grid flex={1}>
                  <BuscadorSocios  mod={mod}  auth={auth}/>
            </Grid>
      </Stack>
      )

}