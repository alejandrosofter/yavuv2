import { da } from "date-fns/locale";
import { findOneField, findWhereArray } from "../../../../config/firebase";
export default async function handler(req, res) {
  const { dni, idUsuario } = req.body.params;
  const results = await findWhereArray("pacientes", [
    {
      campo: "dni",
      valor: `${dni}`,
    },
    { campo: "idUsuario", valor: idUsuario },
  ]);

  res.status(200).json(results);
}
