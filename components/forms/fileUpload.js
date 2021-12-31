import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import { Icon,Button,Stack } from '@mui/material';
import  Storage from '../../config/firebaseStorage';
import { FormControl } from "@mui/material";
import { Field } from "formik";
import Image from "next/image"
export default class FileUploadFormik extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: [],
            filesUrls:[]
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
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
                      <Button variant="outlined" onClick={this.handleOpen.bind(this)}>
                 <Icon sx={{fontSize:15,mr:1}} className="fas fa-file"/> AGREGAR ARCHIVO
                </Button>
                <Stack direction="row" spacing={1}>
                    {this.state.filesUrls &&this.state.filesUrls.map(file=>
                        <Image alt="Picture of the author" src={file.downloadURL} width={80}
                        height={80}/>

                    )}
                </Stack>
                <DropzoneDialog
                    open={this.state.open}
                    onSave={handleSave.bind(this)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
                  </div>
              )
              }}
              </Field>
          </FormControl>
            
        );
    }
}