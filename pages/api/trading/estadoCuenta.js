export default async function handler(req, res) {
    const { fn } = req.query
    const clave="piteroski1984**"
    const url=`https://us-central1-yavu-98cac.cloudfunctions.net/trading_getTrades?fn=estado&token=${clave}`
    const data=await fetch(url)
    const body = await data.json();
    res.status(200).json(body)
}  