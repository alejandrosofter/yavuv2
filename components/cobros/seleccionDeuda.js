import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import {useEffect,useState} from "react"
import Fetch from '../../helpers/Fetcher';
import Typography from '@mui/material/Typography';
import {formatDate} from "../../helpers/fechas"
import {formatMoney} from "../../helpers/numbers"
export default function Modulo({socio,callbackAdd}){
    const [deudaSocio,setDeudaSocio]=useState()
    useEffect(()=>{
        // const consulta=async ()=>{
        //     const deuda=await Fetch(`/api/socios_deuda/${socio.id}?pendientes=true`,null,null,token)
        // setDeudaSocio(deuda)
        // }
        // consulta()
    },[])

if(!deudaSocio)return "cargando deuda"
const clickMenu=(deuda)=>{
    if(callbackAdd)callbackAdd(deuda)
}
    return(
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {deudaSocio.datos.map((value) => (
      
           <ListItemButton key={value.id} onClick={clickMenu.bind(this, value)}>
           <React.Fragment>
                 <Typography
                   sx={{ display: 'inline',pr:1 }}
                   component="span"
                   variant="body2"
                   color="text.primary"
                 >
                   {formatDate(value.fechaVto)}
                 </Typography>
                 {value.label_elemento} {formatMoney(value.importe)}
               </React.Fragment>
         </ListItemButton>
        ))}
      </List>
    )
}