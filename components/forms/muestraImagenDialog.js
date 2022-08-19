import { useEffect, useState } from "react";
import { fuego } from "@nandorojo/swr-firestore";
import { Avatar, CircularProgress, Stack } from "@mui/material";
import DialogContenido from "./dialogContenido";
import Image from "next/image";
export default function MuestraImagenDialog({
  borderColor = "grey.700",
  border = 1,
  title,
  pathImagen,
  w,
  h,
  open,
  setOpen,
}) {
  useEffect(() => {
    mostrarImagen(pathImagen);
  }, [pathImagen]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imagenUrl, setImagenUrl] = useState();
  const mostrarImagen = async (path) => {
    // console.log(path);
    setLoadingImage(true);
    if (!path) return setLoadingImage(false);
    if (path)
      await fuego
        .storage()
        .ref()
        .child(path)
        .getDownloadURL()
        .then((url) => {
          setLoadingImage(false);
          setImagenUrl(url);
        })
        .catch((err) => {
          setLoadingImage(false);
        });
  };
  if (loadingImage) return <CircularProgress />;
  return (
    <DialogContenido maxWidth={"lg"} open={open} setOpen={setOpen}>
      {imagenUrl && <Image src={imagenUrl} width={500} height={500} />}
    </DialogContenido>
  );
}
