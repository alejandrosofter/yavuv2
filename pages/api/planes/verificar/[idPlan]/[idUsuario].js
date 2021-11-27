import { findOne,findWhere,findMods,nuevo, update } from "../../../../../config/firebase"
async function getModulos(plan,idUsuario){
        var sal=[]
        
        const array=await findOne("planes",plan,idUsuario)
        return await findMods("mods","idModulo",array.modulos,idUsuario)
        for (let index = 0; index < array.modulos.length; index++) {
            const idModulo = array.modulos[index];
            const where=[{campo:"idModulo",valor:idModulo},{campo:"IdUsuario",valor:idUsuario}]
            const auxMod=(await findWhere("mods",where,true))
            const modulo=await findOne("modulos",idModulo)
            sal.push({modulo:modulo,mod:auxMod})
            
        }
       
        return sal 
    }
    function estaCargado(idModulo,idUsuario,arr)
    {
       let cargado=false
        arr.map(modItem=>{
            
            if(modItem.idModulo==idModulo && modItem.idUsuario==idUsuario ){
                
                cargado= true;
                return
            }
        })
        return cargado
    }
    function getIdMod(idModulo,idUsuario,arr)
    {
        let id=false
        arr.map(modItem=>{
            if(modItem.idModulo==idModulo && modItem.idUsuario==idUsuario ){
                id=modItem.id
                return;
            }
        })
        return id
    }
    async function cargarMod(idModulo,idUsuario,estaBaja)
    {
        const modulo=await findOne("modulos",idModulo)
       await nuevo("mods",{idUsuario,idModulo,fechaClick:new Date(),estado:true,esBase:false})
    }
    async function bajarMod(idMod)
    {
        const obj={id:idMod,estado:false}
        // console.log(obj)
        await update("mods",obj)
    }
    async function subirMod(idMod)
    {
        const obj={id:idMod,estado:true}
        console.log("subir ")
        console.log(obj)
        await update("mods",obj)
    }
    async function estaBaja(idMod,arr){
      let cargado=false
        arr.map(modItem=>{
            if(modItem.id==idMod  ){
                cargado=true
                return
            }
        })
        return cargado
    }
    async function bajarMods(mods){
        mods.map(async item=>{
            await bajarMod(item.id)
        })
    }
export default async function handler(req, res) {
var salida=[]
    const {idPlan,idUsuario}=req.query
        const plan=await findOne("planes",idPlan)
        console.log(plan,idUsuario)
        if(plan){
            const modsUsuario=await findMods("mods",idUsuario)
            bajarMods(modsUsuario)
            plan.modulos.map(async idModulo=>{
               
                if(!estaCargado(idModulo,idUsuario,modsUsuario)) await cargarMod(idModulo,idUsuario)
                const idMod=getIdMod(idModulo,idUsuario,modsUsuario)
                if(estaBaja(idMod,modsUsuario)){
                    if(idMod)await subirMod(idMod)
                }
                    // else await bajarMod(getIdMod(idModulo,idUsuario,modsUsuario))
            })
        }
        
        res.status(200).json(salida)
    
}