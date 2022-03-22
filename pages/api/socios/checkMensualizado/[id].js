import Storage from "../../../../config/storage"
import {mfindAll} from "../../../../config/mongodb";
export default async function handler(req, res) {
    const { id} = req.query
    const url=`https://us-central1-yavu-98cac.cloudfunctions.net/socios_chequearMensualizadoSocio?id=${id}`
    const output=await(await fetch(url)).json()

    res.status(200).json(output)
}