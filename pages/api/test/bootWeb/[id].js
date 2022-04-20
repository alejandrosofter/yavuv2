import {findOne} from "../../../../config/firebase"
import {callBoot} from "../../../../services/bootWeb"
const TIME_OUT_INNERTEXT=5000

export default async function handler(req, res) {

    const result=callBoot()
    res.status(200).json({result})
}