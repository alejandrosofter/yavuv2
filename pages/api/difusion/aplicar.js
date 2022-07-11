export default async function handler(req, res) {
  const { id, email } = req.query;
  const url = `https://us-central1-yavu-98cac.cloudfunctions.net/difusion_aplicar?id=${id}`;

  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
