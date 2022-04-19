import * as yup from 'yup';
import {fuego} from '@nandorojo/swr-firestore'
export default function Modelo(){
    return yup.object().shape({
        paciente: yup.string().required(),
        detalle: yup.string(),
        estado: yup.string(),
        
          
        
      });
}
export function valoresIniciales(data){
  let valores= {
      estado: "PENDIENTE",
      paciente: "",
      detalle:"",
      fecha:new Date(),
      idUsuario:fuego.auth().currentUser?.uid
  }
  return {...valores,...data}
}
