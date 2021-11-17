import { getSession } from "next-auth/client"

export default async function handler(req, res) {
    const session = await getSession({ req })
    res.status(200).json(session)
}