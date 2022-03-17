import Webcam from "react-webcam";
import React from "react";
import {Avatar, Button, SpeedDial} from "@mui/material";
import  { useState,useEffect } from "react";
import { Field } from "formik";
import { Stack,FormControl,InputLabel,Icon,CircularProgress} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { fuego } from '@nandorojo/swr-firestore'
import DialogContenido from "./dialogContenido";
import UpdateField from "./uploadField";
import MenuRapido from "./speedDial";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import CropperImage from "../../cropperImage";
import MuestraImagen from "./muestraImagen";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


const WebcamFormik = ({folder,label,campo,w,h,callbackchange}) => {

  const [loading,setLoading]=useState(false)
  const [openSacaFoto,setOpenSacaFoto]=useState(false)
  const [openEditar,setOpenEditar]=useState(false)
  const [openAdjuntaFoto,setOpenAdjuntar]=useState(false)
  const [imageSource,setImageSource]=useState(false)
  const [imagenUrl,setImagenUrl]=useState()
  const [imagenCortada,setImagenCortada]=useState()
  const [setFieldValue,setValorValue]=useState()
  const [valorFoto,setValorFoto]=useState()
  const webcamRef = React.useRef(null)
  let setearValores
  const capture = React.useCallback(
    async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSource(imageSrc)
      
    },
    [webcamRef]
  )
  useEffect(()=>{
    console.log(valorFoto)
   setImagenUrl(valorFoto)
  },[valorFoto])

  useEffect(()=>{
   const upload=async()=>{
     
     await subirImagenDb(imageSource)
   }
   if(imageSource)upload()
 },[imageSource])


 const subirImagenDb=async (imageBase64)=>{
  const nombreImagen=new Date().getTime()
  const rutaImagen=(`${folder}/${nombreImagen}`).replaceAll('//', '/')
  const rutaImagenThum=(`${folder}/thumbs/${nombreImagen}_80x80`).replaceAll('//', '/')
  var storageRef = fuego.storage().ref()
  var folderSociosRef = storageRef.child(rutaImagen);
  setLoading(true)
  folderSociosRef.putString(imageBase64, 'data_url').then(async (snapshot) => {
    
    setearValores(rutaImagen,rutaImagenThum)
    setImagenUrl(rutaImagen)
    setLoading(false)
    console.log("SUBI IMAGEN")
    setOpenAdjuntar(false)
    setOpenSacaFoto(false)
  });
  
}
  return (
<FormControl fullWidth>
  <Field  label={label} name={campo} id={campo} >
    {(props) =>{
    
      setearValores=(rutaImagen,rutaImagenThum)=>{
      props.form.setFieldValue(campo,rutaImagen)
      props.form.setFieldValue(`${campo}_thum`,rutaImagenThum)
      }
      setValorFoto(props.form.values?.[campo])
        const clickOpenSacaFoto=()=>{
          setOpenSacaFoto(true)
        }
        const clickEditar=()=>{
          
          setOpenEditar(true)
          setTimeout(() => {
            
          }, 500);
          
        } 
        
        const clickAdjuntar=()=>{
          setOpenAdjuntar(true)
        }
       
        const cambiaImagen=(img)=>{
          setImageSource(img)
         
        }
        const guardarImagenTemporal=()=>{
 
          if(imagenCortada) setImageSource(imagenCortada)
         
        }
        
        const cambiaImagenTemporal=(img)=>{
          setImagenCortada(img)
         
        }
        
    
    return( 
    <Stack spacing={1}>
      <DialogContenido titulo="SACA FOTO CON WEBCAM" open={openSacaFoto} setOpen={setOpenSacaFoto}>
        <Stack>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={"100%"}
            videoConstraints={videoConstraints}
          />
          <LoadingButton loading={loading} variant="outlined" onClick={capture}><Icon className="fas fa-camera"/> CAPTURAR IMAGEN</LoadingButton>
        </Stack>
      </DialogContenido>
      <DialogContenido titulo="ADJUNTAR IMAGEN A PERFIL" open={openAdjuntaFoto} setOpen={setOpenAdjuntar}>
        <Stack>
          <UpdateField w={w} h={h} callBackCambia={cambiaImagen} label="uploadImagen"/>
          {loading &&<CircularProgress/> }
        </Stack>
      </DialogContenido>
      <DialogContenido titulo="EDITAR IMAGEN" open={openEditar} setOpen={setOpenEditar}>
        <Stack>
        <CropperImage callback={cambiaImagenTemporal} imagenUrl={imagenUrl} />
          <LoadingButton sx={{mt:2}} loading={loading} variant="outlined" onClick={guardarImagenTemporal}><Icon className="fas fa-save"/> GUARDAR</LoadingButton>
        </Stack>
      </DialogContenido>
   
    <Stack sx={{position:"absolute",left:70}}>
      
        <MenuRapido direccion="down" actions={[
        {fn:clickOpenSacaFoto, icon: <Icon className="fas fa-camera"/>, name: 'Sacar Foto con camara' },
        {fn:clickAdjuntar, icon: <Icon className="fas fa-paperclip"/>, name: 'Adjuntar' },
        {fn:clickEditar, icon: <Icon className="fas fa-pencil"/>, name: 'Editar' },
      ]} />
        
    </Stack>
    <MuestraImagen pathImagen={imagenUrl}/>

    </Stack>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default WebcamFormik;
