export default async function handler(req, res) {
  const { fn } = req.query;
  const clave = "piteroski1984**";
  const url = `https://us-central1-yavu2-ba118.cloudfunctions.net/trading-getTrades?fn=estado&token=${clave}`;

  const data = await fetch(url);
  const body = await data.json();
  //   const canti=await countCollection(coleccion)
  //
  res.status(200).json(body);
}
