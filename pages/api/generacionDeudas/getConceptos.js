import {findOneField, findOne,update, nuevo} from "../../../config/firebase";
import Ensesion from "../../../helpers/EnSesion";

export default async function handler(req, res) {

    
    const ejecuta=async ({user})=>{
        
        return [{nombre:"CUITO",id:"111"},{nombre:"CUITO22",id:"333"},{nombre:"2231",id:"44"}]
    }
    const [salida,codigoSalida]=await Ensesion({req,res,ejecuta}).catch(err=>{
        throw err
    })
 
    res.status(codigoSalida).json(salida)
}