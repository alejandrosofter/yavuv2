
import Stack from '@mui/material/Stack';
import { Grid } from "@mui/material";
import BuscadorSocios from "./buscadorSocios";
import ErrorBoundary from "../../helpers/errorBoundary"
export default function Modulo({modulo,mod,token}) {

      return (
      <Stack flex={1} spacing={2}>
            <Grid flex={1}>
                 <ErrorBoundary> <BuscadorSocios modulo={modulo} mod={mod} token={token} /></ErrorBoundary>
            </Grid>
      </Stack>
      )

}