import { useEffect,useState } from "react"
import { fuego } from '@nandorojo/swr-firestore'
import { Avatar, CircularProgress, Stack } from "@mui/material"
export default function MuestraImagen({pathImagen,w,h}){
    
    useEffect(()=>{
        const load=async()=>{
          await mostrarImagen(pathImagen)
        }
        if(pathImagen)load()
      },[pathImagen])
      const [loadingImage,setLoadingImage]=useState(false)
      const [imagenUrl,setImagenUrl]=useState()
      const mostrarImagen=async (path)=>{
         
        setLoadingImage(true)
        fuego.storage().ref().child(path).getDownloadURL()
        .then((url) => {
          setLoadingImage(false)
          setImagenUrl(url)
        })
        .catch((err) => {
          setLoadingImage(false)
          console.log(err)
        })
      }
      return(
          <Stack>
            <Avatar
            alt="Imagen Socio"
            src={imagenUrl}
            sx={{ width: w?w:100, height:h?h:100 }}
            />
          </Stack>
      )
}