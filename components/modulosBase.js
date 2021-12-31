import { Stack } from "@mui/material";
import useSWR from "swr";
import Loader from "./loader";
import ModuloBase from "./moduloBase"

export default function ModulosBase({auth}){
    const url=`/api/modulos/getBase?id=${auth.id}`
   
    const {data:modulos,mutate} = useSWR(url);
    
    if(!modulos) return <Loader texto="Cargando Modulos BASE"/>
    
    return(
        <Stack direction="row">
        {modulos && modulos.map(data=>
            <ModuloBase key={data.id} auth={auth} modulo={data}/>
        )
        }
        </Stack>
    )
}