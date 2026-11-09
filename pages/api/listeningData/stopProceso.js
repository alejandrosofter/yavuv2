export default async function handler(req, res) {
  const { id } = req.query;
  const url = `${process.env.URL_FUNCTIONS}/listeningData-stopProceso?idListening=${id}`;
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
