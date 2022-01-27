import {findOne,update,nuevo} from "../../../config/firebase";
export default async function handler(req, res) {

    if(req.method=="POST"){ //ES NUEVO o UPDATE ELEMENTO
        var sal={}
    
        if(req.body.id)sal=await update("users",req.body) //new
        else sal=await nuevo("users",req.body) //MODIFICO
        if(!sal)res.status(200).json({})
        else  res.status(200).json(sal)
        
    }else {
        const { id } = req.query
        const data=req.body
       const datos=await findOne("users",id)

        if(!datos) res.status(200).json({})
        else res.status(200).json(datos)
    }
    
}