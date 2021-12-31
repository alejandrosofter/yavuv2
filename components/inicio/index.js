import useSWR from "swr"
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Loader from "../loader";
export default function InicioHome({token}){
    const { data:dataCuenta} = useSWR(`/api/cuentas/micuenta`)
    if(!dataCuenta) return <Loader texto="Cargando Perfil"/>
    console.log(dataCuenta)
    return(
        <Stack>
<Typography variant="h3" component="div" gutterBottom>
        Hola {dataCuenta.nombre}!
      </Typography>

        </Stack>
    )
}