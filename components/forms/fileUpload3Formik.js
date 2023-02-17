import React, { Component, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Icon, Button, Stack, Grid } from "@mui/material";
import Storage from "../../config/firebaseStorage";
import { FormControl } from "@mui/material";
import { Field } from "formik";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
export default class FileUpload2Formik extends Component {
  constructor() {
    super();
    this.useStyles = makeStyles({
      imagen: {
        borderRadius: 8,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        border: 1,
        cursor: "pointer",
      },
    });
    this.state = {
      files: [],
      filesUrls: [],
    };
  }

  render() {
    return (
      <FormControl fullWidth>
        <Field
          label={this.props.label}
          name={this.props.campo}
          id={this.props.campo}
        >
          {(props) => {
            useEffect(() => {
              this.setState({
                filesUrls: props.form.values.logo ? props.form.values.logo : [],
              });
            }, [props.form.values.logo]);

            const onDrop = (files) => {
              this.setState({ files });
              uploadFiles(files);
            };
            const quitarArr = (urlRef) => {
              const i = this.state.filesUrls
                .map((item) => item.urlRef)
                .indexOf(urlRef);
              const auxArr = this.state.filesUrls;
              auxArr.splice(i, 1);
              this.setState({ filesUrls: auxArr });
            };
            const clickImagen = (e) => {};
            const clickQuitar = async (e) => {
              const elem = e.target.attributes.getNamedItem("data-id");
              if (elem) {
                Storage()
                  .ref()
                  .child(elem.value)
                  .getDownloadURL()
                  .then(
                    async (err) => {
                      await Storage().ref().child(elem.value).delete();
                    },
                    (err) => {}
                  );
                quitarArr(elem.value);
                // await ref.delete()
              }
            };
            const getUrlThum = (file) => {
              const tipoThumb = "_80x80";
              let nombreImagen = file.name.split(".")[0];
              const extImagen = file.name.split(".")[1];
              const nombreArchivo = `${nombreImagen}${tipoThumb}.${extImagen}`;
              return `${this.props.auth.id}/thumbs/${nombreArchivo}`;
            };
            const uploadFiles = async (files) => {
              for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const urlRef = `${this.props.auth.id}/${file.name}`;
                const ref = Storage().ref(urlRef);
                await ref.put(file);
                const downloadURL = await ref.getDownloadURL();
                const downloadThum = await Storage()
                  .ref(getUrlThum(file))
                  .getDownloadURL();
                let auxUrls = this.state.filesUrls;
                auxUrls.push({ downloadURL, urlRef, downloadThum });

                this.setState({ filesUrls: auxUrls });
              }
              props.form.setFieldValue(this.props.campo, this.state.filesUrls);
            };
            const classes = this.useStyles();
            return (
              <div>
                <Stack direction="row" spacing={3}>
                  {this.state.filesUrls &&
                    this.state.filesUrls.map((file) => {
                      return (
                        <Stack key={`itera_${file.urlRef}`}>
                          <Image
                            onClick={clickImagen}
                            data-id={file.urlRef}
                            className={classes.imagen}
                            key={file.urlRef}
                            alt="Imagen"
                            src={file.downloadThum}
                            width={80}
                            height={80}
                          />
                          <Button
                            onClick={clickQuitar}
                            data-id={file.urlRef}
                            key={`boton_${file.urlRef}`}
                            variant="outlined"
                          >
                            <Icon
                              sx={{ fontSize: 10 }}
                              className="fas fa-trash"
                            />
                          </Button>
                        </Stack>
                      );
                    })}
                </Stack>

                <Dropzone accept="image/*" onDrop={onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="container">
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>Seleccione archivos</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
            );
          }}
        </Field>
      </FormControl>
    );
  }
}
