import {findOne,update,nuevo,findOneField} from "../config/firebase";
import { getSession } from "next-auth/client"

async function getIdUsuario(accessToken){
    const sesionDb=await findOneField("sessions",{campo:"accessToken",valor:accessToken})
    return sesionDb.userId
}
export default async function handlerApiABM({req, res,coleccion}) {
    const session = await getSession({ req })
    var data=req.body
    if(session){
        switch (req.method) {
            case 'POST':
                var sal={}
               
                data.idUsuario=await getIdUsuario(session.accessToken)

                if(req.body.id)sal=await update(coleccion,req.body) 
                    else sal=await nuevo(coleccion,req.body) 
                if(!sal)return {}
                    else return sal
            break;
            case 'GET':
                const { id } = req.query
                const datos=await findOne(coleccion,id)
        
                if(!datos) return {}
                else {}
            break;
            case 'DELETE':
                console.log('QUITO ELEMENTO');
            break;
            default:
              console.log(`No se que hacer con este metod ${req.method}.`);
          }
    }
    return null
    
    
}