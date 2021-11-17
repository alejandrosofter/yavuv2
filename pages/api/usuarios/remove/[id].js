import {remove} from "../../../../config/firebase";
export default async function handler(req, res) {

        const { id } = req.query
        const data=req.body
       const datos=await remove("users",data)
        if(!datos) res.status(200).json({})
        else res.status(200).json(datos)
    
    
}