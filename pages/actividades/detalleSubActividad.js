import TabsFormik from "@components/forms/tab";
import { Icon, Stack, Typography } from "@mui/material";
import {IntegrantesActividad} from './integrantesActividad'
import {TitleIcon} from "@components/forms/titleIcon"
export function DetalleSubActividad({item}) {
    if(!item)return "Cargando..."
    return (
        <div>
            <Typography sx={{fontWeight:600}} variant="h3">{item.nombreActividad?.toUpperCase()}</Typography>
            <TabsFormik label="Configs" vistas={[ 
                            {label:<TitleIcon title="INTEGRANTES" icon="fas fa-users"/>,nro:0,vista: 
                            <IntegrantesActividad item={item} />
                            }
            
            ]} />
                            
        </div>
    ); 
}