import Storage from "../../../../config/storage"
import {mfindAll} from "../../../../config/mongodb";
import {findAll,Firebase} from "../../../../config/firebase";
import { verifyIdToken } from 'next-firebase-auth'
import initAuth from "../../../../config/initAuth";
initAuth()
export default async function handler(req, res) {
    const { id } = req.query
    
    var data=[]
    const token = req.headers.authorization
    const datos=await Firebase()
    console.log(datos)
    // const dataConexion=await findOneField("origenesDatos",{campo:"esMongo",valor:true})
    // if(dataConexion) data=(await mfindAll(dataConexion,"socios",{},5))
    // const salida=[]
    // if(data)
    //     data.map(item=>{
    //         if(item.imagenesPerfil){
    //             const imagen=item.imagenesPerfil[0]
    //             if(imagen){
    //                 const [meta,cuerpo]=imagen.data.split(";base64,")
    //                 const meta1=meta.split(":")[1]
    //                 console.log(Storage.fullPath)
    //                 salida.push({meta1,cuerpo})
    //             }
                
    //         }
    //     })
   const ref=Storage();

    res.status(200).json({data:JSON.stringify(datos)})
}