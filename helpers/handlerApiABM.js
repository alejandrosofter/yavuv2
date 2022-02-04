import {findOne,cantidadColeccion2,update,nuevo,findAll2,findOneField,remove} from "../config/firebase";
import Ensesion from "./EnSesion";


export default async function handlerApiABM({orderBy,wheres,callbackCreate,pageSize,page,id,req, res,coleccion,campoId,sinUsuario,buscaPorUsuario,limite}) {
    
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
                            if(callbackCreate)await callbackCreate(sal)
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
                        const datos=await findAll2({orderBy,wheres,coleccion,user:sinUsuario?null:user,sinUsuario,limite,page,pageSize})
                        const cantidadRegistros=await cantidadColeccion2({coleccion,user,sinUsuario,limite})
                        salida=(!page&&pageSize)?datos:{datos,cantidadRegistros}
                        
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
           console.error(err)
           return [{error:err.toString()},200]
            // throw err
        })
    
    
}