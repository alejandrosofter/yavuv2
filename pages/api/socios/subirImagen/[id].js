import Storage from "../../../../config/storage"
import {mfindAll} from "../../../../config/mongodb";
export default async function handler(req, res) {
    const { id } = req.query
    var data=[]
    if(dataConexion) arrDatos=(await mfindAll(dataConexion,"socios",{},10000))
    else arrDatos=await findAll("socios")
    if(!arrDatos) res.status(200).json({})
    res.status(200).json(data)
}