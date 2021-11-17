import { Card, CardHeader, Icon,Typography} from '@mui/material';
import BotonAcciones from '../botonAcciones'
import { CardContent } from "@mui/material";

export default function VistaItemCard({data,mutate,dataUsuario,modulo}){
    return (
        <Card sx={{ minWidth: 275 }}>
                <CardHeader
                subheader={`${data.detalle} (${data.acciones?data.acciones.length:0})`}
                action={<BotonAcciones mutate={mutate} data={data} modulo={modulo}  acciones={dataUsuario.acciones} /> } />
                
                <CardContent>
                    <Typography variant="h5" color="initial">
                        <Icon className={data.icono}/> {data.label}
                    </Typography>
                </CardContent>    
        </Card>
           
     
    )
}