import FullDialog from '../forms/fullDialog';
import FormClub from './_form';
import EditarGenerico from "../EditarGenerico"
import ModeloClubes,{valoresIniciales} from "../../modelos/ModeloClubes"
import { Box } from '@mui/material';
import { useState } from 'react';
export default function EditarClub({token,data,auth}){
const urlAcepta=`/api/clubes/abm`
const [close, setClose] = useState(false);
const callbackSuccess=(vals)=>{
    setClose(true)
    setClose(false)
}
    return(
        <FullDialog cerrar={close} titulo="Editar Club" icono="fas fa-pencil">
            <Box sx={{ml:10,mr:10}}>
                <EditarGenerico callbackSuccess={callbackSuccess} urlRegistro="/api/clubes/miclub" data={data} token={token} urlAcepta={urlAcepta} 
                valoresIniciales={valoresIniciales}  
                modelo={ModeloClubes}   >
            
                    <FormClub auth={auth} />
        
                </EditarGenerico>
            </Box>
        </FullDialog>
    )
}