import { getModUsuario } from "../../../../helpers/db"
import DialogContenido from "../../../forms/dialogContenido"
import FormNuevo from "../../../cuentasCbu/nuevo"

export default function Modulo ({open,setOpen}){
    const mod=getModUsuario("cuentasCbu")
    if(!mod)return "Buscando mod..."
    
    return(
        <DialogContenido open={open} setOpen={setOpen} >
             <FormNuevo callbackSuccess={()=>setOpen(false)} mod={mod}/>
            
        </DialogContenido>
    )
}