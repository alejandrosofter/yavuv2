export default async function handler(req, res) {
  const { id, email } = req.query;
  const url = `${process.env.URL_FUNCTIONS}/envioTarjetas-enviarEmail?id=${id}&email=${email}`;
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
