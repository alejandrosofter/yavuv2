import Grid from '@mui/material/Grid';
import Input from "../forms/input"
import Select from "../forms/select"
import SwitchFormik from "../forms/switch";

import useSWR from 'swr';
import { useCollection,fuego } from '@nandorojo/swr-firestore';


export default function _FormItemsUsuarios({}){
  const {data:mods}=useCollection("mods",{where:["idUsuario","==",fuego.auth().currentUser.uid]})
  
  if(!mods)return "Cargando mods.."

    return(
            <Grid container>
                <Grid item md={12}><Select label="Modulo " lista={mods} campoLabel="label" campoId="id" campo="idMod"/></Grid>
                <Grid item md={3}><SwitchFormik label="Habilitado " campo="habilitado"/></Grid>
            </Grid>
       
    )
}