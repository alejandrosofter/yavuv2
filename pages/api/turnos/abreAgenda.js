export default async function handler(req, res) {
  const url = `https://us-central1-yavu2-ba118.cloudfunctions.net/turnos-abrirAgendaMes?strFecha=${req.body.strFecha}&idConsultorio=${req.body.idConsultorio}`;
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
