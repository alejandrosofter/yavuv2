import {Firebase} from "../../../config/firebase";
export default async function handler(req, res) {
    const { id } = req.query
    // Firebase().signOut()
   res.status(200).json({})
}