import {
  findOne,
  findAll,
  findOneField,
  Firebase,
} from "../../../config/firebase";

async function getAllModulos() {
  var sal = [];
  return await findAll("modulos");
}
export default async function handler(req, res) {
  var modulos = [];

  const { id } = req.query;
  const user = await Firebase().getUser(id);
  if (user) {
    const cuenta = await findOne("cuenta", id);
    if (cuenta) {
      modulos = await getModulos(cuenta.plan);
      // modulos=await getAllModulos()
    } else {
    }
  }

  // if(!modulos) res.status(200).json({})
  else res.status(200).json(modulos);
}
