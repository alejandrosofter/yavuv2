import {countCollection, findAll} from "../../../config/firebase";
import handlerApiABM from "../../../helpers/handlerApiABM";
export default async function handler(req, res) {
    const { id } = req.query
    
    res.status(200).json({"esto ":"esto es un testo de brach newAUth"})
}