import { Card, CardHeader, Icon,Typography} from '@mui/material';
import BotonAcciones from '../botonAcciones'
import { CardContent } from "@mui/material";

export default function VistaItemCard({data,token,mutate,dataUsuario,modulo}){

    return (
        <Card sx={{ minWidth: 275 }}>
                <CardHeader
                subheader={`${data.host} (defecto? ${data.esDefecto?'si':'no'})`}
                action={<BotonAcciones token={token} mutate={mutate} data={data} modulo={modulo}   /> } />
                
                <CardContent>
                    <Typography variant="h5" color="initial">
                         {data.nombre}
                    </Typography>
                </CardContent>    
        </Card>
           
     
    )
}