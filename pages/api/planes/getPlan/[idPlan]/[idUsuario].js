import { findOne,findWhere,findMods,Timestamp } from "../../../../../config/firebase"
async function getModulos(idPlan,idUsuario){
        var sal=[]
        var mods= await findMods("mods",idUsuario)
        
        for (let index = 0; index < mods.length; index++) {
            const modItem = mods[index];
            
            const modulo=await findOne("modulos",modItem.idModulo)
            if(modulo){
                modulo.idMod=modItem.id
                sal.push(modulo)
            }
            
        //     sal.push({fecha:modItem.fecha,nombre:modulo.label})
        }
       
        return sal 
    }
export default async function handler(req, res) {
        const { data } = req.query
       const datos=await getModulos(req.query.idPlan,req.query.idUsuario) 

        if(!datos) res.status(200).json({})
        else res.status(200).json(datos)
    
    
}