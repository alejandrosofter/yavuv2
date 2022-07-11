export default async function handler(req, res) {
  const { idTarjeta, idSocio, tk: user, nombre, apellido, foto } = req.query;
  const url = `${process.env.URL_FUNCTIONS}/envioTarjetas_sendTarjeta?idTarjeta=${idTarjeta}&idSocio=${idSocio}&user=${user}&nombre=${nombre}&apellido=${apellido}&foto=${foto}`;
  console.log(url);
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
