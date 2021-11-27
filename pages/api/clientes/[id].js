import handlerApiABM from "../../../helpers/handlerApiABM";

export default async function handler(req, res) {
    const coleccion="clientes"
    const resultado= await handlerApiABM({req,res,coleccion})
    console.log(resultado)
    if(resultado)res.status(200).json(resultado)
    else res.status(400).json({error:"Hubo un error en la peticion, puede que no este logueado"})
}