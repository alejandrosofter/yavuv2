import { dbFirestore, Firebase } from "@helpers/db";
import { fuego } from "@nandorojo/swr-firestore";
export default async function handler(req, res) {
  //send post request to firebase
  const { nroSocio, tipoSocio } = req.body.params;
  if (!nroSocio || !tipoSocio) return res.status(200).json(null);
  const db = Firebase();
  const data = await db
    .firestore()
    .collection("socios")
    .where("nroSocio", "==", nroSocio)
    .where("tipoSocio", "==", tipoSocio)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return data;
    })
    .catch((error) => {});

  const registro = data.length > 0 ? data[0] : null;
  res.status(200).json(registro);
}
