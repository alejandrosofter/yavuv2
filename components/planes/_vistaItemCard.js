import { Card, CardHeader, Icon,Stack,Typography} from '@mui/material';
import BotonAcciones from '../botonAcciones'
import { CardContent } from "@mui/material";
import Avatar from '@mui/material/Avatar';
export default function VistaItemCard({data,mutate,dataUsuario,modulo}){
    return (
        <Card sx={{ minWidth: 475 }}>
                <CardHeader
                subheader={
                    <Typography variant="body1" color="initial">
                        <Icon className={data.icono}/> {data.detalle}
                    </Typography>
                }
                action={<BotonAcciones mutate={mutate} data={data} modulo={modulo}  acciones={dataUsuario.acciones} /> } />
                
                <CardContent>
                    <Typography variant="h5" color="initial">
                    {data.nombre} 
                    </Typography>
                </CardContent>    
        </Card>
           
     
    )
}