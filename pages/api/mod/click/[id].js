import { findOne,Timestamp,update,ServerStamp } from '../../../../config/firebase'
export default async function handler(req, res) {
    const { id } = req.query
    const mod=await findOne("mods",id)
    if(mod){
        const data={fechaClick: new Date(),id:id}
        const salida=await update("mods",data )
        res.status(200).json({data})
    }
    else res.status(200).json({})
    
}