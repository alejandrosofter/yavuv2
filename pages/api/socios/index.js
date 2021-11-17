import {findOneField,findAll} from "../../../config/firebase";
import {mfindAll} from "../../../config/mongodb";
export default async function handler(req, res) {
    const { id } = req.query
    const data=req.body
    const dataConexion=await findOneField("origenesDatos",{campo:"esMongo",valor:true})
    
    var arrDatos=[]
    if(dataConexion) arrDatos=(await mfindAll(dataConexion,"socios",{},5))
    else arrDatos=await findAll("socios")
    if(!arrDatos) res.status(200).json({})
    else res.status(200).json(arrDatos)
}