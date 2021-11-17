import { findOne } from "../../../../../config/firebase"
export default async function handler(req, res) {
    const { id,idItem,accion } = req.query
    const data=req.body
    const modulo=await findOne("modulos",{id})
    const item=await findOne(modulo.nombre,{id:idItem})
  
    res.status(200).json({...item,componente:modulo.nombre})
}