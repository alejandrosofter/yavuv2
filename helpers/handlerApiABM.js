import {findOne,update,nuevo,findAll,findOneField} from "../config/firebase";


async function getIdUsuario(accessToken){
    const sesionDb=await findOneField("sessions",{campo:"accessToken",valor:accessToken})
    return sesionDb.userId
}
export default async function handlerApiABM({req, res,coleccion,campoId}) {
 
   
   
        switch (req.method) {
            case 'POST':
                var sal={}
               
                // data.idUsuario=await getIdUsuario(session.accessToken)

                if(req.body.id)sal=await update(coleccion,req.body) 
                    else sal=await nuevo(coleccion,req.body) 
                if(!sal)return {}
                    else return sal
            break;
            case 'GET':
                const { id } = req.query
                let salida
                
                if(id){
                    if(!campoId) salida=await findOne(coleccion,id)
                    else salida=await findOneField(coleccion,{campo:campoId?campoId:"id",valor:id})
                  
                }
                else {
                    console.log("buisca todos")
                    salida=await findAll(coleccion)
                }
                
                return salida
            break;
            case 'DELETE':
                console.log('QUITO ELEMENTO');
            break;
            default:
              console.log(`No se que hacer con este metod ${req.method}.`);
          }
    
    return null
    
    
}