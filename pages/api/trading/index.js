export default async function handler(req, res) {
    const { fn } = req.query
    const clave="piteroski1984**"
    const url=`http://us-central1-yavu-98cac.cloudfunctions.net/trading_estadoCuenta?token=${clave}`
    
    const data=await fetch(url)
    const body = await data.json();
  //   const canti=await countCollection(coleccion)
  // console.log(canti) 
    res.status(200).json(body)
}  