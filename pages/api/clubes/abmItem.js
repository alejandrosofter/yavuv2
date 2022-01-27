import {findOneField, findOne,update, nuevo} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";
import randomId from "random-id";
export default async function handler(req, res) {
    const { subColeccion } = req.query
    const data=req.body
    const ejecuta=async ({user})=>{
        data.idUsuario=user.id
        let miClub=await findOneField("clubes",{campo:"idUsuario",valor:user.id})
        if(!data.id){ //ES NUEVO
            data.id=randomId(20)
         
            miClub[subColeccion].push(data)
            await update("clubes",miClub)
        }
        if(data.id){ //ES update
            const i=miClub[subColeccion].map(item=>item.id).indexOf(data.id)
            miClub[subColeccion][i]=data
            await update("clubes",miClub)
        }
        if(req.method=="DELETE"){
            const i=miClub[subColeccion].map(item=>item.id).indexOf(data.id)
            miClub[subColeccion].splice(i,1)
            miClub[subColeccion]=miClub[subColeccion]
        
            await update("clubes",miClub)
        }
        
        
        return {}
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
    
    res.status(codigoSalida).json(salida)
}