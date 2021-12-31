import React, { Component } from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { Icon,Button,Stack } from '@mui/material';
import  Storage from '../../config/firebaseStorage';
import { FormControl } from "@mui/material";
import { Field } from "formik";
import Image from "next/image"
export default class FileUpload2Formik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            filesUrls:[]
        };
    }
 
    
 
    render() {
        const getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    // allFiles.forEach(f => f.remove())
  }
        return (
            <FormControl fullWidth>

            <Field label={this.props.label} name={this.props.campo} id={this.props.campo} >
              {(props) =>{
                  const handleSave=async (files)=> {
                 
                    for(let index = 0; index < files.length; index++){
                        const file=files[index]
                        const urlRef=`${this.props.auth.id}/${file.name}`
                        const ref= Storage().ref(urlRef)
                        await ref.put(file)
                        const downloadURL=await ref.getDownloadURL()
                        let auxUrls=this.state.filesUrls
                        auxUrls.push({downloadURL,urlRef})
                        this.setState({filesUrls:auxUrls})
                    }
                    props.form.setFieldValue(this.props.campo,this.state.filesUrls)
                   
                    this.setState({
                        files: files,
                        open: false
                    });
                }
                  
              return( 
                  <div>
                     
                <Stack direction="row" spacing={1}>
                    {this.state.filesUrls &&this.state.filesUrls.map(file=>
                        <Image alt="Picture of the author" src={file.downloadURL} width={80}
                        height={80}/>

                    )}
                </Stack>
                <Dropzone
    //   getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
                  </div>
              )
              }}
              </Field>
          </FormControl>
            
        );
    }
}