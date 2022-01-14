import { CircularProgress, Stack } from "@mui/material";
import useSWR from "swr";
import Loader from "./loader";
import ModuloBase from "./moduloBase"
import UseUser from "../hooks/useUser"
import { useAuthUser} from 'next-firebase-auth'
export default function ModulosBase({}){
    const auth=useAuthUser()
    const url=`/api/modulos/getBase?id=${auth.id}`
  
    const {data:modulos,mutate} = useSWR(url);
    console.log(url,modulos)
    if(!modulos) return <CircularProgress color="inherit" />
    
    return(
        <Stack direction="row">
        {modulos && modulos.map(data=>
            <ModuloBase key={data.id} modulo={data}/>
        )
        }
        </Stack>
    )
}