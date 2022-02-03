import Ensesion from "../../../helpers/EnSesion";
import {findByField} from "../../../config/firebase";
import handlerApiAsociado from "../../../helpers/handlerApiAsociado";
export default async function handler(req, res) {
    const {idCliente, id,campoId,sinUsuario,buscaPorUsuario,limite,pageSize,page,pendientes } = req.query
    const coleccion="socios_deuda"
    const orderBy="fechaVto"
    const socioCliente=await findByField("socios",{campo:"cliente",valor:idCliente})
    console.log(socioCliente,idCliente)
    let idSocio
    if(socioCliente.length>0)idSocio=socioCliente[0].id
    if(idSocio){
        const wheres=[{campo:"idSocio",valor:idSocio,operador:"=="}]
        if(pendientes)wheres.push({campo:"estado",valor:"PENDIENTE",operador:"=="})
        const [salida,codigoSalida]=await handlerApiAsociado({sinUsuario:true,orderBy,wheres,pageSize,page,id,req, res,coleccion,campoId,sinUsuario,buscaPorUsuario,limite})
        res.status(codigoSalida).json(salida)
    }else
    res.status(200).json({})
    
    
}