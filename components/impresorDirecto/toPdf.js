import { useState,useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import DialogContent from "../forms/dialogContenido"
import {fuego} from '@nandorojo/swr-firestore'
import parse from "html-react-parser";
export default function Modulo({data,nombrePlantilla,titulo,open,setOpen}){
  useEffect(() => {
    setTemplate(nombrePlantilla)
  },[nombrePlantilla])

  const setTemplate=async nombre=>{
    const templates=await fuego.db.collection("plantillas")
  .where("identificador","==",nombre)
  .where("idUsuario","==",fuego.auth().currentUser.uid)
  .limit(1)
  .get()
  let dataTemplate
  templates.forEach(template=>dataTemplate=template.data())
  setHtml(dataTemplate.dataPlantilla)
  }
  const [html,setHtml]=useState("test")
    return (
    <DialogContent titulo={titulo} open={open} setOpen={setOpen}>
        <div>{parse(html)}</div>
    </DialogContent>
      )
}