import {findAll} from "../../../config/firebase";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
   const arrDatos=await findAll("clientes")
  
    if(!arrDatos) res.status(200).json({})
    else res.status(200).json(arrDatos)
}