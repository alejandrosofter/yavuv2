import React, { useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {Button,Icon} from "@mui/material"
import { fuego } from '@nandorojo/swr-firestore'
const CropperImage= ({imagenUrl,callback}) => {
 
    useEffect(()=>{
      fuego.storage().ref().child(imagenUrl).getDownloadURL()
        .then((url) => {
          setImage(url)
        })
        .catch((err) => {
          console.log(err)
        })
    },[imagenUrl])
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
  
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL())
      if(callback)callback(cropper.getCroppedCanvas().toDataURL())
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Cropper
          style={{ height: 400, width: "100%" }}
         
          initialAspectRatio={1}
        
          src={image}
          viewMode={1}
         
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
        <Button sx={{mt:2}} variant="outlined" onClick={getCropData}><Icon className="fas fa-crop"/> CORTAR</Button>
      </div>
      <div>
          {cropData && <img src={cropData}/>}
          {!cropData && "Todavia no has cortado la imagen..."}
      </div>
     
      <br style={{ clear: "both" }} />
    </div>
  );
};

export default CropperImage;
