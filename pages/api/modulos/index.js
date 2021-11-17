import Firestore from "../../../config/firebase";
import {getArrayData,findAll} from "../../../config/firebase";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
   const arrDatos=await findAll("modulos")
  
    if(!arrDatos) res.status(200).json({})
    else res.status(200).json(arrDatos)
}