import useSWR from "swr"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { CircularProgress } from "@mui/material";

export default function InicioHome({token}){
    const { data:dataCuenta} = useSWR(`/api/cuentas/micuenta`)
    if(!dataCuenta) return <CircularProgress color="inherit" />

    return(
        <Stack>
          <Typography variant="h3" component="div" gutterBottom> Hola {dataCuenta.nombre}! </Typography>
        </Stack>
    )
}