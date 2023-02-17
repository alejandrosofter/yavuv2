import { useEffect, useState } from "react";
import { fuego } from "@nandorojo/swr-firestore";
import { Avatar, CircularProgress, Icon, Stack } from "@mui/material";
export default function MuestraImagen({
  borderColor = "grey.700",
  border = 1,
  title,
  pathImagen,
  variantIcon,
  icon,
  w,
  h,
}) {
  useEffect(() => {
    mostrarImagen(pathImagen);
  }, [pathImagen]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [imagenUrl, setImagenUrl] = useState();
  const mostrarImagen = async (path) => {
    // ;
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
    <Avatar
      title={title}
      alt="Imagen"
      variant={variantIcon}
      src={pathImagen ? imagenUrl : null}
      sx={{
        border,
        borderColor,
        width: w ? w : 100,
        height: h ? h : 100,
      }}
    >
      <Icon className={icon ? icon : "fas fa-user"} />
    </Avatar>
  );
}
