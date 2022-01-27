import { findOne } from "../../../../config/firebase";
import {getTablas} from "../../../../config/mongodb"
export default async function handler(req, res) {

   
        var sal={}
        const resu=await getTablas(req.body)
      
       res.status(200).json(resu)
    
    
}