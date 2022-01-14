import { Card, CardHeader, Icon,Typography} from '@mui/material';
import BotonAcciones from '../botonAcciones'
import { CardContent } from "@mui/material";

export default function VistaItemCard({data,token,mutate,modulo}){
    return (
        <Card sx={{ minWidth: 275 }}>
                <CardHeader
                subheader={``} 
                action={<BotonAcciones mutate={mutate} token={token} data={data} modulo={modulo}  /> } />
                
                <CardContent>
                    <Typography variant="h5" color="initial">
                         {data.apellido}  {data.nombre} 
                    </Typography>
                    {}
                </CardContent>    
        </Card>
           
     
    )
}