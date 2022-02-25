import { CircularProgress, Stack } from "@mui/material";
import useSWR from "swr";
import Loader from "./loader";
import ModuloBase from "./moduloBase"
import { useCollection } from '@nandorojo/swr-firestore'
import { useAuthUser} from 'next-firebase-auth'
import {errorDb} from "../config/db"
export default function ModulosBase({}){
    const auth=useAuthUser();
    const { data, update, error } = useCollection("mods" ,{
        where:  [
            ['esBase', '==', true],
            ['idUsuario', '==', auth.id]
        
    ]
    })
    
    if(error)errorDb(error)
    if(!data) return "..."
    
    return(
        <Stack direction="row">
        {data.map(data=>
            <ModuloBase key={data.id} modulo={data}/>
        )
        }
        </Stack>
    )
}