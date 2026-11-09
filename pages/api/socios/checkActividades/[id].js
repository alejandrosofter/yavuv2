import Storage from "../../../../config/storage";
import { mfindAll } from "../../../../config/mongodb";
export default async function handler(req, res) {
  const { id } = req.query;
  const metodo = "socios-checkactividades";
  const url = `https://us-central1-yavu2-ba118.cloudfunctions.net/${metodo}?id=${id}`;
  const output = await (await fetch(url)).json();

  res.status(200).json(output);
}
