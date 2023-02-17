import { Icon, Button } from "@mui/material";
import { useState } from "react";
import Resizer from "react-image-file-resizer";
export default function UpdateField({
  label,
  w,
  h,
  callBackCambia,
  esImagen = true,
  acceptFiles,
}) {
  const [newImage, setNewImage] = useState();
  const [originalImage, setOriginalImage] = useState();
  const fileChangedHandler = (event) => {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
      setOriginalImage(event.target.files[0]);
      callBackCambia(event.target.files[0]);
    }
    if (fileInput) {
      try {
        if (esImagen) {
          Resizer.imageFileResizer(
            event.target.files[0],
            w ? w : 300,
            h ? h : 300,
            "JPEG",
            100,
            0,
            (uri) => {
              setNewImage(uri);
              callBackCambia(uri);
            },
            "base64",
            w ? w : 300,
            h ? h : 300
          );
        }
      } catch (err) {}
    }
  };
  return (
    <div>
      <label htmlFor={label}>
        <input
          onChange={fileChangedHandler}
          style={{ display: "none" }}
          id={label}
          accept={acceptFiles}
          name={label}
          type="file"
        ></input>
        <img src={newImage} alt="" />
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          component="span"
        >
          <Icon className="fas fa-paperclip" /> ADJUNTAR
        </Button>{" "}
      </label>
    </div>
  );
}
