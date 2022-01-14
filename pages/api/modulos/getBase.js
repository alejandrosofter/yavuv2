import { findByField,Firebase ,findOne,findMods, nuevo} from "../../../config/firebase"
function estaEn(modulo,modsBase,idUsuario){
    let cargado=false
  
    modsBase.map(modItem=>{
        if(modItem.idModulo==modulo.id && modItem.idUsuario==idUsuario ){
            
            cargado= true;
            return
        }
    })
    return cargado
}

async function crearModBase(modulo,idUsuario){
    await nuevo("mods",{idUsuario:idUsuario,idModulo:modulo.id,fechaClick:new Date(),estado:true,esBase:modulo.esBase})
}
async function verificarModulos(modsBase,modulosBase,idUsuario){
    modulosBase.map(modulo=>{
    
        if(!estaEn(modulo,modsBase,idUsuario))crearModBase(modulo,idUsuario)
    })
}
async function getModulos(idUsuario){
    var sal=[]
    var mods= await findMods("mods",idUsuario,true)
    
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
    var modulos=[]

        const { id} = req.query
        if(id){
            const user=await Firebase().getUser(id)
            if(user){
                const mods=await findMods("mods",id,true)
                const cuenta=await findOne("cuenta",id)
                const modulosBase=await findByField("modulos",{campo:"esBase",valor:true})
                verificarModulos(mods,modulosBase,id)
                modulos=await getModulos(id)
            }else console.log("No existe el usuario")
        }
        
        
        

    // if(!modulos) res.status(200).json({})
     res.status(200).json(modulos)
 
}