import NuevaCuenta from "./nuevo"
import EditarCuenta from "./editar"
import Typography from '@mui/material/Typography';

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function ModuloCuenta({modulo,token,dataUsuario,idUsuario,auth,dataCuenta}) {
     
      const dataInicial=()=>({idUsuario:auth.id,nombre:auth.displayName,email:auth.email,telefono:auth.phoneNumber})
      
      return (
            <div>
                  <Typography sx={{ fontWeight: 'bold' }} variant="h4">Hola {dataCuenta.nombre}!</Typography>
            </div>
      )

}