import Grid from '@mui/material/Grid';
import Input from "../forms/input"
import Select from "../forms/select"
import SwitchFormik from "../forms/switch";

import useSWR from 'swr';


export default function _FormItemsUsuarios({}){
  const urlMods=`/api/mod/getMods/` 
  
  const { data:mods } = useSWR(urlMods)
  if(!mods)return "Cargando mods.."

    return(
            <Grid container>
                <Grid item md={12}><Select label="Modulo " lista={mods} campoLabel="label" campoId="idMod" campo="idMod"/></Grid>
                <Grid item md={3}><SwitchFormik label="Habilitado " campo="habilitado"/></Grid>
            </Grid>
       
    )
}