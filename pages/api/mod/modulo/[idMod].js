import { findOne,Timestamp,update,ServerStamp } from '../../../../config/firebase'
export default async function handler(req, res) {
    const { idMod } = req.query
    const mod=await findOne("mods",idMod)
    let salida={}
    if(mod){
        salida=await findOne("modulos",mod.idModulo )
        salida.idMod=idMod
    }
    else console.log("No encuentro modulo")
    res.status(200).json(salida)
}