import axios from "axios";
import { fuego } from "@nandorojo/swr-firestore";
const getDeudas = async (data) => {
  console.log(
    `actividades/${data.idActividad}/grupos/${data.idGrupoActividad}/integrantes/${data.idSocio}/deudas`
  );
  const deudas = await fuego.db
    .collection(
      `actividades/${data.idActividad}/grupos/${data.idGrupoActividad}/integrantes/${data.idSocio}/deudas`
    )
    .get()
    .then(async (querySnapshot) => {
      const data = querySnapshot.docs.map(async (doc) => {
        return { ...doc.data(), id: doc.id };
      });
      return data;
    });
  return deudas;
};
export default async function handler(req, res) {
  const { actividad, grupo } = req.query;
  //firebase
  //parse actividad

  const data = await fuego.db
    .collection(
      `actividades/${JSON.parse(actividad)?.id}/grupos/${
        JSON.parse(grupo)?.id
      }/integrantes`
    )
    .get()
    .then((querySnapshot) =>
      querySnapshot.docs.map((doc) =>
        getDeudas(doc.data()).then((deudas) => {
          return { ...doc.data(), id: doc.id, deudas };
        })
      )
    );

  res.status(200).json({ data });
}
