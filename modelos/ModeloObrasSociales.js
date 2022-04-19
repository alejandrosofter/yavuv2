import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
    return yup.object().shape({
        nombre: yup.string().required(),
        usuarioWeb: yup.string(),
        claveWeb: yup.string(),
        estado: yup.string(),
        detalle: yup.string(),
          
        
      });
}
export function valoresIniciales(){
  return {
      estado: "ACTIVA",
      nombre: "",
      usuarioWeb:"",
      claveWeb:"",
      detalle:"",
      idUsuario:fuego.auth().currentUser.uid
  }
}
