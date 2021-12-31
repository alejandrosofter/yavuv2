import {findAll, findOne,findMods} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
async function getModulos(idUsuario){
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
    const { id } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        return await getModulos(user.id)
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
    
    res.status(codigoSalida).json(salida)
}