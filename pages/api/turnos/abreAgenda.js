export default async function handler(req, res) {
  const url = `https://us-central1-yavu-98cac.cloudfunctions.net/turnos_abrirAgendaMes?strFecha=${req.body.strFecha}&idConsultorio=${req.body.idConsultorio}`;
  console.log(url);
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
