import { verifyIdToken } from "next-firebase-auth";

export default async function Ensesion({req,res,ejecuta}){
    let salida
    let codigoSalida=200
    try {
        const user=await verifyIdToken(req.headers.authorization)
        
        if(ejecuta)salida= await ejecuta({user})
    } catch (error) {
        salida={error:"No encuentro usuario"}
        codigoSalida=400
        throw error
    }
    return [salida,codigoSalida]
}