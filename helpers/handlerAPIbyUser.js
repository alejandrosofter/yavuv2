import {findOne,update,nuevo,findAll,findOneField,remove} from "../config/firebase";
import Ensesion from "./EnSesion";


export default async function handlerApiABMbyUser({req, res,coleccion}) {
 
    let ejecuta
        switch (req.method) {
            case 'POST':
                ejecuta=async ({user})=>{
                    var sal={}
                    let data=req.body
                    
                    data.idUsuario=user.id
                    if(req.body.id)sal=await update(coleccion,data) 
                        else sal=await nuevo(coleccion,data) 
                            
                        
                        
                    if(!sal)return {}
                        else return sal
                }
            break;
            case 'GET':
                ejecuta=async ({user})=>{
                    let salida
                
                       return await findOneField(coleccion,{campo:"idUsuario",valor:user.id})
                   
                    
            }
            break;
            case 'DELETE':
                ejecuta=async ({user})=>{
                    
                    remove(coleccion,{idUsuario:user.id})
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