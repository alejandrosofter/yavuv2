import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
  return yup.object().shape({
      nombre: yup.string().required(),

      
        
      
    });
}
export function ModeloSalidas(){
  return yup.object().shape({
      nombre: yup.string().required(),
      selector: yup.string().required(),
      
        
      
    });
}
export function ModeloEntradas(){
  return yup.object().shape({
      nombre: yup.string().required(),
    });
}
export function ModelRutinas(){
  return yup.object().shape({
    accion: yup.string(),
    selector: yup.string(),
    variable: yup.string(),
    parametros: yup.string()
    });
}
export function valoresInicialesSalidas(){
  return {
      nombre: "",
      selector:"",
  }
}
export function valoresIniciales(){
  return {
      nombre: "",
      entradas:"",
      salidas:"",
      idUsuario:fuego.auth().currentUser.uid
  }
}
