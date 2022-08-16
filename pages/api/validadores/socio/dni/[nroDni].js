import { findOneField } from "../../../../../config/firebase";
export default async function handler(req, res) {
  const { nroDni } = req.query;

  const data = await findOneField("socios", { campo: "dni", valor: nroDni });

  if (!data) res.status(200).json({});
  else res.status(200).json(data);
}
