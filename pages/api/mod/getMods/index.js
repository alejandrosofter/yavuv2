import Firestore, {
  findMods,
  findOne,
  update,
  nuevo,
} from "../../../../config/firebase";
import firebase from "firebase/";
import Ensesion from "../../../../helpers/EnSesion";
import FirestoreConfig from "@config/_firestoreConfig";
async function getModulos(idUsuario) {
  var sal = [];
  var mods = await findMods("mods", idUsuario);

  for (let index = 0; index < mods.length; index++) {
    const modItem = mods[index];

    const modulo = await findOne("modulos", modItem.idModulo);
    if (modulo) {
      modulo.idMod = modItem.id;
      sal.push(modulo);
    }

    //     sal.push({fecha:modItem.fecha,nombre:modulo.label})
  }

  return sal;
}
export default async function handler(req, res) {
  const { subColeccion } = req.query;
  const data = req.body;
  const coleccion = "mods";
  console.log(req);
  const ejecuta = async ({ user }) => {
    return await getModulos(user.id);
  };
  const [salida, codigoSalida] = await Ensesion({ req, res, ejecuta }).catch(
    (err) => {
      throw err;
    }
  );
  res.status(200).json({ data: [] });
  // res.status(codigoSalida).json(salida);
}
