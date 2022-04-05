import React from "react";
import  { useState,useEffect } from "react";
import { Field } from "formik";
import { Stack,FormControl,Typography,Icon,CircularProgress} from "@mui/material";
import { fuego } from '@nandorojo/swr-firestore'
import DialogContenido from "./dialogContenido";
import UpdateField from "./uploadField";
import MenuRapido from "./speedDial";


const UploadAnyFormik = ({folder,label,campo,callbackchange}) => {

  const [loading,setLoading]=useState(false)

  const [openAdjuntar,setOpenAdjuntar]=useState(false)
  const [file,setFile]=useState()


  let setearValores

 
  useEffect(()=>{
   const upload=async()=>{
     
     await uploadFileDb(file)
   }
   if(file)upload()
 },[file])


 const uploadFileDb=async (fileInput)=>{
  const fileName=new Date().getTime()
  const path=(`${folder}/${fileName}`).replaceAll('//', '/')
  var storageRef = fuego.storage().ref()
  var folderSociosRef = storageRef.child(path);
  setLoading(true)
  
  folderSociosRef.put(fileInput).then(async (snapshot) => {
 

    setLoading(false)
    setearValores(await folderSociosRef.getMetadata(),fileInput)
  });
  
}
  return (
<FormControl fullWidth>
  <Field  label={label} name={campo} id={campo} >
    {(props) =>{
    
      setearValores=(data,fileInput)=>{

        props.form.setFieldValue(campo,{nombreUser:fileInput.name,fullPath:data.fullPath,type:data.contentType,bucket:data.bucket,name:data.name})
      }
     
      
        
        const clickAdjuntar=()=>{
          setOpenAdjuntar(true)
        }
       
    
    return( 
    <Stack spacing={2}>
    <Typography variant="caption">{label}</Typography>
      <DialogContenido titulo="ADJUNTAR ARCHIVO" open={openAdjuntar} setOpen={setOpenAdjuntar}>
        <Stack>
          <UpdateField esImagen={false} callBackCambia={file=>setFile(file)} label="Subir Archivo"/>
          {loading &&<CircularProgress/> }
        </Stack>
      </DialogContenido>
     
   
    <Stack sx={{position:"absolute",left:70}}>
      
        <MenuRapido direccion="right" actions={[
        {fn:clickAdjuntar, icon: <Icon className="fas fa-paperclip"/>, name: 'Adjuntar' },
      ]} />
        
    </Stack>
    

    </Stack>
    )
    }}
    </Field>
</FormControl>
  )
      }

export default UploadAnyFormik;
