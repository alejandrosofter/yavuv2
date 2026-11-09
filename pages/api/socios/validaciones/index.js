export default async function handler(req, res) {
  const { path } = req.query;
  const url = `https://us-central1-yavu2-ba118.cloudfunctions.net/automatiza-ocr_getTexto?pathImagen=${path}`;
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
