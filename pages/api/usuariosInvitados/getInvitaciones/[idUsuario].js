import {findOne,findModsInvitados,Firebase} from "../../../../config/firebase"
async function getModulos(idUsuario){
        var sal=[]
        var usuario=await Firebase().getUser(idUsuario)
        
        var mods= await findModsInvitados(usuario.email)
      
        for (let index = 0; index < mods.length; index++) {
            const modItem = mods[index];
            
            const mod=await findOne("mods",modItem.idMod)
            const modulo=await findOne("modulos",mod.idModulo)
            if(modulo){
                modulo.idMod=modItem.idMod
                modulo.mod=mod
                const usuarioPadre=await Firebase().getUser(mod.idUsuario)
                modulo.usuario=usuarioPadre
                sal.push(modulo)
            }
            
        //     sal.push({fecha:modItem.fecha,nombre:modulo.label})
        }
       
        return sal 
    }
export default async function handler(req, res) {
        const { data } = req.query
       const datos=await getModulos(req.query.idUsuario) 

        if(!datos) res.status(200).json({})
        else res.status(200).json(datos)
    
    
}