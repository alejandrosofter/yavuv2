import React, { useState, useRef, useEffect } from "react";
import { Field, useFormikContext } from "formik";
import { FormControl, InputLabel } from "@mui/material";

import { Editor } from "@tinymce/tinymce-react";

const RichEditorFormik = ({
  label,
  menubar = true,
  toolbar = `undo redo | formatselect | 
bold italic backcolor | alignleft aligncenter 
alignright alignjustify | bullist numlist outdent indent | 
removeformat | image`,
  campo,
  callbackchange,
  height,
}) => {
  const [data, setData] = useState("");
  //useFormik
  const { values } = useFormikContext();

  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(values[campo]);
    }
  }, [values[campo]]);
  return (
    <FormControl fullWidth>
      <Field type="hidden" name={`label_${campo}`} id={`label_${campo}`} />
      <Field label={label} name={campo} id={campo}>
        {(props) => {
          const handleChange = (e) => {
            const newData = e;
            setData(newData);

            // editorRef.current.setContent(newData);
          };
          const focusOut = (e) => {
            props.form.setFieldValue(campo, data);
            if (callbackchange) callbackchange(data);
          };
          //gputhj5znmo5xfj4sk36ytr94jire1ti7tvaagar85gp9w4g anterior
          return (
            <Editor
              onFocusOut={focusOut}
              onEditorChange={handleChange}
              apiKey="ps2ht0ubd3w760etwlhfkf8jzy8xaotakj2fsoguxjhelpbm"
              onInit={(evt, editor) => {
                setTimeout(() => {
                  setData(props.form.values[campo]);
                  editorRef.current = editor;
                  editor.setContent(props.form.values[campo]);
                }, 500);
              }}
              //  initialValue={props.form.values[campo]}
              init={{
                height: height ? height : 500,
                language: "es",
                menubar,

                // content_css: ["/css/credencialSocio.css"],
                extended_valid_elements: "style,link[href|rel]",
                custom_elements: "style,link,~link",
                automatic_uploads: true,
                /*
    URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: 'postAcceptor.php',
    here we add custom filepicker only to Image dialog
  */
                file_picker_types: "image",
                /* and here's our custom image picker*/
                file_picker_callback: function (cb, value, meta) {
                  var input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");

                  /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

                  input.onchange = function () {
                    var file = this.files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                      /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
                      var id = "blobid" + new Date().getTime();
                      var blobCache =
                        tinymce.activeEditor.editorUpload.blobCache;
                      var base64 = reader.result.split(",")[1];
                      var blobInfo = blobCache.create(id, file, base64);
                      blobCache.add(blobInfo);

                      /* call the callback and populate the Title field with the file name */
                      cb(blobInfo.blobUri(), { title: file.name });
                    };
                    reader.readAsDataURL(file);
                  };

                  input.click();
                },
                plugins: [
                  "advlist autolink lists image link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],

                toolbar,
                //  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          );
        }}
      </Field>
    </FormControl>
  );
};

export default RichEditorFormik;
