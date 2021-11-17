import {findOne,update,nuevo} from "../../../config/firebase";
export default async function handler(req, res) {

    if(req.method=="POST"){ //ES NUEVO o UPDATE ELEMENTO
        var sal={}
        console.log(req.body)
        if(req.body.id)sal=await update("planes",req.body) //new
        else sal=await nuevo("planes",req.body) //MODIFICO
        if(!sal)res.status(200).json({})
        else  res.status(200).json(sal)
        
    }else {
        const { id } = req.query
        const data=req.body
       const datos=await findOne("planes",id)

        if(!datos) res.status(200).json({})
        else res.status(200).json(datos)
    }
    
}