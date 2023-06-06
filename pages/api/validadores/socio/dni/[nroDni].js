import { findOneField, findWhereArray } from "../../../../../config/firebase";
export default async function handler(req, res) {
  const { nroDni } = req.query;

  const data = await findWhereArray("socios", [
    { campo: "dni", op: "==", valor: nroDni },
    { campo: "estado", op: "==", valor: "ALTA" },
  ]);

  if (!data || data.length === 0) res.status(200).json({});
  else res.status(200).json(data[0]);
}
