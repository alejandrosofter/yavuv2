import {findOne,update,nuevo,findAll,findOneField,remove} from "../config/firebase";
import Ensesion from "./EnSesion";


export default async function handlerApiABM({id,req, res,coleccion,campoId,sinUsuario,buscaPorUsuario,limite}) {
  
    let ejecuta
        switch (req.method) {
            case 'POST':
                ejecuta=async ({user})=>{
                    var sal={}
                    let data=req.body
                    

                    if(req.body.id)sal=await update(coleccion,data) 
                        else {
                            if(user)data.idUsuario=user.id
                            sal=await nuevo(coleccion,data) 
                            
                        }
                        
                    if(!sal)return {}
                        else return sal
                }
            break;
            case 'GET':
                ejecuta=async ({user})=>{
                    let salida
                    if(id){
                        if(buscaPorUsuario)id=user.id
                        if(!campoId) salida=await findOne(coleccion,id)
                        else salida=await findOneField(coleccion,{campo:campoId?campoId:"id",valor:id})
                    
                    }
                    else {
                        salida=await findAll(coleccion,user,sinUsuario,limite)
                    }
                    
                    return salida
            }
            break;
            case 'DELETE':
                ejecuta=async ({user})=>{
                    
                    remove(coleccion,{id:id})
                }
            break;
            default:
              console.log(`No se que hacer con este metod ${req.method}.`);
          }
    
        return await Ensesion({req,res,ejecuta}).catch(err=>{
            console.log(req.headers.authorization);
            throw err
        })
    
    
}