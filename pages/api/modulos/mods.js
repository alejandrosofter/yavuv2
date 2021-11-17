import { getSession } from "next-auth/client"
import {findOne,findAll,findOneField} from "../../../config/firebase";

async function getModulos(array){
    var sal=[]
    for (let index = 0; index < array.length; index++) {
        const item = array[index];
        sal.push(await findOne("modulos",item))
        
    }
   
    return sal
}
export default async function handler(req, res) {
    var modulos=[]
    const session = await getSession({ req })
    if (session) {
        
        const sesion=await findOneField("sessions",{campo:"accessToken",valor:session.accessToken})
        const user=sesion?await findOne("users",sesion.userId):null
        const plan=user?await findOne("planes",user.plan):null
        if(plan){
            modulos=await getModulos(plan.modulos)
        }else{
            console.log("No tiene selecciona ningun plan")
        }
        
        
   // modulos=await findAll("modulos")
  
    if(!modulos) res.status(200).json({})
    else res.status(200).json(modulos)
    }else res.status(400).json({error:"No esta registrado!"})
}