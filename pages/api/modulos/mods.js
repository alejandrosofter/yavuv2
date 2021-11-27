import {findOne,findAll,findOneField,Firebase} from "../../../config/firebase";


async function getAllModulos(){
    var sal=[]
    return await findAll("modulos")
}
export default async function handler(req, res) {
    var modulos=[]

        const { id} = req.query
        const user=await Firebase().getUser(id)
        if(user){
            const cuenta=await findOne("cuenta",id)
            if(cuenta){
                modulos=await getModulos(cuenta.plan)
                // modulos=await getAllModulos()
            }else{
                console.log("No tiene cuenta.. debes crear la cuenta")
            }
        }else console.log("No existe el usuario")
        
        

    // if(!modulos) res.status(200).json({})
     res.status(200).json(modulos)
 
}