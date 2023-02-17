import { fuego } from "@nandorojo/swr-firestore";

export async function getImagen(path) {
  if (path)
    return await fuego
      .storage()
      .ref()
      .child(path)
      .getDownloadURL()
      .then((url) => {
        return url;
      })
      .catch((err) => {});
}
