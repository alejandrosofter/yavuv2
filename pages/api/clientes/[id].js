import handlerApiABM from "../../../helpers/handlerApiABM";

export default async function handler(req, res) {
    const coleccion="clientes"
    const resultado=handlerApiABM({req,res,coleccion})
    if(resultado)res.status(200).json(resultado)
    else res.status(400).json({error:"Hubo un error en la peticion, puede que no este logueado"})
}